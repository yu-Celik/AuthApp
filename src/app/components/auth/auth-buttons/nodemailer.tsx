"use client"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export default function NodemailerButton(props: React.ComponentPropsWithRef<typeof Button> & { text?: string, email: string }) {
    const text = props.text || "Envoyer un mail de connexion"
    const handleNodemailerSignIn = async () => {
        try {
            await signIn("nodemailer", { email: props.email, callbackUrl: DEFAULT_LOGIN_REDIRECT })
        } catch (error) {
            console.error("Erreur lors de la connexion avec Nodemailer:", error)

        }
    }
    return (
        <Button
            {...props}
            variant="outline"
            type="button"
            onClick={handleNodemailerSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Se connecter avec Nodemailer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {text}
        </Button>
    )
}