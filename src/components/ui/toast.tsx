"use client";

import type * as React from "react";

import { clx } from "@/libs/utils/clx/clx-merge";
import type { ComponentProps, VariantProps } from "@/libs/utils/clx/types";
import type { LucideIcon } from "@/components/icons/_iconUtils";
import X from "@/components/icons/x";
// Primitives are CLI-installed by default, but @radix-ui can also be used
import * as ToastPrimitives from "@/components/primitives/toast";
import { STYLES } from "@/components/ui/_shared";

export const ToastProvider = ToastPrimitives.Provider;
export const ToastTitle = clx(ToastPrimitives.Title, "text-sm font-semibold");
export const ToastDescription = clx(ToastPrimitives.Description, "text-sm opacity-90");
export const ToastViewport = clx(
  ToastPrimitives.Viewport,
  "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4",
  "sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
);

export const Toast = clx(
  ToastPrimitives.Root,
  STYLES.FLEX_CENTER_JUSTIFIED,
  "group relative",
  "w-full space-x-4",
  "pointer-events-auto overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
  "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "default group bg-background",
        error: "error group border-error/50 bg-error-foreground text-error",
        success: "success group border-success/50 bg-success-foreground text-success",
        warning: "warning group border-warning/50 bg-warning-foreground text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const ToastAction = clx(
  ToastPrimitives.Action,
  "hover:bg-secondary inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  // default
  "group-[.default]:hover:border-default/30 group-[.default]:focus:ring-default group-[.default]:border-muted/40 group-[.default]:bg-neutral-900 group-[.default]:text-neutral-50",
  // error
  "group-[.error]:border-muted/40 group-[.error]:bg-error group-[.error]:text-error-foreground group-[.error]:hover:border-error/30 group-[.error]:focus:ring-error",
  // success
  "group-[.success]:border-muted/40 group-[.success]:bg-success group-[.success]:text-success-foreground group-[.success]:hover:border-success/30 group-[.success]:focus:ring-success",
  // warning
  "group-[.warning]:border-muted/40 group-[.warning]:bg-warning group-[.warning]:text-warning-foreground group-[.warning]:hover:border-warning/30 group-[.warning]:focus:ring-warning",
);

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export function ToastClose({
  children,
}: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>) {
  const ToastClose_Root = clx(
    ToastPrimitives.Close,
    "absolute right-2 top-2 rounded-md p-1 text-foreground/50 hover:text-foreground",
    "opacity-0 transition-opacity",
    "focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.error]:text-red-300 group-[.error]:hover:text-red-50 group-[.error]:focus:ring-red-400 group-[.error]:focus:ring-offset-red-600",
  );

  return (
    <ToastClose_Root toast-close="">
      {children} <X className="size-4" />
    </ToastClose_Root>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                       ✨ TYPES ✨                          */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export type ToastVariants = VariantProps<typeof Toast>;
export type ToastProps = ComponentProps<typeof Toast> & {
  icon?: LucideIcon;
};
