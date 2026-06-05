export function SummaryRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-[var(--muted)]">{label}</span>
            <span className="font-semibold text-[var(--foreground)]">{value}</span>
        </div>
    );
}