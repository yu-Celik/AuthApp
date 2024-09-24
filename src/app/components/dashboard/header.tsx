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
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full lg:max-w-[50%]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                        Bienvenue :
                        <span className="text-primary">{' '} {user.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : "Utilisateur"}</span>
                    </CardTitle>
                </CardHeader>
            </Card>
        </DashboardHeader>
    )
}
export default DashboardHeader