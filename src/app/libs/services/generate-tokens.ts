import { v4 as uuidv4 } from 'uuid'
import { getVerificationTokenByEmail } from '@/app/libs/services/get-verification-token'
import prisma from '@/libs/prisma'
import { getPasswordResetTokenByEmail } from '@/app/libs/services/password-reset-token'


export async function generateVerificationToken(email: string) {
    const token = uuidv4();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
}

export async function generatePasswordResetToken(email: string) {
    const token = uuidv4();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)


    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken
}






