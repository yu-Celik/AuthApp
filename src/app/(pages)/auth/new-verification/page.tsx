import { Metadata } from "next"
import { NewVerificationForm } from "@/app/ui/auth/verification-form"
import { Suspense } from "react";
export const metadata: Metadata = {
    title: "Nouvelle vérification",
    description: "Vérifiez votre compte",
}

export default function NewVerificationPage() {
    return (

        <div className="container flex items-center justify-center min-h-screen py-12">
            <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[450px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Vérification du compte
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Veuillez vérifier votre compte pour continuer
                    </p>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <NewVerificationForm />
                </Suspense>
            </div>
        </div>
    )
}