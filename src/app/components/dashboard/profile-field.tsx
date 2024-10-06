import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

type Props = {
    label: string;
    value: ReactNode;
    noBg?: boolean;
    isLoading?: boolean;
}

function ProfileField({ label, value, noBg = false, isLoading }: Props) {
    return (

        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center relative w-full gap-1 xs:gap-2 border-b border-muted py-3">
            <span className="font-medium text-gray-600 dark:text-gray-300 flex-shrink-0 xs:mr-2">{label}:</span>
            {isLoading ?
                (<Skeleton className="h-4 w-32" />
                ) :
                <div className={`flex items-center gap-2 min-w-0 max-w-full ${noBg ? '' : 'bg-muted rounded-md py-1 px-2'}`}>
                    <span className={`${noBg ? '' : 'text-muted-foreground'} truncate flex-grow`} title={typeof value === 'string' ? value : undefined}>
                        {value}
                    </span>
                </div>
            }
        </div>
    )
}

export default ProfileField