"use client"
import { useForm } from "react-hook-form"
import { Form, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SigninFormSchema } from "@/app/libs/definitions/signin"
import { FormInput } from "@/components/ui/form-input"
import { Card } from "@/components/ui/card"
import FooterForm from "@/app/components/auth/footer-form"
import Or from "@/app/components/auth/or"
import ResendButton from "@/app/components/auth/auth-buttons/resend"
import { useState, useTransition, useCallback, useEffect } from 'react'
import SubmitButton from "@/app/components/auth/submit-button"
import { FlexCol } from "@/components/ui/containers"
import { z } from "zod"
import TwoFactorForm from './two-factor-form'
import { signin } from "@/app/server-actions/auth"
import BackLogin from "@/app/components/auth/back-login"
import { FormErrors } from "@/app/types/definitions/type"
import GithubSignInButton from '@/app/components/auth/auth-buttons/github'
import GoogleSignInButton from '@/app/components/auth/auth-buttons/google'
import Link from "next/link"

const EmailSchema = z.object({
    email: SigninFormSchema.shape.email,
})

export function SigninForm() {
    const [step, setStep] = useState<number>(1)
    const [errors, setErrors] = useState<FormErrors | null>(null)
    const [isPending, startTransition] = useTransition()

    const form = useForm({
        resolver: zodResolver(step === 1 ? EmailSchema : SigninFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: step === 1 ? 'onSubmit' : 'onBlur'
    })

    const onSubmit = useCallback((data: z.infer<typeof SigninFormSchema>) => {
        setErrors(null)
        startTransition(async () => {
            try {
                if (step === 1) {
                    const emailValidation = EmailSchema.safeParse(data);
                    if (emailValidation.success) {
                        setStep(2)
                    }
                } else if (step === 2) {
                    const formData = new FormData();
                    formData.append('email', form.getValues('email'));
                    formData.append('password', form.getValues('password'));
                    const result = await signin(null, formData);
                    if (result.twoFactorToken) {
                        setStep(3)
                    } else if ('errors' in result) {
                        console.log('je suis dans erreur');
                        setErrors(result.errors as FormErrors)
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la connexion:", error)
                setErrors({ _form: ["Une erreur est survenue lors de la connexion."] })
            }
        })
    }, [step, form])

    const onTwoFactorSubmit = useCallback((data: { twoFactorCode: string }) => {
        setErrors(null)
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append('email', form.getValues('email'));
                formData.append('password', form.getValues('password'));
                formData.append('twoFactorCode', data.twoFactorCode);

                const result = await signin(null, formData);
                if ('errors' in result) {
                    setErrors(result.errors as FormErrors)
                } else if ('success' in result) {
                    // Redirection ou autre action après une connexion réussie
                }
            } catch (error) {
                console.error("Erreur lors de la vérification du code à deux facteurs:", error)
                setErrors({ _form: ["Une erreur est survenue lors de la vérification."] })
            }
        })
    }, [form])

    return (
        <>
            <Card className="w-[350px]">
                {step < 3 ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="">
                            <FormInput
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="m@example.com"
                                aria-required="true"
                                autoComplete="email"
                                margin="md"
                            />
                            {step === 2 && (
                                <div className="relative">
                                    <FormInput
                                        control={form.control}
                                        name="password"
                                        label="Mot de passe"
                                        type="password"
                                        placeholder="********"
                                        aria-required="true"
                                        autoComplete="current-password"
                                        margin="md"
                                    />
                                    <p className="absolute right-0 top-0 mt-[0.2rem] text-sm text-muted-foreground">
                                        <Link href="/auth/reset-password" className="hover:text-primary">
                                            Mot de passe oublié ?
                                        </Link>
                                    </p>
                                </div>
                            )}
                            <FlexCol className="gap-2 my-4">
                                <SubmitButton
                                    text={step === 1 ? "Continuer" : "Se connecter"}
                                    className=''
                                    disabled={isPending || (step === 2 ? !form.formState.isValid : false)}
                                    isLoading={isPending}
                                    loadingText="Connexion en cours..."
                                />
                                {errors?._form && step !== 1 && (
                                    <FormMessage variant="error">
                                        {errors._form[0]}
                                    </FormMessage>
                                )}
                                <Or />
                                {step === 1 ? (
                                    <>
                                        <GithubSignInButton />
                                        <GoogleSignInButton />
                                    </>
                                ) : (
                                    <ResendButton email={form.getValues("email")} disabled />
                                )}
                            </FlexCol>
                            <FooterForm mode='signin' />
                        </form>
                    </Form>
                ) : (
                    <TwoFactorForm onSubmit={onTwoFactorSubmit} errors={errors as FormErrors} mail={form.getValues("email")} />
                )}
            </Card>
            {step >= 2 && (
                <BackLogin text="Retour" onClick={() => setStep(1)} />
            )}
        </>
    )
}