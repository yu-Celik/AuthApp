'use server'

import { signOut as nextAuthSignOut } from '@/libs/auth/next-auth'

export async function signOut() {
    await nextAuthSignOut()
}