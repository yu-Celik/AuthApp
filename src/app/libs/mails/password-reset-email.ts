"use server"
import { Resend } from 'resend'
import { generatePasswordResetToken } from '@/app/libs/services/generate-tokens'
import { PasswordResetEmail } from '@/app/components/mails/password-reset-email'

export async function sendPasswordResetEmail(email: string, token: string) {
    const resend = new Resend(process.env.AUTH_RESEND_KEY)
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: 'authapp@resend.dev',
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        html: PasswordResetEmail({ resetLink }),
    })
}

export async function resendPasswordResetEmail(email: string) {
    try {
        const passwordResetToken = await generatePasswordResetToken(email);
        await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
        return { success: true, redirect: false, message: 'Un email de réinitialisation a été envoyé à : ' + `<strong>${passwordResetToken.email}</strong>` };
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email de réinitialisation:", error);
        return { success: false, redirect: false, error: 'Une erreur est survenue lors du renvoi de l\'email, veuillez réessayer de vous réinscrire ou contacter le support' };
    }
}