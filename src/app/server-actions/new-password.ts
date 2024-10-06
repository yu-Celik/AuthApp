'use server'

import { FormState } from '@/app/libs/definitions/form-types'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/app/libs/services/user/get-user'
import prisma from '@/libs/prisma/prisma'
import { NewPasswordFormSchema } from '@/app/libs/schemas/reset-password'
import { getPasswordResetTokenByToken } from '@/app/libs/services/token/password-reset-token'

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