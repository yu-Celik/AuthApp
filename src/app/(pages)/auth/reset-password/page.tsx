import { ResetPasswordForm } from "@/app/ui/auth/reset-password-form"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset Password page",
};

function page() {
    return (

        <div className="container flex flex-col h-lvh items-center justify-center">
            <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[450px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Réinitialiser votre mot de passe
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Entrez votre email ci-dessous pour réinitialiser votre mot de passe
                    </p>
                </div>
                <ResetPasswordForm />
            </div>
        </div>

    )
}
export default page