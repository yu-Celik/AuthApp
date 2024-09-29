import { clx } from "@/libs/utils/clx/clx-merge";
// Primitives are CLI-installed by default, but @radix-ui can also be used
import * as SwitchPrimitives from "@/components/primitives/switch";
import { STYLES } from "@/components/ui/_shared";

const SwitchRoot = clx(
  SwitchPrimitives.Root,
  STYLES.RING_FOCUS_VISIBLE,
  STYLES.DISABLED_NOT_ALLOWED,
  "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  "focus-visible:outline-none focus-visible:ring-offset-background",
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
);

const SwitchIndicator = clx(
  SwitchPrimitives.Thumb,
  "size-5",
  "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
);

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export function Switch({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>) {
  return (
    <div className="flex items-center">
      <SwitchRoot {...props}>
        <SwitchIndicator />
      </SwitchRoot>
      {children && <div className="ml-2">{children}</div>}
    </div>
  );
}
