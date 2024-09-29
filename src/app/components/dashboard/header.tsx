import { User } from "@prisma/client";
import { clx } from "@/libs/utils/clx/clx-merge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
    user: User
}

function DashboardHeader({ user }: Props) {
    const DashboardHeader = clx.header("flex gap-2");

    return (
        <DashboardHeader>
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full md:max-w-[50%]">
                <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex flex-wrap items-center">
                        <span className="mr-2">Bienvenue :</span>
                        <span className="text-primary truncate max-w-full" title={user.username || "Utilisateur"}>
                            {user.username 
                                ? user.username.charAt(0).toUpperCase() + user.username.slice(1) 
                                : "Utilisateur"}
                        </span>
                    </CardTitle>
                </CardHeader>
            </Card>
        </DashboardHeader>
    )
}

export default DashboardHeader