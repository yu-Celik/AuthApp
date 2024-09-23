import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function MenuIcon({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </SvgIcon>
  );
}
