import { getTwoFactorTokenByEmail } from "@/app/libs/services/two-factor-token";
import prisma from "@/libs/prisma/prisma";
import { User } from "@prisma/client";

export async function verifyTwoFactorCode(user: User, twoFactorCode: string) {
    const twoFactorToken = await getTwoFactorTokenByEmail(user.email as string);
    if (!twoFactorToken) {
        return 'Code de vérification invalide'
    }

    if (new Date(twoFactorToken.expires) < new Date()) {
        return 'Code de vérification invalide'
    }

    if (twoFactorCode !== twoFactorToken.token) {
        return 'Code de vérification invalide'
    }

    await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
    });

    await prisma.twoFactorConfirmation.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id }
    });
}