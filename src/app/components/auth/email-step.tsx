'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FlexCol } from '@/components/ui/containers'
import SubmitButton from '@/app/components/auth/submit-button'
import GithubSignInButton from '@/app/components/auth/auth-buttons/github'
import GoogleSignInButton from '@/app/components/auth/auth-buttons/google'
import { FormEvent } from 'react'
import { FormErrors } from '@/types/definitions/type'
import { Mail, RefreshCw } from 'lucide-react'


interface EmailStepProps {

    email: string
    setEmail: (email: string) => void
    onSubmit?: (e: FormEvent) => void
    resetPassword?: boolean
    action?: (payload: FormData) => void
    errors?: FormErrors
    success?: boolean | string
    _formErrors?: string[]
    canResend?: boolean
    timer?: number
}





export function EmailStep({ email, setEmail, onSubmit, resetPassword = false, action, errors, success, _formErrors, canResend, timer }: EmailStepProps) {

    return (

        <form action={action} onSubmit={onSubmit} className="flex flex-col gap-2" noValidate>
            <FlexCol className="mb-2 gap-2">
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
            {resetPassword ?
                <FlexCol className="gap-2">
                    {_formErrors && (
                        <p className="text-sm text-red-500" role="alert">{_formErrors[0]}</p>
                    )}
                    {errors?.email && (
                        <p className="text-sm text-red-500" role="alert">{errors.email[0]}</p>
                    )}
                    {success && (
                        <p className="text-sm text-green-500" role="alert">{success}</p>
                    )}

                    <SubmitButton text={
                        canResend ? (
                            <>
                                Renvoyer l&apos;email de confirmation <Mail className="w-4 h-4 ml-2" />
                            </>
                        ) : (
                            <>
                                Renvoyer dans {timer}s <RefreshCw className="w-4 h-4 ml-2" />
                            </>
                        )
                    } className='mt-2' disabled={!canResend} aria-label="Envoyer un email de réinitialisation" />
                </FlexCol>
                :
                <>
                    <SubmitButton text="Continuer" className='' />
                    <FlexCol className="gap-2 mb-4">
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300"></span>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-card text-card-foreground">ou</span>
                            </div>
                        </div>
                        <GithubSignInButton />
                        <GoogleSignInButton />
                    </FlexCol>
                </>
            }

        </form>
    )
}