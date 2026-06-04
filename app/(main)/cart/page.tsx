"use client";

import Link from "next/link";
import {
    ArrowRight,
    Loader2,
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
    Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import {
    getCart,
    removeCartItem,
    updateCartQuantity,
    updateCartVariant
} from "@/features/main/cart/services/cartService";

interface Variant {
    id: number;
    size: string;
    color: string;
    stock?: number;
}

interface CartItem {
    id: number;
    slug: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
    subtotal: number;
    variantId: number | null;
    variants: Variant[];
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    const shipping = subtotal > 500000 ? 0 : 25000;
    const discount = 0;
    const total = subtotal + shipping - discount;

    const fetchCart = async () => {
        try {
            setLoading(true);

            const response = await getCart();

            const items = response.data.items.map((item: any) => ({
                id: item.id,
                slug: item.product.slug,
                name: item.product.name,
                brand: item.product.brand ?? "-",
                image: item.product.image ?? "/images/placeholder-shoe.png",
                price: Number(item.product.price),
                size: item.variant?.size ?? "-",
                color: item.variant?.color ?? "-",
                quantity: item.quantity,
                subtotal: Number(item.subtotal),
                variantId: item.variant?.id ?? null,
                variants: item.product.variants ?? [],
            }));

            setCartItems(items);
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Gagal mengambil cart");
        } finally {
            setLoading(false);
        }
    };

    const handleVariantChange = async (
        cartId: number,
        variantId: number
    ) => {
        try {
            setUpdatingId(cartId);

            await updateCartVariant(
                cartId,
                variantId
            );

            fetchCart();

            toast.success("Variant berhasil diubah");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                "Gagal mengubah variant"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const updateQuantity = async (id: number, quantity: number) => {
        if (quantity < 1) return;

        try {
            setUpdatingId(id);

            await updateCartQuantity(id, quantity);

            setCartItems((items) =>
                items.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity,
                            subtotal: item.price * quantity,
                        }
                        : item
                )
            );
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Gagal update quantity");
        } finally {
            setUpdatingId(null);
        }
    };

    const removeItem = async (id: number) => {
        try {
            setUpdatingId(id);

            await removeCartItem(id);

            setCartItems((items) => items.filter((item) => item.id !== id));

            toast.success("Produk dihapus dari cart");
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Gagal menghapus cart");
        } finally {
            setUpdatingId(null);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);



    if (loading) {
        return (
            <main className="bg-[var(--background)] px-4 py-20">
                <div className="mx-auto flex max-w-2xl items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
                    <span className="ml-3 text-[var(--muted)]">Loading cart...</span>
                </div>
            </main>
        );
    }

    if (cartItems.length === 0) {
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

    return (
        <main className="bg-[var(--background)]">
            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px] lg:px-8">
                <div className="space-y-5">
                    {cartItems.map((item) => {
                        const uniqueSizes = Array.from(
                            new Set(item.variants.map((variant) => variant.size))
                        );

                        const availableColors = item.variants
                            .filter((variant) => variant.size === item.size)
                            .map((variant) => variant.color);

                        const uniqueColors = Array.from(new Set(availableColors));

                        return (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 md:p-5"
                            >
                                <div className="flex gap-4">
                                    <Link
                                        href={`/product/${item.slug}`}
                                        className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[var(--secondary)] md:h-36 md:w-36"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </Link>

                                    <div className="flex flex-1 flex-col justify-between gap-4">
                                        <div className="flex justify-between gap-4">
                                            <div>
                                                <p className="text-sm text-[var(--muted)]">
                                                    {item.brand}
                                                </p>

                                                <Link href={`/product/${item.slug}`}>
                                                    <h2 className="mt-1 line-clamp-2 text-lg font-bold text-[var(--foreground)] transition hover:text-[var(--accent)]">
                                                        {item.name}
                                                    </h2>
                                                </Link>

                                                <div className="mt-4 space-y-4">
                                                    <div>
                                                        <label className="mb-2 block text-xs font-semibold text-[var(--muted)]">
                                                            Size
                                                        </label>

                                                        <div className="flex flex-wrap gap-2">
                                                            {uniqueSizes.map((size) => {
                                                                const isSelected = size === item.size;

                                                                return (
                                                                    <button
                                                                        key={size}
                                                                        type="button"
                                                                        disabled={updatingId === item.id}
                                                                        onClick={() => {
                                                                            const variant =
                                                                                item.variants.find(
                                                                                    (variant) =>
                                                                                        variant.size === size &&
                                                                                        variant.color === item.color
                                                                                ) ??
                                                                                item.variants.find(
                                                                                    (variant) =>
                                                                                        variant.size === size
                                                                                );

                                                                            if (variant) {
                                                                                handleVariantChange(
                                                                                    item.id,
                                                                                    variant.id
                                                                                );
                                                                            }
                                                                        }}
                                                                        className={`min-w-10 rounded-xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${isSelected
                                                                            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                                                                            : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                                                            }`}
                                                                    >
                                                                        {size}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-xs font-semibold text-[var(--muted)]">
                                                            Color
                                                        </label>

                                                        <div className="flex flex-wrap gap-2">
                                                            {uniqueColors.map((color) => {
                                                                const isSelected = color === item.color;

                                                                return (
                                                                    <button
                                                                        key={color}
                                                                        type="button"
                                                                        disabled={updatingId === item.id}
                                                                        onClick={() => {
                                                                            const variant =
                                                                                item.variants.find(
                                                                                    (variant) =>
                                                                                        variant.color === color &&
                                                                                        variant.size === item.size
                                                                                );

                                                                            if (variant) {
                                                                                handleVariantChange(
                                                                                    item.id,
                                                                                    variant.id
                                                                                );
                                                                            }
                                                                        }}
                                                                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${isSelected
                                                                            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                                                                            : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                                                            }`}
                                                                    >
                                                                        {color}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                disabled={updatingId === item.id}
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--destructive)] disabled:opacity-50"
                                            >
                                                {updatingId === item.id ? (
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                            <div className="flex h-11 w-fit items-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    disabled={
                                                        updatingId === item.id || item.quantity <= 1
                                                    }
                                                    className="flex h-11 w-11 items-center justify-center text-[var(--foreground)] disabled:opacity-40"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>

                                                <span className="w-10 text-center font-bold text-[var(--foreground)]">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    disabled={updatingId === item.id}
                                                    className="flex h-11 w-11 items-center justify-center text-[var(--foreground)] disabled:opacity-40"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="text-left md:text-right">
                                                <p className="text-sm text-[var(--muted)]">
                                                    Subtotal
                                                </p>

                                                <p className="text-xl font-black text-[var(--foreground)]">
                                                    Rp {item.subtotal.toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:sticky lg:top-28">
                    <h2 className="text-xl font-black text-[var(--foreground)]">
                        Order Summary
                    </h2>

                    <div className="mt-6 space-y-4 border-b border-[var(--border)] pb-6">
                        <SummaryItem label="Subtotal" value={subtotal} />
                        <SummaryItem label="Shipping" value={shipping} />
                        <SummaryItem label="Discount" value={discount} />

                        <div className="flex items-start gap-3 rounded-2xl bg-[var(--secondary)] p-4">
                            <Truck className="mt-0.5 h-5 w-5 text-[var(--accent)]" />

                            <div>
                                <p className="text-sm font-semibold text-[var(--foreground)]">
                                    Fast Delivery
                                </p>

                                <p className="mt-1 text-xs text-[var(--muted)]">
                                    Estimasi sampai 2-5 hari kerja.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-lg font-bold text-[var(--foreground)]">Total</p>

                        <p className="text-2xl font-black text-[var(--foreground)]">
                            Rp {total.toLocaleString("id-ID")}
                        </p>
                    </div>

                    <Link href="/checkout">
                        <Button size="lg" className="mt-6 w-full">
                            Proceed to Checkout
                        </Button>
                    </Link>

                    <Link href="/catalog">
                        <Button size="lg" variant="outline" className="mt-6 w-full">
                            Continue Shopping
                            <ArrowRight />
                        </Button>
                    </Link>
                </aside>
            </section>
        </main>
    );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">{label}</span>

            <span className="font-semibold text-[var(--foreground)]">
                Rp {value.toLocaleString("id-ID")}
            </span>
        </div>
    );
}