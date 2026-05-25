import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
};

export function Button({
    children,
    className,
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    const variants = {
        primary:
            "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90",
        secondary:
            "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--border)]",
        ghost:
            "bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]",
        outline:
            "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-14 px-7 text-base",
        icon: "h-11 w-11 p-0",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}