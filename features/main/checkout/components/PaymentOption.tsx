export function PaymentOption({
    active,
    onClick,
    icon,
    title,
    subtitle,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full rounded-2xl border-2 p-6 text-left transition ${active
                ? "border-[var(--accent)] bg-[var(--accent)]/5"
                : "border-[var(--border)] hover:border-[var(--accent)]/50"
                }`}
        >
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    {icon}
                </div>

                <div>
                    <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
                    <p className="text-sm text-[var(--muted)]">{subtitle}</p>
                </div>
            </div>
        </button>
    );
}