import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function ArrowLeft({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </SvgIcon>
  );
}
