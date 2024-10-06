'use server'

import { getUserByEmail } from '@/app/libs/services/user/get-user'
import prisma from '@/libs/prisma/prisma'
import { getVerificationTokenByToken } from '@/app/libs/services/token/get-verification-token'


export async function verifyEmail(token: string) {
    const verificationToken = await getVerificationTokenByToken(token)
    if (!verificationToken) {
        return { errors: { _form: ['Veuillez refaire une demande de vérification'] } }
    }

    const hasExpired = verificationToken.expires < new Date()
    if (hasExpired) {
        return { errors: { _form: ['Votre email de vérification a expiré'] } }
    }

    const userId = await getUserByEmail(verificationToken.email as string)
    if (!userId) {
        return { errors: { _form: ['Aucun compte trouvé avec cette adresse email'] } }
    }

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                emailVerified: new Date(),
                email: verificationToken.email
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

