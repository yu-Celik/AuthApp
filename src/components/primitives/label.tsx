import * as React from "react";

import type * as Ever from "./core-primitive";
import { Primitive } from "./core-primitive";

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                          LABEL                             */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

type LabelElement = React.ElementRef<typeof Primitive.label>;
type PrimitiveLabelProps = Ever.ComponentPropsWithoutRef<typeof Primitive.label>;
interface LabelProps extends PrimitiveLabelProps {}

const LabelPrimitive = React.forwardRef<LabelElement, LabelProps>(
  (props, forwardedRef) => {
    return (
      <Primitive.label
        {...props}
        ref={forwardedRef}
        onMouseDown={(event) => {
          // only prevent text selection if clicking inside the label itself
          const target = event.target as HTMLElement;
          if (target.closest("button, input, select, textarea")) {
            return;
          }

          props.onMouseDown?.(event);
          // prevent text selection when double clicking label
          if (!event.defaultPrevented && event.detail > 1) {
            event.preventDefault();
          }
        }}
      />
    );
  },
);

LabelPrimitive.displayName = "LabelPrimitive";

const Root = LabelPrimitive;

export { LabelPrimitive, Root };
export type { LabelProps };
