'use client'

import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { FlexCol } from "@/components/ui/containers"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import SubmitButton from '@/app/components/auth/submit-button'
import { newPassword } from "@/app/actions/auth"
import BackLogin from "@/app/components/auth/back-login"
export function NewPasswordForm() {
    const [password, setPassword] = useState('')
    const [state, action] = useFormState(newPassword, null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            setError("Veuillez refaire une demande de réinitialisation")
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [token])

    useEffect(() => {
        if (state?.success) {
            setTimeout(() => {
                router.push("/auth/signin")
            }, 2000)
        }
    }, [state?.success, router])

    if (isLoading) {
        return <p>Chargement...</p>
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    return (
        <>
            <Card className="w-[350px]">
                <form action={action} className="flex flex-col gap-2">
                    <input type="hidden" name="token" value={token as string} />
                    <FlexCol className="mb-2 gap-2">
                        <Label htmlFor="password">Nouveau mot de passe</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-required="true"
                        />
                    </FlexCol>
                    <FlexCol className="gap-2">
                        {state?.errors?.password && (
                            <ul className="text-sm text-red-500 list-disc list-inside" role="alert">
                                {state.errors.password.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                        {state?.errors?._form && (
                            <p className="text-sm text-red-500 text-center" role="alert">{state.errors._form}</p>
                        )}
                        {state?.success && (
                            <p className="text-sm text-green-500 text-center" role="alert">
                                {state.success} Vous allez être redirigé vers la page de connexion...
                            </p>
                        )}

                        <SubmitButton text="Réinitialiser le mot de passe" className='mt-2' />
                    </FlexCol>
                </form>
            </Card>
            <BackLogin text="Retour à la page de connexion" onClick={() => router.push("/auth/signin")} />
        </>
    )
}