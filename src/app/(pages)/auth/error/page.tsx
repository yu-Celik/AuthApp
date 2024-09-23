'use client'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from 'next/link'

export default function AuthError() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Erreur d&apos;Authentification
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p className="text-sm text-gray-600 my-6 text-center">
                        {error === 'Configuration'
                            ? "Il y a un problème avec la configuration de l'authentification."
                            : error === 'AccessDenied'
                                ? "Vous n'avez pas l'autorisation d'accéder à cette ressource."
                                : error === 'Verification'
                                    ? "Le lien de vérification a expiré ou a déjà été utilisé."
                                    : "Une erreur inattendue s'est produite. Veuillez réessayer."}
                    </p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full mx-12" >
                        <Link href="/auth/signin">Retour à la page de connexion</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}