"use client"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignIn() {
    return (
        <form
            action={async () => {
                await signIn()
            }}
        >
            <Input id="email" name="email" type="email" placeholder="m@example.com" aria-required="true" />
            <Button type="submit">Sign In</Button>
        </form>
    )
}