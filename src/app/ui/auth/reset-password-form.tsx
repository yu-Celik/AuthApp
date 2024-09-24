'use client'

import { Card } from "@/components/ui/card"
import { EmailStep } from "@/app/components/auth/email-step"
import { useFormState } from "react-dom"
import { useState } from "react"
import { resetPassword } from "@/app/actions/auth"
import BackLogin from "../../components/auth/back-login"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export function ResetPasswordForm() {

    const [email, setEmail] = useState('')
    const [state, action] = useFormState(resetPassword, null)
    const router = useRouter()
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
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [canResend, timer]);
    
    const handleSubmit = async (formData: FormData) => {
        if (canResend) {
            setCanResend(false);
            action(formData);
        }
    };

    return (

        <>
            <Card className="w-[350px]">
                <EmailStep email={email} setEmail={setEmail} resetPassword={true} action={handleSubmit} errors={state?.errors} success={state?.success} _formErrors={state?.errors?._form} canResend={canResend} timer={timer} />
            </Card >
            <BackLogin text="Retour à la page de connexion" onClick={() => router.push("/auth/signin")} />
        </>
    )
}