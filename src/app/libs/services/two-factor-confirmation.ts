import prisma from "@/libs/prisma/prisma";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
            where: {
                userId: userId,
            },
        });
        return twoFactorConfirmation;
    } catch (error) {
        console.error("Erreur lors de la récupération de la confirmation de vérification à deux facteurs:", error);
        return null;
    }
};


