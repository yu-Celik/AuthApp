"use server"
import { Resend } from 'resend'
import { TwoFactorEmail } from '@/app/components/emails/two-factor-email'
import { generateTwoFactorToken } from '@/app/libs/services/token/generate-tokens'

export async function sendTwoFactorEmail(email: string, token: string) {
    const resend = new Resend(process.env.AUTH_RESEND_KEY)

    await resend.emails.send({
        from: 'authapp@resend.dev',
        to: email,
        subject: 'Code de vérification pour l\'authentification à deux facteurs',
        html: TwoFactorEmail({ token }),
    })
}

export async function resendTwoFactorEmail(email: string) {
    try {
        const twoFactorToken = await generateTwoFactorToken(email);
        await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
        return { success: true, redirect: false, message: 'Un email de vérification a été envoyé à : ' + `<strong>${twoFactorToken.email}</strong>` };
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email de vérification:", error);
        return { success: false, redirect: false, error: 'Une erreur est survenue lors du renvoi de l\'email, veuillez réessayer de vous réinscrire ou contacter le support' };
    }
}
