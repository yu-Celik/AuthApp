"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Bounce } from "@/components/ui/loaders"
import { verifyEmail } from "@/app/server-actions/auth"
import { Card } from "@/components/ui/card"
import { FlexCol } from "@/components/ui/containers"
import BackLogin from "@/app/components/auth/back-login"
export function NewVerificationForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const router = useRouter()

    useEffect(() => {
        const verifyToken = async () => {
            if (success || error) return

            if (!token) {
                setError("Veuillez refaire une demande de vérification")
                return
            }

            setIsLoading(true)

            try {
                const result = await verifyEmail(token)
                if (result.errors) {
                    setError(result.errors._form[0])
                }
                if (result.success) {
                    setSuccess(result.success)
                    setTimeout(() => {
                        router.push("/auth/signin")
                    }, 2000)
                }
            } catch (error) {
                setError("Échec de la vérification")
            } finally {
                setIsLoading(false)
            }
        }

        verifyToken()
    }, [token, success, error, router])

    return (
        <>
            <Card className="w-[350px]">
                {isLoading && (
                    <FlexCol className="gap-2 items-center">
                        <Bounce />
                        <p>Vérification en cours</p>
                    </FlexCol>
                )}

                {!success && error && <p className="text-sm text-red-500 text-center">{error}</p>}

                {success && !error && (
                    <p className="text-sm text-green-500">
                        {success} Vous allez être redirigé vers la page de connexion...
                    </p>
                )}
            </Card>
            <BackLogin text="Retour à la page de connexion" onClick={() => router.push("/auth/signin")} />
        </>
    )
}