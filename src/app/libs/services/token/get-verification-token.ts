'use server'

import prisma from "@/libs/prisma/prisma";

export async function getVerificationTokenByToken(token: string) {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        })

        return verificationToken
    } catch (error) {
        return null
    }
}

export async function getVerificationTokenByEmail(email: string) {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { email }
        })

        return verificationToken
    } catch (error) {
        return null
    }
}