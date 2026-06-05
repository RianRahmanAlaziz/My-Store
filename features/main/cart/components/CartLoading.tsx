import { Loader2 } from "lucide-react";

export function CartLoading() {
    return (
        <main className="bg-[var(--background)] px-4 py-20">
            <div className="mx-auto flex max-w-2xl items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />

                <span className="ml-3 text-[var(--muted)]">Loading cart...</span>
            </div>
        </main>
    );
}