import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SummaryRow } from "@/features/main/cart/components/SummaryRow";
import type { CartSummary as CartSummaryType } from "@/features/main/cart/types/cart";

export function CartSummary({ summary }: { summary: CartSummaryType }) {
    return (
        <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-black text-[var(--foreground)]">
                Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-[var(--border)] pb-5">
                <SummaryRow
                    label="Subtotal"
                    value={`Rp ${summary.subtotal.toLocaleString("id-ID")}`}
                />
                <SummaryRow
                    label="Shipping"
                    value={
                        summary.shipping === 0
                            ? "FREE"
                            : `Rp ${summary.shipping.toLocaleString("id-ID")}`
                    }
                />
                <SummaryRow
                    label="Discount"
                    value={`- Rp ${summary.discount.toLocaleString("id-ID")}`}
                />
            </div>

            <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-bold text-[var(--foreground)]">Total</span>
                <span className="text-2xl font-black text-[var(--foreground)]">
                    Rp {summary.total.toLocaleString("id-ID")}
                </span>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[var(--secondary)] p-4 text-sm text-[var(--muted)]">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <p>Gratis ongkir untuk total belanja di atas Rp 500.000.</p>
            </div>

            <Link href="/checkout">
                <Button className="mt-6 w-full" size="lg">
                    Checkout
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </Link>
        </aside>
    );
}