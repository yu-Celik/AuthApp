import { NewPasswordForm } from "@/app/ui/auth/new-password-form"

function page() {




    return (

        <div className="container flex flex-col h-lvh items-center justify-center">
            <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[400px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Nouveau mot de passe
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Entrez votre nouveau mot de passe ci-dessous
                    </p>
                </div>
                <NewPasswordForm />
            </div>
        </div>


    )
}
export default page