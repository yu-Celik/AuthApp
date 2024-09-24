'use client'

import { useState, useEffect, FormEvent, useTransition } from 'react'
import { useFormState } from 'react-dom'
import { signup } from '@/app/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { FlexCol } from '@/components/ui/containers'
import SubmitButton from '@/app/components/auth/submit-button'
import ResendButton from '@/app/components/auth/auth-buttons/resend'
import { EmailStep } from '@/app/components/auth/email-step'
import Or from '@/app/components/auth/or'
import FooterForm from '@/app/components/auth/footer-form'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { resendVerificationEmail } from '@/app/libs/mail'
import { Loader2, Mail, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import PasswordInput from '@/app/components/auth/password-input'
export function SignupForm() {

    const [step, setStep] = useState(1)
    const [isPending, startTransition] = useTransition()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [state, action] = useFormState(signup, null)
    const [errorResend, setErrorResend] = useState('')
    const router = useRouter()

    const handleContinue = (e: FormEvent) => {
        e.preventDefault()
        if (email) {
            setStep(2)
        }
    }

    useEffect(() => {
        if (state?.success) {
            setStep(3)
        }
    }, [state?.success])

    // État pour le timer de renvoi
    const [canResend, setCanResend] = useState(true)
    const [timer, setTimer] = useState(60)

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

    const handleResendEmail = () => {
        if (!email) {
            setErrorResend('Une erreur est survenue lors du renvoi de l\'email, veuillez réessayer de vous réinscrire ou contacter le support')
            return
        }
        if (canResend && email) {
            startTransition(async () => {
                const result = await resendVerificationEmail(email)

                // Redirection après 2 secondes si l'utilisateur a déjà vérifié son email
                if (result.redirect) {
                    setInterval(() => {
                        router.push('/auth/signin')
                    }, 2000)
                } else if (result.success) { // Si l'email n'est pas vérifié, on affiche un message de succès et on désactive le bouton de renvoi pendant 1 minute
                    setCanResend(false)
                    setTimer(60)
                } else if (result.success === false && result.redirect === false) { // Si une erreur est survenue, on affiche un message d'erreur
                    setErrorResend(result.error || 'Une erreur est survenue lors du renvoi de l\'email, veuillez réessayer de vous réinscrire ou contacter le support')
                }
            })
        }
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        if (state?.errors?.password) {
            state.errors.password = []
        }
    }

    return (
        <>
            <Card className="w-[350px]">
                {step === 1 ? (
                    <EmailStep email={email} setEmail={setEmail} onSubmit={handleContinue} />
                ) : step === 2 ? (
                    <form action={action} aria-labelledby="signup-form" noValidate>

                        <FlexCol className="mb-4 gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-required="true"
                                autoComplete='email'
                            />
                            {state?.errors?.email && (
                                <p className="text-sm text-red-500" role="alert">{state.errors.email}</p>
                            )}
                        </FlexCol>
                        <FlexCol className="mb-4 gap-2">
                            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
                            <Input id="username" name="username" placeholder="johndoe" aria-required="true" autoComplete='username' />
                            {state?.errors?.username && (
                                <p className="text-sm text-red-500" role="alert">{state.errors.username}</p>
                            )}
                        </FlexCol>
                        <FlexCol className="my-4 gap-2">
                            <PasswordInput
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {state?.errors?.password && (
                                <ul className="text-sm text-red-500 list-disc list-inside" role="alert">
                                    {state.errors.password.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            )}
                            {state?.success && (
                                <p className="text-sm text-green-500" role="alert">{state.success}</p>
                            )}
                        </FlexCol>
                        <FlexCol className="gap-2 my-4">
                            <SubmitButton text="S'inscrire" className='' />
                            <Or />
                            <ResendButton email={email} text="S'inscrire avec un mail de connexion" disabled />
                        </FlexCol>
                    </form>
                ) : step === 3 && (
                    <FlexCol className="gap-4 items-center">
                        <p className="text-sm text-green-500 text-center" role="status">
                            Un email de confirmation a été envoyé à : <strong>{email}</strong>.
                        </p>
                        <Button
                            onClick={handleResendEmail}
                            disabled={!canResend || isPending}
                            aria-label="Renvoyer l'email de confirmation"
                            variant="outline"
                        >
                            {isPending ? (
                                <>
                                    Envoi en cours... <Loader2 className="w-4 h-4 animate-spin ml-2" />
                                </>
                            ) : canResend ? (
                                <>
                                    Renvoyer l&apos;email de confirmation <Mail className="w-4 h-4 ml-2" />
                                </>
                            ) : (
                                <>
                                    Renvoyer dans {timer}s <RefreshCw className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                        {errorResend && (
                            <p className="text-sm text-red-500 text-center" role="alert">{errorResend}</p>
                        )}
                        <p className="text-center text-xs text-muted-foreground mt-2">
                            Vous avez vérifié votre email ? <Link
                                href={"/auth/signin"}
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Se connecter
                            </Link>
                        </p>
                    </FlexCol>
                )}

                {step < 3 && <FooterForm mode='signup' />}
            </Card>
        </>
    )
}