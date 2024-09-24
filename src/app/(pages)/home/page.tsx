import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Home page",
};


export default function HomePage() {
    return (
        <section className="w-full h-lvh py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Bienvenue sur <span className="text-primary">AuthApp</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Une plateforme sécurisée pour gérer votre authentification. Connectez-vous ou inscrivez-vous en quelques clics.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Button asChild>
                            <Link href="/auth/signin">Se connecter</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/auth/signup">S&apos;inscrire</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

