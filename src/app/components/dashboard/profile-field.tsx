import { ReactNode } from "react";

type Props = {
    label: string;
    value: ReactNode;
}
function ProfileField({ label, value }: Props) {
    return (
        <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600 dark:text-gray-300">{label}:</span>
            <span className="text-gray-800 dark:text-gray-100">{value}</span>
        </div>
    )
}
export default ProfileField