'use server'

import prisma from "@/libs/prisma/prisma";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        return !!user;
    } catch (error) {
        console.error("Erreur lors de la vérification de l'existence de l'utilisateur:", error);
        return false; // En cas d'erreur, on considère que l'utilisateur n'existe pas
    }
}

export async function getUserById(id: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true }
        })

        return !!user
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function isEmailVerified(email: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                emailVerified: true
            }
        });

        return user?.emailVerified !== null;
    } catch (error) {
        console.error("Erreur lors de la vérification de l'email:", error);
        return false;
    }
}

export async function deleteUserByEmail(email: string): Promise<User | null> {
    try {
        const user = await prisma.user.delete({
            where: { email }
            
        })

        return user
    } catch (error) {
        console.error(error)
        return null
    }
}


