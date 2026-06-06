import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "accent" | "success" | "destructive" | "outline";
}

export function Badge({
    className,
    variant = "default",
    children,
    ...props
}: BadgeProps) {
    const variants = {
        default:
            "bg-[var(--primary)] text-[var(--primary-foreground)]",

        accent:
            "bg-[var(--accent)] text-[var(--accent-foreground)]",

        success:
            "bg-[var(--success)] text-[var(--success-foreground)]",

        destructive:
            "bg-[var(--destructive)] text-[var(--destructive-foreground)]",

        outline:
            "border border-[var(--border)] bg-transparent text-[var(--foreground)]",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}