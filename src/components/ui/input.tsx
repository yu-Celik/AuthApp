import { cn } from "@/libs/utils/core/cn";
import { STYLES } from "@/components/ui/_shared";
import React from "react";
import { useFormStatus } from "react-dom";


export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { pending } = useFormStatus();
    return (
      <input
        type={type}
        disabled={pending}
        className={cn(
          STYLES.OFFSET_BG,
          STYLES.RING_FOCUS_VISIBLE,
          STYLES.BORDER_INPUT,
          STYLES.DISABLED_NOT_ALLOWED,
          STYLES.TEXT_MUTED_PLACEHOLDER,
          "focus-visible:outline-none",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "flex h-10 w-full",
          "rounded-md bg-background px-3 py-2 text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
