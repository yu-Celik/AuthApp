import authConfig from "./libs/auth.config";
import NextAuth from "next-auth";
import { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Vérifiez si la route est une route publique
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // Vérifiez si la route est une route d'authentification
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    // Vérifiez si la route commence par le préfixe d'authentification API
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    // Ne faites rien pour les routes d'authentification API
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    // Gestion des routes d'authentification
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté et que la route n'est pas publique
    if (!isLoggedIn && !isPublicRoute) {
        console.log('redirect to signin');
        return Response.redirect(new URL('/auth/signin', nextUrl));
    }
    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};