import * as React from "react";
import ReactDOM from "react-dom";

import type * as Ever from "./core-primitive";
import { Primitive } from "./core-primitive";

/* -------------------------------------------------------------------------------------------------
 * Portal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = "Portal";

type PortalElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = Ever.ComponentPropsWithoutRef<typeof Primitive.div>;
interface PortalProps extends PrimitiveDivProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null;
}

const Portal = React.forwardRef<PortalElement, PortalProps>((props, forwardedRef) => {
  const { container = globalThis?.document?.body, ...portalProps } = props;
  return container
    ? ReactDOM.createPortal(
        <Primitive.div {...portalProps} ref={forwardedRef} />,
        container,
      )
    : null;
});

Portal.displayName = PORTAL_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Portal;

export {
  Portal,
  //
  Root,
};
export type { PortalProps };
