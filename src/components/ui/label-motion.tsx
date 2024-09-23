"use client";

import { clx } from "@/libs/utils/clx/clx-merge";
import * as LabelPrimitive from "@/components/primitives/label";

type TODO = any;

const LabelRoot = clx(
  LabelPrimitive.Root,
  "text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white",
);

function Label({ children, ...props }: React.PropsWithChildren<TODO>) {
  return <LabelRoot {...props}>{children}</LabelRoot>;
}

export { Label };
