'use server'

import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { getVerificationTokenByEmail } from '@/app/libs/services/token/get-verification-token'
import prisma from '@/libs/prisma/prisma'
import { getPasswordResetTokenByEmail } from '@/app/libs/services/token/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/app/libs/services/token/two-factor-token'


export async function generateVerificationToken(email: string) {
    const token = uuidv4();
    // 10 minutes
    const expires = new Date(Date.now() + 1000 * 60 * 10)

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
    // 10 minutes
    const expires = new Date(Date.now() + 1000 * 60 * 10)


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

export async function generateTwoFactorToken(email: string) {
    const token = crypto.randomInt(100_000, 1_000_000).toString()
    // 10 minutes
    const expires = new Date(Date.now() + 1000 * 60 * 10)

    const existingToken = await getTwoFactorTokenByEmail(email)
    if (existingToken) {
        await prisma.twoFactorToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }
    const twoFactorToken = await prisma.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return twoFactorToken
}
