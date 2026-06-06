import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "accent";
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
            `
        bg-[var(--accent)]
        text-[var(--accent-foreground)]
        shadow-md shadow-[var(--accent)]/20
        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-[var(--accent)]/30
        active:translate-y-0
        active:scale-95
        `,
        secondary:
            `
        bg-[var(--secondary)]
        text-[var(--secondary-foreground)]
        shadow-sm
        hover:bg-[var(--border)]
        hover:shadow-md
        active:scale-95
        `,
        ghost:
            `
        bg-transparent
        text-[var(--foreground)]
        hover:bg-[var(--secondary)]
        hover:shadow-sm
        active:scale-95
        `,
        outline:
            `
        border border-[var(--border)]
        bg-transparent
        text-[var(--foreground)]
        shadow-sm
        hover:bg-[var(--secondary)]
        hover:shadow-md
        active:scale-95
        `,
        accent:
            `
        bg-[var(--primary)]
        text-[var(--primary-foreground)]
        shadow-md shadow-[var(--primary)]/20
        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-[var(--primary)]/30
        active:translate-y-0
        active:scale-95
        `,
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
                `inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                font-semibold
                transition-all
                duration-300
                disabled:pointer-events-none
                disabled:opacity-50
                `,
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