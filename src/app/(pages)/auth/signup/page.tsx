import { SignupForm } from "@/app/ui/auth/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signup",
    description: "Signup page",
};

export default function SignupPage() {
    return (
        <div className="container flex h-lvh flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[400px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Créer un compte
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Entrez vos informations ci-dessous pour créer votre compte
                    </p>
                </div>
                <SignupForm />
            </div>
        </div>
    );
}