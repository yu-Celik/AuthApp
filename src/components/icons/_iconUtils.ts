import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

// type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface LucideProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;
