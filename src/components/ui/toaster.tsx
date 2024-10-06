"use client";

import { cn } from "@/libs/utils/core/cn";
import { useHasFocus } from "@/components/hooks/use-has-focus";
import { useMediaQuery } from "@/components/hooks/use-media-query";
import type { LucideIcon, LucideProps } from "@/components/icons/_iconUtils";
import CircleAlert from "@/components/icons/circle-alert";
import CircleCheck from "@/components/icons/circle-check";
import TriangleAlert from "@/components/icons/triangle-alert";
import { Flex, FlexCol } from "@/components/ui/containers";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastProps,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const DEFAULT_DURATION = 5000;

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export function Toaster() {
  const isMobile = useMediaQuery("sm");
  const TOAST_LIMIT_TO_DISPLAY: number = isMobile ? 1 : 3;
  const { toasts } = useToast();
  const toastsToDisplay = toasts.slice(0, TOAST_LIMIT_TO_DISPLAY);

  return (
    <ToastProvider duration={DEFAULT_DURATION}>
      <ToastViewport />
      {toastsToDisplay.map(
        ({ id, title, description, action, icon, variant, ...props }) => (
          <Toast
            className="relative mt-3 group/toast"
            key={id}
            variant={variant}
            {...props}
          >
            <Flex className="items-center">
              {renderIcon_(variant, icon)}
              <FlexCol className="gap-1">
                {title && (
                  <ToastTitle className={cn({ "font-normal": !description })}>
                    {title}
                  </ToastTitle>
                )}
                {description && <ToastDescription>{description}</ToastDescription>}
              </FlexCol>
            </Flex>
            {action}
            <ToastClose />
            <ToastTrackDurationBar_ duration={props.duration ?? DEFAULT_DURATION} />
          </Toast>
        ),
      )}
    </ToastProvider>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                      ✨ HELPERS ✨                         */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

const ToastTrackDurationBar_ = ({ duration }: { duration: number }) => {
  const hasWindowFocus = useHasFocus();
  if (duration === Number.POSITIVE_INFINITY || duration <= 0) {
    return null;
  }
  return (
    <div
      style={{ animationDuration: `${duration}ms` }}
      className={cn(
        "absolute bottom-0 left-0 !ml-0 h-1 w-full origin-left animate-track-toast-duration bg-current group-hover/toast:[animation-play-state:paused] group-focus/toast:[animation-play-state:paused]",
        {
          "[animation-play-state:paused]": !hasWindowFocus,
        },
      )}
    />
  );
};

const renderIcon_ = (variant: ToastProps["variant"], LucideIcon?: LucideIcon) => {
  const iconProps: LucideProps = { className: "size-5 mr-3 shrink-0", strokeWidth: 1.5 };

  switch (variant) {
    case "success":
      return <CircleCheck {...iconProps} />;
    case "error":
      return <CircleAlert {...iconProps} />;
    case "warning":
      return <TriangleAlert {...iconProps} />;
    default:
      return LucideIcon ? <LucideIcon {...iconProps} /> : null;
  }
};
