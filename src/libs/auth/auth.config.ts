import type { NextAuthConfig } from "next-auth"
import { CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// import Nodemailer from "next-auth/providers/nodemailer"
import bcrypt from "bcryptjs"
// import Resend from "next-auth/providers/resend"
import prisma from "@/libs/prisma/prisma"
import { getTwoFactorConfirmationByUserId } from "@/app/libs/services/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/app/libs/services/two-factor-token"
import { generateTwoFactorToken } from "@/app/libs/services/generate-tokens"
import { sendTwoFactorEmail } from "@/app/libs/mails/two-factor-email"
import { verifyTwoFactorCode } from "@/app/libs/services/verify-two-factor-code"

export default {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
                twoFactorCode: { label: "Code de vérification", type: "text" }
            },
            // @ts-expect-error because of the way next-auth is typed
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                    include: { accounts: true }
                });
                console.log('je suis dans authorize');
                

                if (!user || !user.emailVerified) {
                    throw new CredentialsSignin({ cause: "Identifiants invalides" });
                }
                console.log('je suis dans authorize 2');
                const hasOAuthAccount = user.accounts.some(account =>
                    account.provider === 'google' || account.provider === 'github'
                );
                console.log('je suis dans authorize 3');
                if (hasOAuthAccount && !user.password) {
                    console.log('je suis dans authorize 4');
                    // L'utilisateur a un compte OAuth mais pas de mot de passe local
                    throw new CredentialsSignin({ cause: "Ce compte est associé à Google ou GitHub. Veuillez utiliser la connexion correspondante ou réinitialiser votre mot de passe." });
                }
                console.log('je suis dans authorize 5');
                if (user.password) {
                    console.log('je suis dans authorize 6');
                    const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password as string);
                    if (!isPasswordValid) {
                        throw new CredentialsSignin({ cause: "Identifiants invalides" });
                    }
                    console.log('je suis dans authorize 7');
                } else {
                    console.log('je suis dans authorize 8');
                    throw new CredentialsSignin({ cause: "Méthode de connexion non valide pour ce compte" });
                }
                console.log('je suis dans authorize 9');
                if (user.isTwoFactorEnabled) {
                    console.log('je suis dans authorize 10');
                    if (credentials.twoFactorCode && credentials.twoFactorCode !== 'null' && typeof credentials.twoFactorCode === 'string') {
                        const twoFactorCode = await verifyTwoFactorCode(user, credentials.twoFactorCode);
                        if (twoFactorCode) {
                            throw new CredentialsSignin({ cause: twoFactorCode });
                        }
                        console.log('je suis dans authorize 11');
                    } else {
                        const twoFactorToken = await generateTwoFactorToken(user.email as string);
                        await sendTwoFactorEmail(twoFactorToken.email as string, twoFactorToken.token as string);
                        throw new CredentialsSignin({ cause: "TWO_FACTOR_REQUIRED" });
                        console.log('je suis dans authorize 12');
                    }
                }
                console.log('je suis dans authorize 13');
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