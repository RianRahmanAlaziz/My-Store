import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/main/ui/Button";

export function WishlistCTA() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 md:flex md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-black text-[var(--foreground)]">
                        Ready to shop your favorites?
                    </h2>

                    <p className="mt-2 text-[var(--muted)]">
                        Pilih produk favorit kamu lalu lanjutkan ke keranjang.
                    </p>
                </div>

                <Link href="/cart">
                    <Button className="mt-6 md:mt-0">
                        <ShoppingCart className="h-5 w-5" />
                        Go to Cart
                    </Button>
                </Link>
            </div>
        </section>
    );
}