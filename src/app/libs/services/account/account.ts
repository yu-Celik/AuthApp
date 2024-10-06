'use server'

import prisma from "@/libs/prisma/prisma";
import { Account } from "@prisma/client";

export async function getAccountByProvider(provider: string, providerAccountId: string): Promise<Account | null> {
    try {
        const existingAccount = await prisma.account.findUnique({
            where: {
                provider_providerAccountId: {
                    provider: provider as string,
                    providerAccountId: providerAccountId as string
                }
            }
        });

        return existingAccount
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function createAccount(data: Partial<Account>): Promise<Account | null> {
    try {
        const newAccount = await prisma.account.create({
            data: data as Account
        });

        return newAccount;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateAccount(id: string, data: Partial<Account>): Promise<Account | null> {
    try {
        const updatedAccount = await prisma.account.update({
            where: { id },
            data: data as Account
        });
        return updatedAccount
    } catch (error) {
        console.error(error)
        return null
    }
}
