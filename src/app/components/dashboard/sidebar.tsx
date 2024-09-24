"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useState } from "react";
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

type Props = {
    user: User
    children: ReactNode
}
function DashboardSidebar({ children, user }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row w-lvw flex-1  border  overflow-hidden",
                "h-lvh",
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                        {open ? <SidebarLogo user={user} /> : <SidebarLogoIcon user={user} />}
                        <div className="flex flex-col gap-2 mt-8">
                            {LINKS_ITEMS.map((link, idx) => (
                                <SidebarLink key={idx} link={link} onClick={link.onClick} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            {children}
        </div>
    )
}

const SidebarLogo = ({ user }: { user: User }) => {
    return (
        <Link
            href="#"
            className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
        >
            {user.image ? (
                <Image src={user.image} alt="Photo de profil" width={24} height={24} className="rounded-full flex-shrink-0 w-6 h-6" />
            ) : (
                <div className="flex-shrink-0 w-6 h-6 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
            )}

            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black whitespace-pre dark:text-white "
            >
                { user.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : "Utilisateur" }
            </motion.span>
        </Link>
    );
};
const SidebarLogoIcon = ({ user }: { user: User }) => {
    return (
        <Link
            href="#"
            className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
        >
            {user.image ? (
                <Image src={user.image} alt="Photo de profil" width={24} height={24} className="rounded-full flex-shrink-0 w-6 h-6" />
            ) : (
                <div className="flex-shrink-0 w-6 h-6 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
            )}
        </Link>
    );
};

const LINKS_ITEMS = [
    {
        label: "Dashboard",
        href: "#",
        icon: <Terminal className="flex-shrink-0 size-5" />,
    },
    {
        label: "Profile",
        href: "#",
        icon: <UserPlus className="flex-shrink-0 size-5" />,
    },
    {
        label: "Settings",
        href: "#",
        icon: <SettingsIcon className="flex-shrink-0 size-5" />,
    },
    {
        label: "Logout",
        href: "#",
        icon: <ArrowLeft className="flex-shrink-0 size-5" />,
        onClick: async () => {
            await signOut()
        }
    },
];



export default DashboardSidebar