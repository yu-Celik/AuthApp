"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function useCurrentUser() {
    const { data: session, update } = useSession()
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (session) {
            setIsLoading(false);
        }
    }, [session]);

    return { 
        user: session?.user, 
        updateSession: update, 
        isLoading,
        isOAuthUser: session?.user?.isOAuthUser,
        hasPassword: session?.user?.hasPassword ?? false
    }
}