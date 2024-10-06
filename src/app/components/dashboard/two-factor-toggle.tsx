"use client"
import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { updateTwoFactorStatus } from "@/app/libs/services/user/update-two-factor"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export const TwoFactorToggle = ({ initialState, userId }: { initialState: boolean, userId: string }) => {
    const [isEnabled, setIsEnabled] = useState(initialState)
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    const handleToggle = async () => {
        startTransition(async () => {
            try {
                const result = await updateTwoFactorStatus(userId, !isEnabled)
                if (result.success) {
                    setIsEnabled(result.isTwoFactorEnabled ?? false)
                    toast({
                        title: "Authentification à deux facteurs",
                        description: isEnabled ? "Désactivée avec succès" : "Activée avec succès",
                        variant: "default",
                    })
                } else {
                    toast({
                        title: "Erreur",
                        description: result.error ?? "Une erreur est survenue lors de la mise à jour",
                        variant: "error",
                    })
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'authentification à deux facteurs:", error)
                toast({
                    title: "Erreur",
                    description: "Une erreur inattendue est survenue",
                    variant: "error",
                })
            }
        })
    }

    return (
        <Button
            variant={isEnabled ? "outline" : "default"}
            size="sm"
            onClick={handleToggle}
            disabled={isPending}
            aria-live="polite"
        >
            {isPending ? (
                <>
                    En cours... <Loader2 className="w-4 h-4 animate-spin ml-2" />
                </>
            ) : (
                isEnabled ? "Désactiver" : "Activer"
            )}
        </Button>
    )
}