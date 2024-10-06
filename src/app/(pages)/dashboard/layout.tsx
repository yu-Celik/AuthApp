''
import { clx } from "@/libs/utils/clx/clx-merge";
import { User } from "@prisma/client";
import DashboardHeader from "@/app/components/dashboard/header";
import DashboardSidebar from "@/app/components/dashboard/sidebar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react"
import useCurrentUser from "@/app/hooks/use-current-user";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const Dashboard = clx.div("flex flex-1");
    const DashboardContainer = clx.div(
        "flex flex-col flex-1 size-full gap-2 p-2 bg-card border md:p-10 rounded-tl-2xl",
    );

    return (
        <SessionProvider>
            <DashboardSidebar>
                <Dashboard>
                    <DashboardContainer>
                        <DashboardHeader />
                        <div className="flex flex-1 gap-2">
                            {children}
                        </div>
                    </DashboardContainer>
                </Dashboard>
            </DashboardSidebar>
        </SessionProvider>
    );
};

export default DashboardLayout;