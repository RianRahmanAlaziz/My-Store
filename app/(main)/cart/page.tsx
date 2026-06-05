"use client";

import { CartEmpty } from "@/features/main/cart/components/CartEmpty";
import { CartItemCard } from "@/features/main/cart/components/CartItemCard";
import { CartLoading } from "@/features/main/cart/components/CartLoading";
import { CartSummary } from "@/features/main/cart/components/CartSummary";
import { useCartPage } from "@/features/main/cart/hooks/useCartPage";

export default function CartPage() {
    const {
        cartItems,
        summary,
        loading,
        updatingId,
        handleVariantChange,
        handleQuantityChange,
        handleRemoveItem,
    } = useCartPage();

    if (loading && cartItems.length === 0) {
        return <CartLoading />;
    }

    if (cartItems.length === 0) {
        return <CartEmpty />;
    }

    return (
        <main className="bg-[var(--background)]">
            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px] lg:px-8">
                <div className="space-y-5">
                    {cartItems.map((item) => (
                        <CartItemCard
                            key={item.id}
                            item={item}
                            updatingId={updatingId}
                            onVariantChange={handleVariantChange}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                </div>

                <CartSummary summary={summary} />
            </section>
        </main>
    );
}