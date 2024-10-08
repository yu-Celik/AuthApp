import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/libs/prisma/prisma"
import authConfig from "@/libs/auth/auth.config"
import { UserRole } from "@prisma/client"
import { getAccountByProvider, createAccount } from "@/app/libs/services/account/account"



const githubID = process.env.AUTH_GITHUB_ID
const githubSecret = process.env.AUTH_GITHUB_SECRET

const googleID = process.env.AUTH_GOOGLE_ID
const googleSecret = process.env.AUTH_GOOGLE_SECRET


if (!githubID || !githubSecret) {
    throw new Error("AUTH_GITHUB_ID and AUTH_GITHUB_SECRET must be set")
}

if (!googleID || !googleSecret) {
    throw new Error("AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET must be set")
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async jwt({ token, user, account, profile, session, trigger }) {
            if (!token.sub) return token

            if (account?.provider !== "credentials") {
                token.emailVerified = new Date()
                token.isOAuthUser = true
            }
            if (user) {
                token.role = user.role
                token.username = user.username
                token.createdAt = user.createdAt
                token.isTwoFactorEnabled = user.isTwoFactorEnabled
                token.hasPassword = !!user.password
            }
            if (account) {
                token.accessToken = account.access_token
            }
            if (profile) {
                token.id = profile.id
            }

            if (trigger === "update" && session) {
                if (session.username) {
                    token.username = session.username
                }
                if (session.hasPassword) {
                    token.hasPassword = session.hasPassword
                }
            }

            return token
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role as UserRole;
                session.user.username = token.username as string;
                session.user.emailVerified = token.emailVerified as Date;
                session.user.createdAt = token.createdAt as Date;
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
                session.user.isOAuthUser = token.isOAuthUser as boolean;
                session.user.hasPassword = token.hasPassword as boolean;
            }
            return session
        },
        async signIn({ user, account }) {

            if (account?.provider !== "credentials") {
                // Vérifiez si un utilisateur avec le même email existe déjà
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email as string }
                });

                if (existingUser) {
                    // Vérifiez si un compte avec le même provider et providerAccountId existe déjà
                    const existingAccount = await getAccountByProvider(account?.provider as string, account?.providerAccountId as string)

                    if (!existingAccount) {
                        // Liez les comptes en mettant à jour l'utilisateur existant
                        await createAccount({
                            userId: existingUser.id,
                            provider: account?.provider as string,
                            providerAccountId: account?.providerAccountId as string,
                            type: account?.type as string,
                            access_token: account?.access_token as string,
                            refresh_token: account?.refresh_token as string,
                            expires_at: account?.expires_at as number,
                            token_type: account?.token_type as string,
                            scope: account?.scope as string,
                            id_token: account?.id_token as string,
                            session_state: account?.session_state as string,
                        });
                    }
                    return true;
                }

                user.username = user.name as string;
                return true;
            }

            if (!user || !user.emailVerified) {
                return false;
            }
            return true;
        }
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
        newUser: '/dashboard'
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    ...authConfig
})