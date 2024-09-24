import { SigninForm } from "@/app/ui/auth/signin-form";

export default async function SigninPage() {
    return (
        <div className="container flex flex-col h-lvh items-center justify-center">
            <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[400px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Connexion à votre compte
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Entrez vos identifiants ci-dessous pour vous connecter
                    </p>
                </div>
                <SigninForm />
            </div>
        </div>
    );
}