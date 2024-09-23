import { CardFooter } from "@/components/ui/card"
import Link from "next/link"

type Props = {
    mode: 'signin' | 'signup'
}

function FooterForm({ mode = 'signin' }: Props) {

    return (

        <CardFooter className="flex flex-col gap-4">
            <p className="text-center text-xs text-muted-foreground mt-2">
                {mode === 'signin' ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}{" "}
                <Link
                    href={mode === 'signin' ? "/auth/signup" : "/auth/signin"}


                    className="underline underline-offset-4 hover:text-primary"

                >
                    {mode === 'signin' ? 'S\'inscrire' : 'Se connecter'}
                </Link>
            </p>




            {mode === 'signup' && (
                <p className="text-center text-xs text-muted-foreground">
                    En cliquant sur s&apos;inscrire, vous acceptez nos{' '}
                    <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                        Conditions d&apos;utilisation
                    </Link>
                    {' '}et notre{' '}
                    <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                        Politique de confidentialité
                    </Link>
                    .
                </p>
            )}
        </CardFooter>

    )
}
export default FooterForm