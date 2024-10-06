'use server'

import { FormState } from '@/app/libs/definitions/form-types'
import { getUserByEmail } from '@/app/libs/services/user/get-user'
import { generatePasswordResetToken } from '@/app/libs/services/token/generate-tokens'
import { sendPasswordResetEmail } from '@/app/libs/emails/password-reset-email'
import { ResetPasswordFormSchema } from '@/app/libs/schemas/reset-password'


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
