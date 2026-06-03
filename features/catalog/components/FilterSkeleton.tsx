export function FilterSkeleton() {
    return (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-5 animate-pulse rounded bg-[var(--secondary)]" />
                <div className="h-5 w-20 animate-pulse rounded bg-[var(--secondary)]" />
            </div>

            <div>
                <div className="mb-3 h-4 w-24 animate-pulse rounded bg-[var(--secondary)]" />

                <div className="flex flex-col gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={`category-${index}`}
                            className="h-11 animate-pulse rounded-2xl bg-[var(--secondary)]"
                        />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <div className="mb-3 h-4 w-20 animate-pulse rounded bg-[var(--secondary)]" />

                <div className="flex flex-col gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={`brand-${index}`}
                            className="h-11 animate-pulse rounded-2xl bg-[var(--secondary)]"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}