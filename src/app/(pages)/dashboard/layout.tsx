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
import { auth } from "@/libs/next-auth";
import DashboardHeader from "@/app/components/dashboard/header";
import DashboardSidebar from "@/app/components/dashboard/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    const Dashboard = clx.div("flex flex-1");
    const DashboardContainer = clx.div(
        "flex flex-col flex-1 size-full gap-2 p-2 bg-card border md:p-10 rounded-tl-2xl",
    );

    return (
        <DashboardSidebar user={session?.user as User}>
            <Dashboard>
                <DashboardContainer>
                    <DashboardHeader user={session?.user as User} />
                    {children}
                </DashboardContainer>
            </Dashboard>
        </DashboardSidebar>
    );
};

export default DashboardLayout;