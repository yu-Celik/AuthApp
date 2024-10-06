"use client";

import { clx } from "@/libs/utils/clx/clx-merge";
// Primitives are CLI-installed by default, but @radix-ui can also be used
import * as TabsPrimitive from "@/components/primitives/tabs";
import { STYLES } from "@/components/ui/_shared";

export const Tabs = TabsPrimitive.Root;

export const TabsTrigger = clx(
  TabsPrimitive.Trigger,
  STYLES.DATA_STATE_TABS,
  STYLES.OFFSET_BG,
  "focus-visible:outline-none",
  STYLES.RING_FOCUS_VISIBLE,
  STYLES.DISABLED_EVENTS_NONE,
  STYLES.FULL_CENTER_INLINE,
  "text-sm font-medium",
  "whitespace-nowrap rounded-sm px-3 py-1.5 transition-all",
);

export const TabsContent = clx(
  TabsPrimitive.Content,
  STYLES.OFFSET_BG,
  STYLES.RING_FOCUS_VISIBLE,
  "focus-visible:outline-none",
  "mt-2",
);

export const TabsList = clx(
  TabsPrimitive.List,
  STYLES.FULL_CENTER_INLINE,
  "text-muted-foreground",
  "h-10 gap-2 rounded-md bg-muted p-1",
);
