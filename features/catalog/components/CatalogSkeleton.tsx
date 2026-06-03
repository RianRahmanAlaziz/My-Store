export function CatalogSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4"
                >
                    <div className="aspect-square rounded-2xl bg-[var(--secondary)]" />
                    <div className="mt-4 h-4 w-24 rounded bg-[var(--secondary)]" />
                    <div className="mt-3 h-5 w-40 rounded bg-[var(--secondary)]" />
                    <div className="mt-5 h-6 w-32 rounded bg-[var(--secondary)]" />
                </div>
            ))}
        </div>
    );
}