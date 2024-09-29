'use server'

import prisma from "@/libs/prisma/prisma"

export async function updateTwoFactorStatus(userId: string, isEnabled: boolean) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { isTwoFactorEnabled: isEnabled },
        })
        return { success: true, isTwoFactorEnabled: updatedUser.isTwoFactorEnabled }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'authentification à deux facteurs:", error)
        return { success: false, error: "Une erreur est survenue lors de la mise à jour" }
    }
}