import type { NextAuthConfig } from "next-auth"
import { CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// import Nodemailer from "next-auth/providers/nodemailer"
import bcrypt from "bcryptjs"
// import Resend from "next-auth/providers/resend"
import prisma from "@/libs/prisma"

export default {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" }
            },
            // @ts-expect-error because of the way next-auth is typed
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },

                    include: { accounts: true }
                });

                if (!user || !user.emailVerified) {
                    throw new CredentialsSignin({ cause: "Mail ou mot de passe incorrect" });
                }

                const hasOAuthAccount = user.accounts.some(account =>
                    account.provider === 'google' || account.provider === 'github'
                );

                if (hasOAuthAccount && !user.password) {
                    // L'utilisateur a un compte OAuth mais pas de mot de passe local
                    throw new CredentialsSignin({ cause: "Ce compte est associé à Google ou GitHub. Veuillez utiliser la connexion correspondante ou réinitialiser votre mot de passe." });
                }

                if (user.password) {
                    const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password as string);
                    if (!isPasswordValid) {
                        throw new CredentialsSignin({ cause: "Mail ou mot de passe incorrect" });
                    }
                } else {
                    throw new CredentialsSignin({ cause: "Méthode de connexion non valide pour ce compte" });
                }

                return user;
            }
        }),
        GithubProvider,
        GoogleProvider,
        // Nodemailer({
        //     server: {
        //         host: process.env.EMAIL_SERVER_HOST,
        //         port: process.env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: process.env.EMAIL_SERVER_USER,
        //             pass: process.env.EMAIL_SERVER_PASSWORD,
        //         },
        //     },
        //     from: process.env.EMAIL_FROM,
        //     maxAge: 24 * 60 * 60,
        // }),
        // Resend({
        //     apiKey: process.env.AUTH_RESEND_KEY,
        //     from: process.env.EMAIL_FROM,
        //     server: {
        //         host: process.env.EMAIL_SERVER_HOST,
        //         port: process.env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: process.env.EMAIL_SERVER_USER,
        //             pass: process.env.AUTH_RESEND_KEY,
        //         },
        //     },
        //     maxAge: 24 * 60 * 60,
        // }),

    ],


} satisfies NextAuthConfig