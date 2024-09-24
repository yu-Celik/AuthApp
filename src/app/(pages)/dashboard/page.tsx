import { clx } from "@/libs/utils/clx/clx-merge";
import { UserRole } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileField from "@/app/components/dashboard/profile-field";
import { auth } from "@/libs/next-auth";
import type { Metadata } from "next";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
};

const getRoleLabel = (role: UserRole): string => {
    switch (role) {
        case 'ADMIN':
            return 'Administrateur';
        case 'USER':
            return 'Utilisateur';
        default:
            return 'Inconnu';
    }
};

const formatDate = (date: Date | null): string => {
    if (!date) return 'Jamais';
    const timeZone = 'Europe/Paris';
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'd MMMM yyyy HH:mm', { locale: fr });
};


export default async function DashboardLayout() {
    const session = await auth();
    const DashboardBody = clx.main("flex flex-1 gap-2");
    
    return (
        <DashboardBody>
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full lg:max-w-[50%]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        Profil Utilisateur
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProfileField label="Nom d'utilisateur" value={session?.user?.username ? session?.user?.username.charAt(0).toUpperCase() + session?.user?.username.slice(1) : "Utilisateur"} />
                    <ProfileField label="Email" value={session?.user?.email} />
                    <ProfileField label="Rôle" value={getRoleLabel(session?.user?.role as UserRole)} />
                    <ProfileField label="Email vérifié" value={formatDate(session?.user?.emailVerified as Date)} />
                    <ProfileField label="Date de création" value={formatDate(session?.user?.createdAt as Date)} />
                </CardContent >
            </Card>
        </DashboardBody>
    );
};
