'use client'

import { Card } from "@/components/ui/card"
import { useFormState } from "react-dom"
import { useState, useEffect, useTransition, useCallback } from "react"
import { resetPassword } from "@/app/server-actions/auth"
import BackLogin from "../../components/auth/back-login"
import { useRouter } from "next/navigation"
import { Form, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SigninFormSchema } from "@/app/libs/definitions/signin"
import { FormInput } from "@/components/ui/form-input"
import SubmitButton from "@/app/components/auth/submit-button"
import { Mail, RefreshCw } from "lucide-react"
import { FlexCol } from "@/components/ui/containers"

const EmailSchema = z.object({
    email: SigninFormSchema.shape.email,
})

export function ResetPasswordForm() {
    const form = useForm({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: "",
        },
        mode: 'onBlur'
    })

    const [state, formAction] = useFormState(resetPassword, null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [cooldown, setCooldown] = useState(false)
    const [timer, setTimer] = useState(60)

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined = undefined;
        if (cooldown && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCooldown(false);
            setTimer(60);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [cooldown, timer]);

    const handleSubmit = useCallback((formData: z.infer<typeof EmailSchema>) => {
        const data = new FormData()
        data.append('email', formData.email)
        startTransition(async () => {
            await formAction(data)
        })
    }, [formAction])

    useEffect(() => {
        if (state?.success) {
            setCooldown(true)
        }
    }, [state])

    return (
        <>
            <Card className="w-[350px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="">
                        <FormInput
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="m@example.com"
                            aria-required="true"
                            autoComplete="email"
                            margin="md"
                        />
                        <FlexCol className="gap-2 my-4">
                            <SubmitButton
                                text={
                                    cooldown ? (
                                        <>
                                            Renvoyer dans {timer}s <RefreshCw className="w-4 h-4 ml-2" aria-hidden="true" />
                                        </>
                                    ) : (
                                        <>
                                            Envoyer l&apos;email de réinitialisation <Mail className="w-4 h-4 ml-2" aria-hidden="true" />
                                        </>
                                    )
                                }
                                loadingText="Envoi en cours..."
                                disabled={cooldown || !form.formState.isValid}
                                isLoading={isPending}
                                aria-label="Envoyer l'email de réinitialisation"
                                variant="outline"
                            />
                            {state?.errors?._form && (
                                <FormMessage variant="error">
                                    {state.errors._form[0]}
                                </FormMessage>
                            )}
                            {state?.success && (
                                <FormMessage variant="success">
                                    {state.success}
                                </FormMessage>
                            )}
                        </FlexCol>
                    </form>
                </Form>
            </Card>
            <BackLogin text="Retour à la page de connexion" onClick={() => router.push("/auth/signin")} />
        </>
    )
}