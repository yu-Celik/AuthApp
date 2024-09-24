import { clx } from "@/libs/utils/clx/clx-merge";
import { User } from "@prisma/client";
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