"use client"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Animate } from "@/components/ui/animate"
import { H1, H2 } from "@/components/ui/headings"
import { HomeIcon, ArrowLeftIcon } from "lucide-react"

function NotFound() {
    const router = useRouter()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-col items-center justify-center">
                    <H1 className="text-red-500">404</H1>
                    <H2 className="mb-2">Oups ! Page non trouvée</H2>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-center mb-6">
                        Il semble que vous ayez pris un mauvais virage. Ne vous inquiétez pas,
                        cela arrive aux meilleurs d&apos;entre nous.
                    </CardDescription>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => router.push('/')}
                            className="flex items-center justify-center"
                        >
                            <HomeIcon size={20} className="mr-2" />
                            Retour à l&apos;accueil
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="flex items-center justify-center"
                        >
                            <ArrowLeftIcon size={20} className="mr-2" />
                            Page précédente
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default NotFound