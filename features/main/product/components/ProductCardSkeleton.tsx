export function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="aspect-square animate-pulse rounded-2xl bg-[var(--secondary)]" />

            <div className="mt-4 h-4 w-20 animate-pulse rounded bg-[var(--secondary)]" />

            <div className="mt-3 h-5 w-32 animate-pulse rounded bg-[var(--secondary)]" />

            <div className="mt-4 h-6 w-28 animate-pulse rounded bg-[var(--secondary)]" />
        </div>
    );
}