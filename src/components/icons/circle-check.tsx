import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function CircleCheck({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </SvgIcon>
  );
}
