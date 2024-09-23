import React from 'react';
import DemoSidebar from '@/components/demos/ui/demo-sidebar';
import { auth } from '@/libs/next-auth';
import { User } from '@prisma/client';

const DashboardLayout = async ({  }: { children: React.ReactNode }) => {
    const session = await auth();
    return (
        <DemoSidebar user={session?.user as User} />
    );
};

export default DashboardLayout;