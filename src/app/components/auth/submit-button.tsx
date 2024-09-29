import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/libs/utils/clx/core/classNames";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
    text: string | ReactNode;
    loadingText?: string;
    isLoading?: boolean;
    type?: "submit" | "button";
}

export default function SubmitButton({
    text,
    loadingText = "En cours...",
    type = "submit",
    className,
    disabled,
    isLoading,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    const loading = pending || isLoading;
    const isDisabled = loading || disabled;

    return (
        <Button
            type={type}
            disabled={isDisabled}
            className={cn('w-full flex items-center justify-center text-wrap', className ?? '')}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <>
                    {loadingText} <Loader2 className="w-4 h-4 animate-spin ml-2" aria-hidden="true" />
                </>
            ) : text}
        </Button>
    );
}