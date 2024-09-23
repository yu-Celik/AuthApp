"use client";
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

export default function DemoSidebar({ user }: { user: User }) {
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
      <Demo_Dashboard user={user} />
    </div>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

function Demo_Dashboard({ user }: { user: User }) {
  const Dashboard = clx.div("flex flex-1");
  const DashboardHeader = clx.header("flex gap-2");
  // const DashboardCell = clx.div("size-full rounded-lg bg-secondary animate-pulse");
  const DashboardBody = clx.main("flex flex-1 gap-2");
  const DashboardContainer = clx.div(
    "flex flex-col flex-1 size-full gap-2 p-2 bg-card border md:p-10 rounded-tl-2xl",
  );

  return (
    <Dashboard>
      <DashboardContainer>
        <DashboardHeader>
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 min-w-[50%]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Bienvenue :
                <span className="text-primary">{' '} {user.username}</span>
              </CardTitle>
            </CardHeader>
          </Card>
        </DashboardHeader>
        <DashboardBody>
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 min-w-[50%]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Profil Utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProfileField
                label="Nom d'utilisateur"
                value={  user.username}
              />
              <ProfileField label="Email" value={user.email} />
              <ProfileField label="Rôle" value={getRoleLabel(user.role)} />
              <ProfileField label="Email vérifié" value={formatDate(user.emailVerified)} />
              <ProfileField label="Date de création" value={formatDate(user.createdAt)} />
            </CardContent >
          </Card>
        </DashboardBody>
      </DashboardContainer>
    </Dashboard>
  );
}

const SidebarLogo = ({ user }: { user: User }) => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      {user.image ? (
        <Image src={user.image} alt="Photo de profil" width={24} height={24} className="rounded-full flex-shrink-0 w-6 h-5" />
      ) : (
        <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
      )}

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre dark:text-white"
      >
        {user.username}
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
        <Image src={user.image} alt="Photo de profil" width={24} height={24} className="rounded-full flex-shrink-0 w-6 h-5" />
      ) : (
        <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
      )}
    </Link>
  );
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        CONSTANTS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

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

const ProfileField: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="font-medium text-gray-600 dark:text-gray-300">{label}:</span>
    <span className="text-gray-800 dark:text-gray-100">{value}</span>
  </div>
);



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
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};