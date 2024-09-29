'use server'
import { SignupFormSchema } from '@/app/libs/definitions/signup'
import { FormState } from '@/app/types/definitions/type'
import bcrypt from 'bcryptjs'
import { SigninFormSchema } from '../libs/definitions/signin'
import { getUserByEmail } from '@/app/libs/services/get-user'
import prisma from '@/libs/prisma/prisma'
import { signIn as nextAuthSignIn } from '@/libs/auth/next-auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { AuthError } from 'next-auth'
import { generatePasswordResetToken, generateVerificationToken } from '@/app/libs/services/generate-tokens'
import { sendVerificationEmail } from '@/app/libs/mails/verification-email'
import { sendPasswordResetEmail } from '@/app/libs/mails/password-reset-email'
import { getVerificationTokenByToken } from '@/app/libs/services/get-verification-token'
import { NewPasswordFormSchema, ResetPasswordFormSchema } from '@/app/libs/definitions/reset-password'
import { getPasswordResetTokenByToken } from '@/app/libs/services/password-reset-token'

// Signup
export async function signup(prevState: FormState | null, formData: FormData): Promise<FormState> {
    
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Extract the data from the validated fields
    const { username, email, password } = validatedFields.data

    // Check if the user already exists
    const userExist = await getUserByEmail(email)

    // If the user already exists and is not verified, send a verification email
    if (userExist && !userExist.emailVerified) {
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(verificationToken.email as string, verificationToken.token);
        return { success: 'Un email de vérification a été envoyé.' }
    } else if (userExist) {
        return { errors: { email: ['Cette adresse email est déjà utilisée.'] } }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        // Create the user
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(verificationToken.email as string, verificationToken.token);
        return { success: 'Un email de vérification a été envoyé.' }

    } catch (error) {
        return { errors: { _form: ['Une erreur est survenue lors de la création de l\'utilisateur'] } }
    }
}


// Login

export async function signin(prevState: FormState | null, formData: FormData): Promise<FormState> {

    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        twoFactorCode: formData.get('twoFactorCode'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Extract the data from the validated fields
    const { email, password, twoFactorCode } = validatedFields.data


    try {
        await nextAuthSignIn("credentials", {
            email,
            password,
            twoFactorCode,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })

        return { success: true }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    // @ts-expect-error auth.config.ts
                    if (error.cause === "TWO_FACTOR_REQUIRED") {
                        return { twoFactorToken: true }
                    }
                    return { errors: { _form: [error.cause as unknown as string] } }
                default:
                    return { errors: { _form: ['Une erreur système est survenue. Veuillez réessayer plus tard.'] } }
            }
        }
        throw error
    }
}



export async function verifyEmail(token: string) {
    const verificationToken = await getVerificationTokenByToken(token)
    if (!verificationToken) {
        return { errors: { _form: ['Veuillez refaire une demande de vérification'] } }
    }

    const hasExpired = verificationToken.expires < new Date()
    if (hasExpired) {
        return { errors: { _form: ['Votre email de vérification a expiré'] } }
    }

    const user = await getUserByEmail(verificationToken.email as string)
    if (!user) {
        return { errors: { _form: ['Aucun compte trouvé avec cette adresse email'] } }
    }

    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                emailVerified: new Date(),
                email: user.email
            }
        })

        await prisma.verificationToken.delete({

            where: {
                id: verificationToken.id
            }
        })
        return { success: 'Votre email a été vérifié avec succès.' }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'email:", error)
        return { errors: { _form: ['Une erreur est survenue lors de la vérification de l\'email'] } }
    }
}



export async function resetPassword(prevState: FormState | null, formData: FormData): Promise<FormState> {

    const validatedFields = ResetPasswordFormSchema.safeParse({
        email: formData.get('email'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email } = validatedFields.data

    const user = await getUserByEmail(email)
    if (!user) {
        return { errors: { _form: ['Aucun compte trouvé avec cette adresse email'] } }
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email as string, passwordResetToken.token as string)

    return { success: 'Un email de réinitialisation a été envoyé' }
}

export async function newPassword(prevState: FormState | null, formData: FormData): Promise<FormState> {
    const validatedFields = NewPasswordFormSchema.safeParse({
        password: formData.get('password'),
        token: formData.get('token'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { password, token } = validatedFields.data

    const passwordResetToken = await getPasswordResetTokenByToken(token)
    if (!passwordResetToken) {
        return { errors: { _form: ['Veuillez refaire une demande de réinitialisation'] } }
    }

    const hasExpired = new Date(passwordResetToken.expires) < new Date()
    if (hasExpired) {
        return { errors: { _form: ['Votre lien de réinitialisation a expiré'] } }
    }

    const user = await getUserByEmail(passwordResetToken.email)
    if (!user) {
        return { errors: { _form: ['Aucun compte trouvé avec cette adresse email'] } }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        })

        await prisma.passwordResetToken.delete({
            where: { id: passwordResetToken.id }
        })

        return { success: 'Votre mot de passe a été réinitialisé avec succès.' }
    } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe:", error)
        return { errors: { _form: ['Une erreur est survenue lors de la réinitialisation du mot de passe'] } }
    }
}