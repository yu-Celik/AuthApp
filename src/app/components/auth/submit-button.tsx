import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils/clx/core/classNames";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { ReactNode } from "react";
export default function SubmitButton({ text, onClick, className, disabled }: { text: string | ReactNode, onClick?: (e: FormEvent) => void, className: string, disabled?: boolean }) {
    const { pending } = useFormStatus()

    return (
        <Button onClick={onClick} disabled={pending || disabled} type="submit" className={cn('w-full flex items-center justify-center', className)}>
            {pending ? <>En cours... <Loader2 className="w-4 h-4 animate-spin ml-2" /></> : text}
        </Button>
    )
}