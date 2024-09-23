'use server'

import { Resend } from 'resend'
import { generatePasswordResetToken, generateVerificationToken } from '@/app/libs/services/generate-tokens'
import { isEmailVerified } from '@/app/libs/services/get-user'


export async function sendVerificationEmail(email: string, token: string) {
    const resend = new Resend(process.env.AUTH_RESEND_KEY)

    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: 'authapp@resend.dev',
        to: email,
        subject: 'Vérification de votre email',
        html: `<p>Cliquez sur le lien suivant pour vérifier votre email : <a href="${confirmLink}">${confirmLink}</a></p>`,
    })
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const resend = new Resend(process.env.AUTH_RESEND_KEY)

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: 'authapp@resend.dev',
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a></p>`,
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