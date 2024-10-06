import { clx } from "@/libs/utils/clx/clx-merge";
import { ANIMATE_VARIANTS } from "@/components/ui/_animate";

export const Animate = clx.div("w-fit", {
  variants: {
    onHover: ANIMATE_VARIANTS,
  },
  defaultVariants: {
    onHover: "default",
  },
});
