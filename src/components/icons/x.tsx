import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function X({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </SvgIcon>
  );
}
