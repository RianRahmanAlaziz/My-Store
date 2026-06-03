import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

type EmptyProductProps = {
    onReset: () => void;
};

export function EmptyProduct({ onReset }: EmptyProductProps) {
    return (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--accent)]">
                <Search className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-bold text-[var(--foreground)]">
                Product not found
            </h3>

            <p className="mt-2 text-[var(--muted)]">
                Coba gunakan keyword atau filter lain.
            </p>

            <Button className="mt-6" onClick={onReset}>
                Reset Search
            </Button>
        </div>
    );
}