import { clx } from "@/libs/utils/clx/clx-merge";
import type { ComponentProps, VariantProps } from "@/libs/utils/clx/types";
import { MOTION } from "@/components/ui/_shared";

const HEADINGS_VARIANTS = {
  variant: {
    default: "text-pretty",
    modern:
      "bg-gradient-to-r from-white to-gray-500 bg-clip-text tracking-tighter text-transparent",
    underlined:
      "underline underline-offset-3 decoration-8 decoration-neutral-400 dark:decoration-neutral-600",
  },
  motion: {
    fadeUp: MOTION.ANIMATE_FADE_UP,
    fadeOut: MOTION.ANIMATE_SCROLL_FADE_OUT,
    makeBigger: MOTION.ANIMATE_SCROLL_BIGGER,
  },
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        COMPONENTS                          */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const H1 = clx.h1("text-4xl font-bold", {
  variants: HEADINGS_VARIANTS,
  defaultVariants: {
    variant: "default",
  },
});

export const H2 = clx.h2("text-3xl font-bold", {
  variants: HEADINGS_VARIANTS,
  defaultVariants: {
    variant: "default",
  },
});

export const H3 = clx.h3("text-2xl font-bold", {
  variants: HEADINGS_VARIANTS,
  defaultVariants: {
    variant: "default",
  },
});

export const H4 = clx.h4("text-xl font-bold", {
  variants: HEADINGS_VARIANTS,
  defaultVariants: {
    variant: "default",
  },
});

export type HeadingVariants = VariantProps<typeof H1>;
export type HeadingProps = ComponentProps<typeof H1>;
