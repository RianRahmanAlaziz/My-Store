import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
    id: string;
    title: string;
    children: ReactNode;
    className?: string;
};

export default function FormSection({ id, title, children, className = "" }: Props) {
    return (
        <div id={id} className={`intro-y box p-5 ${className}`}>
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                    <ChevronDown className="w-4 h-4 mr-2" />
                    {title}
                </div>
                <div className="mt-5">{children}</div>
            </div>
        </div>
    );
}
