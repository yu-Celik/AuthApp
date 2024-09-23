"use client"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function SignOutButton(props: React.ComponentPropsWithRef<typeof Button>) {
    return (
        <Button
            variant="ghost"
            onClick={async () => {
                await signOut()
            }}
            {...props}
        >
            Sign Out
        </Button>
    )
}