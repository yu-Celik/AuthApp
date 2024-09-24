import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react"
import { clx } from "@/libs/utils/clx/clx-merge";
import { cn } from "@/libs/utils/core/cn";
import ArrowLeft from "@/components/icons/arrow-left";
import SettingsIcon from "@/components/icons/settings";
import Terminal from "@/components/icons/terminal";
import UserPlus from "@/components/icons/user-plus";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { User, UserRole } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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