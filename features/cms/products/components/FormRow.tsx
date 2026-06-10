import type { ReactNode } from "react";

type Props = {
    title: string;
    description?: string;
    badge?: "Required" | "Optional";
    children: ReactNode;
};

export default function FormRow({ title, description, badge, children }: Props) {
    return (
        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
            <div className="form-label xl:w-64 xl:!mr-10">
                <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">{title}</div>
                        {badge && (
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                {badge}
                            </div>
                        )}
                    </div>
                    {description && (
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                            {description}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full mt-3 xl:mt-0 flex-1">{children}</div>
        </div>
    );
}
