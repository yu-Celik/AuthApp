import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function Terminal({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </SvgIcon>
  );
}
