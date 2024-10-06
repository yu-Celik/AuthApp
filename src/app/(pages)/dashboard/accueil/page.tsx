'use client'
import { UserRole } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileField from "@/app/components/dashboard/profile-field";
import type { Metadata } from "next";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { toZonedTime } from 'date-fns-tz';
import { TwoFactorToggle } from "@/app/components/dashboard/two-factor-toggle";
import { getCurrentUser } from "@/app/libs/services/user/current-user";
import useCurrentUser from "@/app/hooks/use-current-user";

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

export default function DashboardLayout() {
    const { user, isLoading } = useCurrentUser();

    return (
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full md:max-w-[50%]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    Profil Utilisateur
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <ProfileField 
                    label="Nom d'utilisateur" 
                    value={user?.username && user.username.charAt(0).toUpperCase() + user.username.slice(1)} 
                    isLoading={isLoading}
                />
                <ProfileField 
                    label="Email" 
                    value={user?.email} 
                    isLoading={isLoading}
                />
                <ProfileField 
                    label="Rôle" 
                    value={user?.role ? getRoleLabel(user.role as UserRole) : ''} 
                    isLoading={isLoading}
                />
                <ProfileField 
                    label="Date de création" 
                    value={user?.createdAt ? formatDate(user.createdAt as Date) : ''} 
                    isLoading={isLoading}
                />
                <ProfileField 
                    label="Email vérifié" 
                    value={user?.emailVerified ? formatDate(user.emailVerified as Date) : ''} 
                    isLoading={isLoading}
                />
                <ProfileField 
                    label="Authentification à deux facteurs" 
                    noBg={true} 
                    value={
                        <TwoFactorToggle
                            initialState={user?.isTwoFactorEnabled || false}
                            userId={user?.id || ''}
                        />
                    } 
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};