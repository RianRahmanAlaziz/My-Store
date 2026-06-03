import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ProductNotFound() {
    return (
        <main className="bg-[var(--background)] px-4 py-20">
            <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
                <h1 className="text-2xl font-bold text-[var(--foreground)]">
                    Product not found
                </h1>

                <p className="mt-3 text-[var(--muted)]">
                    Produk yang kamu cari tidak tersedia.
                </p>

                <Link href="/catalog">
                    <Button className="mt-6">Back to Catalog</Button>
                </Link>
            </div>
        </main>
    );
}