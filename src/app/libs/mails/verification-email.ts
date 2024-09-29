"use server"
import { Resend } from 'resend'
import { generateVerificationToken } from '@/app/libs/services/generate-tokens'
import { isEmailVerified } from '@/app/libs/services/get-user'
import { VerificationEmail } from '@/app/components/mails/verification-email'
export async function sendVerificationEmail(email: string, token: string) {
    const resend = new Resend(process.env.AUTH_RESEND_KEY)
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`
  
    await resend.emails.send({
      from: 'authapp@resend.dev',
      to: email,
      subject: 'Vérification de votre adresse email',
      html: VerificationEmail({ confirmLink }),
    })
  }
  

export async function resendVerificationEmail(email: string) {
    try {
        if (await isEmailVerified(email)) return { success: false, redirect: true, message: 'Email déjà vérifié vous allez être redirigé à la page de connexion' };
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: true, redirect: false, message: 'Un email de confirmation a été envoyé à : ' + `<strong>${verificationToken.email}</strong>` };
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email de vérification:", error);
        return { success: false, redirect: false, error: 'Une erreur est survenue lors du renvoi de l\'email, veuillez réessayer de vous réinscrire ou contacter le support' };
    }
}