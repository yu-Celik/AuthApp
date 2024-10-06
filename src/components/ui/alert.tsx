import type { PropsWithChildren } from "react";

import { clx } from "@/libs/utils/clx/clx-merge";
import type { VariantProps } from "@/libs/utils/clx/types";

type AlertVariants = VariantProps<typeof AlertRoot>;

export const AlertTitle = clx.h5("mb-1 font-medium leading-none tracking-tight");
export const AlertDescription = clx.div("text-sm [&_p]:leading-relaxed");

const AlertRoot = clx.div(
  "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground mx-4",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  },
);

export function Alert({ children, variant }: PropsWithChildren<AlertVariants>) {
  return (
    <AlertRoot role="alert" variant={variant}>
      {children}
    </AlertRoot>
  );
}
