"use client"
import { Button } from "@/components/ui/button"
import { signOut } from "@/app/server-actions/sign-out"
import { useCallback } from "react"

export default function SignOutButton(props: React.ComponentPropsWithRef<typeof Button>) {

    const onClick = useCallback(() => {
        signOut()
    }, [])
    
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            {...props}
        >
            Sign Out
        </Button>
    )
}