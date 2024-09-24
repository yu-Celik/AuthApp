'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import { signin } from '@/app/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { FlexBetween, FlexCol } from '@/components/ui/containers'
import Link from 'next/link'
import SubmitButton from '../../components/auth/submit-button'
import ResendButton from '@/app/components/auth/auth-buttons/resend'
import { EmailStep } from '@/app/components/auth/email-step'
import Or from '@/app/components/auth/or'
import FooterForm from '@/app/components/auth/footer-form'
import BackLogin from '@/app/components/auth/back-login'

export function SigninForm() {


    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [state, action] = useFormState(signin, null)
    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setStep(2)
        }
    }


    return (
        <>
            <Card className="w-[350px]">
                {step === 1 ? (
                    <EmailStep email={email} setEmail={setEmail} onSubmit={handleContinue} />
                ) : (
                    <form action={action} noValidate>
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
                        </FlexCol>
                        <FlexCol className="mb-4 gap-2">
                            <FlexBetween className="gap-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <p className="text-center text-sm text-muted-foreground">
                                    <Link href="/auth/reset-password" className="hover:text-primary">
                                        Mot de passe oublié ?
                                    </Link>

                                </p>
                            </FlexBetween>
                            <Input id="password" name="password" type="password" aria-required="true" placeholder='********' />
                            {state?.errors?.password && (
                                <p className="text-sm text-red-500" role="alert">{state.errors.password[0]}</p>
                            )}
                            {state?.errors?._form && (
                                <p className="text-sm text-red-500" role="alert">{state.errors._form[0]}</p>
                            )}
                            {state?.success && (
                                <p className="text-sm text-green-500" role="alert">{state.success}</p>
                            )}
                        </FlexCol>
                        <FlexCol className="gap-2 my-4">
                            <SubmitButton text="Se connecter" className='' />
                            <Or />
                            <ResendButton email={email} />
                        </FlexCol>
                    </form>
                )}
                <FooterForm mode='signin' />
            </Card>
            {step === 2 && (
                <BackLogin text="Retour" onClick={() => setStep(1)} />
            )}
        </>
    )
}