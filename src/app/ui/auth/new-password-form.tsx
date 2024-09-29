'use client'

import { useState, useEffect, useTransition, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Form, FormMessage } from "@/components/ui/form"
import SubmitButton from '@/app/components/auth/submit-button'
import { newPassword } from "@/app/server-actions/auth"
import BackLogin from "@/app/components/auth/back-login"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormInput } from "@/components/ui/form-input"
import { useFormState } from "react-dom"
import { SignupFormSchema } from "@/app/libs/definitions/signup"

const PasswordSchema = z.object({
    password: SignupFormSchema.shape.password,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

export function NewPasswordForm() {
    const [state, formAction] = useFormState(newPassword, null)
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: 'onBlur',
        criteriaMode: 'all'
    })

    useEffect(() => {
        if (state?.success) {
            const timer = setTimeout(() => {
                router.push("/auth/signin")
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [state?.success, router])

    const handleSubmit = useCallback((formData: z.infer<typeof PasswordSchema>) => {
        const data = new FormData()
        data.append('token', token as string)
        data.append('password', formData.password)
        startTransition(async () => {
            await formAction(data)
        })
    }, [formAction, token])

    useEffect(() => {
        if (state?.errors || state?.success) {
            startTransition(() => { })  // Ceci forcera isPending à false
        }
    }, [state])
    
    return (
        <>
            <Card className="w-[350px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="">
                        <FormInput
                            control={form.control}
                            name="password"
                            label="Nouveau mot de passe"
                            type="password"
                            placeholder="********"
                            aria-required="true"
                            autoComplete="new-password"
                            margin="md"
                        />
                        <FormInput
                            control={form.control}
                            name="confirmPassword"
                            label="Confirmer le mot de passe"
                            type="password"
                            placeholder="********"
                            aria-required="true"
                            autoComplete="new-password"
                            margin="md"
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
                        <SubmitButton
                            text={state?.success ? "Vous allez être redirigé vers la page de connexion..." : "Réinitialiser le mot de passe"}
                            className='w-full mt-4'
                            disabled={!form.formState.isValid || isPending}
                            isLoading={isPending}
                            loadingText="Réinitialisation en cours..."
                        />
                    </form>
                </Form>
            </Card>
            <BackLogin text="Retour à la page de connexion" onClick={() => router.push("/auth/signin")} />
        </>
    )
}