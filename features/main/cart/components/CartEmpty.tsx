import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CartEmpty() {
    return (
        <main className="bg-[var(--background)] px-4 py-20">
            <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--accent)]">
                    <ShoppingBag className="h-10 w-10" />
                </div>

                <h1 className="text-3xl font-black text-[var(--foreground)]">
                    Your cart is empty
                </h1>

                <p className="mt-3 text-[var(--muted)]">
                    Belum ada produk di keranjang kamu.
                </p>

                <Link href="/catalog">
                    <Button className="mt-6">Continue Shopping</Button>
                </Link>
            </div>
        </main>
    );
}