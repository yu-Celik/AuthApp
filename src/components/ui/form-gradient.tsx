import { clx } from "@/libs/utils/clx/clx-merge";

// TODO UI

export const ButtonGradient = clx.button(
  "group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
);

export function BottomGradient() {
  const SHARED_STYLES =
    "absolute -bottom-px bg-gradient-to-r from-transparent to-transparent transition duration-500 group-hover/btn:opacity-100 opacity-0";

  const Cyan = clx.span(SHARED_STYLES, "inset-x-0 block h-px w-full via-cyan-500");
  const Indigo = clx.span(
    SHARED_STYLES,
    "inset-x-10 mx-auto block h-px w-1/2 via-indigo-500 blur-sm",
  );

  return (
    <>
      <Cyan />
      <Indigo />
    </>
  );
}
