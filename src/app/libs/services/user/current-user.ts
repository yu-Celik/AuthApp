import { auth } from "@/libs/auth/next-auth"

export async function getCurrentUser() {
    const session = await auth();
    return session?.user;
}