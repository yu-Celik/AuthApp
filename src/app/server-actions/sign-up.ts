'use server'

import { SignupFormSchema } from '@/app/libs/schemas/signup'
import { FormState } from '@/app/libs/definitions/form-types'
import bcrypt from 'bcryptjs'
import { getUserByEmail, isEmailVerified as isEmailVerifiedService } from '@/app/libs/services/user/get-user'
import prisma from '@/libs/prisma/prisma'
import { generateVerificationToken } from '@/app/libs/services/token/generate-tokens'
import { sendVerificationEmail } from '@/app/libs/emails/verification-email'

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

    const isEmailVerified = await isEmailVerifiedService(email as string)

    // If the user already exists and is not verified, send a verification email
    if (userExist && !isEmailVerified) {
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