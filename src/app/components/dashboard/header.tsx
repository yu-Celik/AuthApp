"use client"

import { clx } from "@/libs/utils/clx/clx-merge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useCurrentUser from "@/app/hooks/use-current-user";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardHeader() {
    const DashboardHeader = clx.header("flex gap-2");
    const { user, isLoading } = useCurrentUser();

    return (
        <DashboardHeader>
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full">
                <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex flex-wrap items-center">
                        <span className="mr-2 ">Bienvenue :</span>
                        {isLoading ? (
                            <Skeleton className="h-4 w-32" />
                        ) : (
                            <span className="text-primary truncate max-w-full" title={user?.username as string}>
                                {user?.username
                                    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
                                    : "Utilisateur"}
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
            </Card>
        </DashboardHeader>
    )
}

export default DashboardHeader