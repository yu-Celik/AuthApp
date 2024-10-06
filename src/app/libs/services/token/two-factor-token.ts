'use server'

import prisma from "@/libs/prisma/prisma";

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findUnique({
            where: { token },
        });
        return twoFactorToken;
    } catch (error) {
        console.error("Erreur lors de la récupération du token de vérification à deux facteurs:", error);
        return null;
    }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findFirst({
            where: { email },
        });
        return twoFactorToken;
    } catch (error) {
        console.error("Erreur lors de la récupération du token de vérification à deux facteurs:", error);
        return null;
    }
};

