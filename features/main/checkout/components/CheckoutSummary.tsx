import { SummaryRow } from "@/features/main/checkout/components/SummaryRow";
import {
    formatPrice,
    formatShortPrice,
} from "@/features/main/checkout/utils/formatPrice";

type OrderItem = {
    id: number;
    image: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
    subtotal: number;
};

export function CheckoutSummary({
    orderItems,
    subtotal,
    shipping,
    total,
}: {
    orderItems: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
}) {
    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
                <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">
                    Order Summary
                </h2>

                <div className="mb-6 space-y-4">
                    {orderItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-xl bg-[var(--muted)]">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-[var(--foreground)]">
                                    {item.name}
                                </h4>

                                <p className="text-xs text-[var(--muted)]">
                                    Size: {item.size} / {item.color} × {item.quantity}
                                </p>
                            </div>

                            <span className="font-semibold text-[var(--foreground)]">
                                {formatShortPrice(item.subtotal)}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 border-t border-[var(--border)] pt-4">
                    <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />

                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted)]">Shipping</span>
                        <span className="font-semibold text-[var(--success)]">
                            {shipping === 0 ? "FREE" : formatPrice(shipping)}
                        </span>
                    </div>

                    <div className="flex justify-between border-t border-[var(--border)] pt-3 text-lg font-bold text-[var(--foreground)]">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}