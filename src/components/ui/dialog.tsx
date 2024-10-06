"use client";
// Primitives are CLI-installed by default, but @radix-ui can also be used
import * as DialogPrimitive from "@/components/primitives/dialog";
import * as React from "react";

import { clx } from "@/libs/utils/clx/clx-merge";
import { cn } from "@/libs/utils/core/cn";
import X from "@/components/icons/x";
import { MOTION, STYLES } from "@/components/ui/_shared";
import { usePathname, useRouter } from "next/navigation";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogBody = clx.div();
export const DialogHeader = clx.div(STYLES.FLEX_COL, "items-center space-y-1.5");
export const DialogFooter = clx.div(
  "flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2",
);
export const DialogTitle = clx(
  DialogPrimitive.Title,
  "text-lg font-semibold leading-none tracking-tight",
);
export const DialogDescription = clx(
  DialogPrimitive.Description,
  "text-sm text-muted-foreground",
);
export const DialogText = clx(DialogPrimitive.Description);

export const DialogOverlay = clx(
  DialogPrimitive.Overlay,
  MOTION.ANIMATE_IN,
  MOTION.ANIMATE_OUT,
  MOTION.FADE_IN_OUT,
  "fixed inset-0 z-50 bg-black/80",
  "grid place-items-center overflow-auto", //
);

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    isIntercepting?: boolean;
  }
>(({ className, children, isIntercepting, ...props }, ref) => {
  const router = useRouter();

  const pathname = usePathname();
  const pathnameWithoutLastSegment = pathname.split("/").slice(0, -1).join("/");

  const onDismiss = React.useCallback(() => {
    if (isIntercepting) {
      router.push(pathnameWithoutLastSegment);
      // * Using push() redirects to the top of the page, contrary to back()
      // TODO: Prefer to use router.back() but need to deal with history stack
      //router.back();
    }
  }, [router, isIntercepting, pathnameWithoutLastSegment]);

  return (
    <DialogPortal>
      <DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          onEscapeKeyDown={isIntercepting ? onDismiss : undefined}
          onPointerDownOutside={isIntercepting ? onDismiss : undefined}
          className={cn(
            MOTION.ANIMATE_IN,
            MOTION.ANIMATE_OUT,
            MOTION.FADE_IN_OUT,
            MOTION.ZOOM_IN_OUT,
            MOTION.DIALOG_SLIDE_IN_OUT,
            "z-50 absolute left-[50%] top-[50%]",
            "translate-x-[-50%] translate-y-[-50%]",
            "grid w-full gap-4 p-6",
            "max-w-lg border bg-background shadow-lg duration-200 sm:rounded-lg",
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            onClick={isIntercepting ? onDismiss : undefined}
            className={cn(
              STYLES.OFFSET_BG,
              STYLES.RING_FOCUS,
              "absolute right-4 top-4",
              "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
              "rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none",
              className,
            )}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
