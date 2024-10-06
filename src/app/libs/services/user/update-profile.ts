'use server'

import prisma from "@/libs/prisma/prisma";
import { getCurrentUser } from "@/app/libs/services/user/current-user";
import bcrypt from "bcryptjs";

export async function updateUsername(username: string) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return { success: false, error: "Utilisateur non authentifié" };
        }

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { username },
        });

        return { success: true, user: updatedUser };
    } catch (error) {
        console.error("Erreur lors de la mise à jour du nom d'utilisateur:", error);
        return { success: false, error: "Une erreur est survenue lors de la mise à jour du nom d'utilisateur" };
    }
}

export async function updatePassword(currentPassword: string, newPassword: string) {
    try {
        
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return { success: false, error: "Utilisateur non authentifié" };
        }

        const user = await prisma.user.findUnique({
            where: { id: currentUser.id },
        });

        if (!user) {
            return { success: false, error: "Utilisateur non trouvé" };
        }

        
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password || '');
        if (!isPasswordValid) {
            return { success: false, error: "Mot de passe actuel incorrect" };
        }

        // Vérification que le nouveau mot de passe est différent de l'ancien
        const isNewPasswordSameAsOld = await bcrypt.compare(newPassword, user.password || '');
        if (isNewPasswordSameAsOld) {
            return { success: false, error: "Le nouveau mot de passe doit être différent de l'ancien" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: currentUser.id },
            data: { password: hashedPassword },
        });


        return { success: true, message: "Mot de passe mis à jour avec succès" };
    } catch (error) {
        return { success: false, error: "Une erreur est survenue lors de la mise à jour du mot de passe" };
    }
}

export async function setInitialPassword(newPassword: string) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return { success: false, error: "Utilisateur non authentifié" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return { success: true, message: "Mot de passe initial défini avec succès" };
    } catch (error) {
        console.error("Erreur lors de la définition du mot de passe initial:", error);
        return { success: false, error: "Une erreur est survenue lors de la définition du mot de passe initial" };
    }
}