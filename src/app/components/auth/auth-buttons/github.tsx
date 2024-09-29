"use client"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes"

export default function GithubButton(props: React.ComponentPropsWithRef<typeof Button> & { text?: string }) {
    const text = props.text || "Se connecter avec Github"
    const handleGithubSignIn = async () => {
        try {
            await signIn("github", { callbackUrl: DEFAULT_LOGIN_REDIRECT })
        } catch (error) {
            console.error("Erreur lors de la connexion avec Github:", error)
        }
    }
    return (
        <Button
            {...props}
            variant="outline"
            type="button"
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Se connecter avec Github"
        >
            <svg
                className="w-4 h-4"
                fill="currentColor"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"
                    clipRule="evenodd"
                />
            </svg>
            {text}
        </Button>
    )
}