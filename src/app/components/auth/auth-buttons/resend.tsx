"use client"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function ResendButton(props: React.ComponentPropsWithRef<typeof Button> & { text?: string, email: string }) {
    const text = props.text || "Envoyer un mail de connexion"
    const handleResendSignIn = async () => {

        try {
            await signIn("resend", { email: props.email })
        } catch (error) {
            console.error("Erreur lors de la connexion avec Resend:", error)

        }
    }
    return (
        <>
            <Button
                {...props}
                variant="outline"
                type="button"
                onClick={handleResendSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 select-none"
                aria-label="Se connecter avec Resend"
                disabled={props.disabled}
            >

                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {text}
            </Button>
            <p className="-mt-2 text-xs text-muted-foreground/50 text-center select-none">
                feature in development
            </p>
        </>
    )
}