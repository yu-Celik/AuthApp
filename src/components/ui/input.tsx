import { cn } from "@/libs/utils/core/cn";
import { STYLES } from "@/components/ui/_shared";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, autoComplete, error, ...props }, ref) => {
    const { pending } = useFormStatus();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative flex items-center">
        <input
          type={showPassword && type === "password" ? "text" : type}
          disabled={pending}
          autoComplete={autoComplete}
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
            isFocused && "input-placeholder-hidden",
            error && "border-destructive",
            className,
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 bg-muted/60 p-1 rounded-md"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <Eye className="w-6 h-4 text-muted-foreground" /> : <EyeOff className="w-6 h-4" />}
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };