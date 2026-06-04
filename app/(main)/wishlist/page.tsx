"use client";

import { WishlistCTA } from "@/features/main/wishlist/components/WishlistCTA";
import { WishlistEmpty } from "@/features/main/wishlist/components/WishlistEmpty";
import { WishlistHeader } from "@/features/main/wishlist/components/WishlistHeader";
import { WishlistLoading } from "@/features/main/wishlist/components/WishlistLoading";
import { WishlistProductGrid } from "@/features/main/wishlist/components/WishlistProductGrid";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";

export default function WishlistPage() {
    const {
        wishlistItems,
        loading,
        removeItem,
        clearLocalItems,
    } = useWishlist();

    if (loading) {
        return <WishlistLoading />;
    }

    if (wishlistItems.length === 0) {
        return <WishlistEmpty />;
    }

    return (
        <main className="bg-[var(--background)]">
            <WishlistHeader />

            <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-[var(--muted)]">
                        Showing{" "}
                        <span className="font-bold text-[var(--foreground)]">
                            {wishlistItems.length}
                        </span>{" "}
                        saved products
                    </p>

                    <button
                        onClick={clearLocalItems}
                        className="text-sm font-semibold text-[var(--destructive)]"
                    >
                        Clear All
                    </button>
                </div>

                <WishlistProductGrid
                    items={wishlistItems}
                    onRemove={removeItem}
                />
            </section>

            <WishlistCTA />
        </main>
    );
}