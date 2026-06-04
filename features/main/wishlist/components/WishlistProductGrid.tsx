import { Trash2 } from "lucide-react";

import { ProductCard } from "@/features/main/product/components/ProductCard";
import type { WishlistItem } from "@/features/main/wishlist/types/wishlist";

type WishlistProductGridProps = {
    items: WishlistItem[];
    onRemove: (wishlistId: number) => void;
};

export function WishlistProductGrid({
    items,
    onRemove,
}: WishlistProductGridProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
                <div key={item.id} className="relative">
                    <ProductCard
                        product={item.product}
                        topAction={
                            <button
                                type="button"
                                onClick={() => onRemove(item.id)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)]/80 text-[var(--destructive)] backdrop-blur transition hover:bg-[var(--destructive)] hover:text-white"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        }
                    />
                </div>
            ))}
        </div>
    );
}