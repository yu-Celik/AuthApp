'use client'

import { useForm } from "react-hook-form"
import { Form, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "@/components/ui/form-input"
import { Card } from "@/components/ui/card"
import FooterForm from "@/app/components/auth/footer-form"
import Or from "@/app/components/auth/or"
import ResendButton from "@/app/components/auth/auth-buttons/resend"
import { useState, useEffect, useTransition } from 'react'
import SubmitButton from "@/app/components/auth/submit-button"
import { FlexCol } from "@/components/ui/containers"
import { z } from "zod"
import { FormErrors } from "@/app/libs/definitions/form-types"
import GithubSignInButton from '@/app/components/auth/auth-buttons/github'
import GoogleSignInButton from '@/app/components/auth/auth-buttons/google'
import { signup } from "@/app/server-actions/sign-up"
import { SignupFormSchema } from "@/app/libs/schemas/signup"
import { Mail, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { resendVerificationEmail } from '@/app/libs/emails/verification-email'
import Link from 'next/link'

const EmailSchema = z.object({
    email: SignupFormSchema.shape.email,
})
const SignupSchema = z.object({
    email: SignupFormSchema.shape.email,
    username: SignupFormSchema.shape.username,
    password: SignupFormSchema.shape.password,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

export function SignupForm() {
    const [step, setStep] = useState(1)
    const [errors, setErrors] = useState<FormErrors | null>(null)
    const [isPending, startTransition] = useTransition()
    const [canResend, setCanResend] = useState(true)
    const [timer, setTimer] = useState(60)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(step === 1 ? EmailSchema : SignupSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        mode: step === 1 ? 'onSubmit' : 'onBlur',
        criteriaMode: 'all'
    })

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined = undefined;
        if (!canResend && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
            setTimer(60);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [canResend, timer]);

    const onSubmit = (data: z.infer<typeof SignupSchema>) => {
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
                    formData.append('username', form.getValues('username'));
                    formData.append('password', form.getValues('password'));
                    const result = await signup(null, formData);
                    if (result) {
                        if (result.errors) {
                            // Gérer les erreurs spécifiques aux champs
                            if (result.errors.email) {
                                form.setError('email', { type: 'manual', message: result.errors.email[0] });
                            }
                            if (result.errors.username) {
                                form.setError('username', { type: 'manual', message: result.errors.username[0] });
                            }
                            if (result.errors.password) {
                                form.setError('password', { type: 'manual', message: result.errors.password[0] });
                            }
                            // Gérer les erreurs générales du formulaire
                            if (result.errors._form) {
                                setErrors({ _form: result.errors._form });
                            }
                        } else if (result.success) {
                            setStep(3);
                        }
                    }
                }
            } catch (error) {
                console.error(error)
                setErrors({ _form: ["Une erreur inattendue s'est produite."] })
            }
        })
    }

    const handleResendEmail = () => {
        if (canResend && form.getValues("email")) {
            startTransition(async () => {
                try {
                    const result = await resendVerificationEmail(form.getValues("email"))
                    if (result) {
                        if (result.redirect) {
                            setTimeout(() => {
                                router.push('/auth/signin')
                            }, 2000)
                        } else if (result.success) {
                            setCanResend(false)
                            setTimer(60)
                        } else {
                            setErrors({ _form: [result.error || 'Une erreur est survenue lors du renvoi de l\'email'] })
                        }
                    }
                } catch (error) {
                    console.error(error)
                    setErrors({ _form: ["Une erreur inattendue s'est produite."] })
                }
            })
        }
    }

    return (
        <Card className="w-[350px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="">
                    {step < 3 && (
                        <FormInput
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="m@example.com"
                            aria-required="true"
                            autoComplete="email"
                            margin="md"
                        />
                    )}
                    {step === 2 && (
                        <>
                            <FormInput
                                control={form.control}
                                name="username"
                                label="Nom d'utilisateur"
                                type="text"
                                placeholder="johndoe"
                                aria-required="true"
                                autoComplete="username"
                                margin="md"
                            />
                            <FormInput
                                control={form.control}
                                name="password"
                                label="Mot de passe"
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
                        </>
                    )}
                    {step === 3 ? (
                        <FlexCol className="gap-4 items-center">
                            <p className="text-sm text-green-500 text-center" role="status">
                                Un email de confirmation a été envoyé à : <strong>{form.getValues("email").replace(/^(.{2})(.*)(@.*)$/, "$1***$3")}</strong>.
                            </p>
                            <SubmitButton
                                onClick={handleResendEmail}
                                disabled={!canResend}
                                aria-label="Renvoyer l'email de confirmation"
                                variant="outline"
                                text={
                                    canResend
                                        ? <>Renvoyer l&apos;email de confirmation <Mail className="w-4 h-4 ml-2" aria-hidden="true" /></>
                                        : <>Renvoyer dans {timer}s <RefreshCw className="w-4 h-4 ml-2" aria-hidden="true" /></>
                                }
                                loadingText="Envoi en cours..."
                                isLoading={isPending}
                            />
                            <p className="text-center text-xs text-muted-foreground mt-2">
                                Vous avez vérifié votre email ? <Link
                                    href={"/auth/signin"}
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Se connecter
                                </Link>
                            </p>
                        </FlexCol>
                    ) : (
                        <FlexCol className="gap-2 my-4">
                            <SubmitButton
                                text={step === 1 ? "Continuer" : "S'inscrire"}
                                loadingText="Chargement..."
                                className=''
                                disabled={isPending || (step === 2 ? !form.formState.isValid : false)}
                                isLoading={isPending}
                            />
                            {errors?._form && (
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
                    )}
                    {step < 3 && <FooterForm mode='signup' />}
                </form>
            </Form>
        </Card>
    )
}