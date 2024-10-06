// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string
        user: {
            id: string
            username?: string
            email?: string | null
            image?: string | null
            role?: UserRole
            createdAt?: Date | null
            emailVerified?: Date | null
            isTwoFactorEnabled?: boolean
            isOAuthUser?: boolean
            hasPassword?: boolean
            password?: string
        }
    }


    interface JWT extends DefaultJWT {
        accessToken?: string
        id?: string
        role?: UserRole
        username?: string
        isTwoFactorEnabled?: boolean
        isOAuthUser?: boolean
        hasPassword?: boolean
        password?: string
    }

    interface User extends DefaultUser {
        role?: UserRole
        username?: string
        emailVerified?: boolean
        createdAt?: Date | null
        isTwoFactorEnabled?: boolean
        isOAuthUser?: boolean
        hasPassword?: boolean
        password?: string
    }
}