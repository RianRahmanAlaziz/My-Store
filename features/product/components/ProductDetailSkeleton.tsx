export function ProductDetailSkeleton() {
    return (
        <div className="space-y-20 animate-pulse">
            <div className="grid gap-10 lg:grid-cols-2">
                {/* Gallery */}
                <div>
                    <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)]">
                        <div className="aspect-square bg-[var(--secondary)]" />
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="aspect-square rounded-2xl bg-[var(--secondary)]"
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div>
                    <div className="mb-4 h-10 w-24 rounded-full bg-[var(--secondary)]" />

                    <div className="h-12 w-3/4 rounded-xl bg-[var(--secondary)]" />

                    <div className="mt-4 h-6 w-40 rounded bg-[var(--secondary)]" />

                    <div className="mt-6 flex gap-3">
                        <div className="h-10 w-40 rounded bg-[var(--secondary)]" />
                        <div className="h-10 w-24 rounded bg-[var(--secondary)]" />
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="h-4 w-full rounded bg-[var(--secondary)]" />
                        <div className="h-4 w-full rounded bg-[var(--secondary)]" />
                        <div className="h-4 w-2/3 rounded bg-[var(--secondary)]" />
                    </div>

                    {/* Features */}
                    <div className="mt-8">
                        <div className="mb-4 h-5 w-32 rounded bg-[var(--secondary)]" />

                        <div className="space-y-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-4 w-full rounded bg-[var(--secondary)]"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="mt-8">
                        <div className="mb-3 h-5 w-24 rounded bg-[var(--secondary)]" />

                        <div className="flex gap-3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-12 w-14 rounded-xl bg-[var(--secondary)]"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Color */}
                    <div className="mt-8">
                        <div className="mb-3 h-5 w-28 rounded bg-[var(--secondary)]" />

                        <div className="flex gap-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-12 w-28 rounded-xl bg-[var(--secondary)]"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mt-8 flex gap-4">
                        <div className="h-12 w-36 rounded-xl bg-[var(--secondary)]" />
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <div className="h-14 flex-1 rounded-2xl bg-[var(--secondary)]" />
                        <div className="h-14 w-14 rounded-2xl bg-[var(--secondary)]" />
                    </div>

                    {/* Benefits */}
                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-24 rounded-2xl bg-[var(--secondary)]"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <section>
                <div className="mb-8 h-8 w-48 rounded bg-[var(--secondary)]" />

                <div className="space-y-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"
                        >
                            <div className="h-5 w-48 rounded bg-[var(--secondary)]" />

                            <div className="mt-4 h-4 w-full rounded bg-[var(--secondary)]" />
                            <div className="mt-2 h-4 w-full rounded bg-[var(--secondary)]" />
                            <div className="mt-2 h-4 w-2/3 rounded bg-[var(--secondary)]" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Products */}
            <section>
                <div className="mb-8 h-8 w-56 rounded bg-[var(--secondary)]" />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4"
                        >
                            <div className="aspect-square rounded-2xl bg-[var(--secondary)]" />

                            <div className="mt-4 h-4 w-20 rounded bg-[var(--secondary)]" />

                            <div className="mt-3 h-5 w-32 rounded bg-[var(--secondary)]" />

                            <div className="mt-4 h-6 w-28 rounded bg-[var(--secondary)]" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}