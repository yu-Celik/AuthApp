'use client'

import { useState, useEffect, useTransition, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigninFormSchema } from '@/app/libs/schemas/signin'
import { Form } from "@/components/ui/form"
import { FormErrors } from '@/app/libs/definitions/form-types'
import { FormInput } from '@/components/ui/form-input'
import { resendTwoFactorEmail } from '@/app/libs/emails/two-factor-email'
import { TwoFactorCodeInput } from '@/app/components/auth/two-factor-code-input'
import SubmitButton from "@/app/components/auth/submit-button"

type Props = {
    onSubmit: (data: { twoFactorCode: string }) => void
    errors: FormErrors
    mail: string
}

function TwoFactorForm({ onSubmit, errors, mail }: Props) {
    const [canResend, setCanResend] = useState(true)
    const [timer, setTimer] = useState(60)
    const [isPendingVerify, startTransitionVerify] = useTransition()
    const [isPendingResend, startTransitionResend] = useTransition()

    const form = useForm({
        resolver: zodResolver(SigninFormSchema.pick({ twoFactorCode: true })),
        defaultValues: {
            twoFactorCode: '',
        },
    })
    const { setError } = form;

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined = undefined;
        if (!canResend && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
            setTimer(60);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [canResend, timer]);

    useEffect(() => {
        if (errors?._form) {
            setError('twoFactorCode', {
                type: 'manual',
                message: errors._form[0],
            });
        }
    }, [errors, setError]);

    const handleResend = useCallback(async () => {
        if (canResend) {
            setCanResend(false);
            setTimer(60);
            startTransitionResend(async () => {
                try {
                    const result = await resendTwoFactorEmail(mail);
                    if (result) {
                        if (result.success) {
                            // Succès du renvoi
                        } else {
                            setError('twoFactorCode', {
                                type: 'manual',
                                message: result.error || "Erreur lors de l'envoi du code",
                            });
                        }
                    }
                } catch (error) {
                    console.error("Erreur lors du renvoi du code:", error);
                    setError('twoFactorCode', {
                        type: 'manual',
                        message: "Erreur lors de l'envoi du code",
                    });
                }
            });
        }
    }, [canResend, mail, setError]);

    const handleSubmit = useCallback((data: { twoFactorCode: string }) => {
        startTransitionVerify(() => {
            onSubmit(data);
        });
    }, [onSubmit]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight">Vérification en deux étapes</h2>
                    <p className="text-sm text-muted-foreground">
                        Veuillez entrer le code à 6 chiffres envoyé à votre adresse e-mail.
                    </p>
                </div>
                <FormInput
                    control={form.control}
                    name="twoFactorCode"
                    label="Code à deux facteurs :"
                    inputComponent={TwoFactorCodeInput}
                    aria-required="true"
                    autoComplete="one-time-code"
                    margin="md"
                />
                <SubmitButton
                    text="Vérifier"
                    loadingText="Vérification en cours..."
                    className="w-full"
                    disabled={isPendingVerify}
                    isLoading={isPendingVerify}
                />
                <SubmitButton
                    onClick={handleResend}
                    text="Renvoyer le code"
                    loadingText={`Renvoyer dans ${timer}s`}
                    className="w-full"
                    disabled={!canResend || isPendingResend}
                    isLoading={isPendingResend}
                    variant="outline"
                    size="sm"
                    type="button"
                />
            </form>
        </Form>
    )
}

export default TwoFactorForm