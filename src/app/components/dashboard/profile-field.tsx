import { ReactNode } from "react";

type Props = {
    label: string;
    value: ReactNode;
    icon?: ReactNode;
}

function ProfileField({ label, value, icon }: Props) {
    return (
        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center relative w-full gap-1 xs:gap-2">
            <span className="font-medium text-gray-600 dark:text-gray-300 flex-shrink-0 xs:mr-2">{label}:</span>
            <div className="flex items-center gap-2 min-w-0 max-w-full">
                <span className="text-gray-800 dark:text-gray-100 truncate flex-grow" title={typeof value === 'string' ? value : undefined}>
                    {value}
                </span>
                {icon && <span className="flex-shrink-0">{icon}</span>}
            </div>
        </div>
    )
}

export default ProfileField