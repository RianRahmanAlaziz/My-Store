"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface CartItem {
    id: string;
    slug: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: "1",
            slug: "nike-air-max-270",
            name: "Air Max Premium",
            brand: "Nike",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
            price: 1899000,
            size: "42",
            color: "White",
            quantity: 1,
        },
        {
            id: "2",
            slug: "ultraboost-22",
            name: "UltraBoost 22",
            brand: "Adidas",
            image: "https://images.unsplash.com/photo-1600185365778-7875a359b924?w=400",
            price: 2199000,
            size: "43",
            color: "Black",
            quantity: 2,
        },
        {
            id: "5",
            slug: "running-pro-elite",
            name: "Running Pro Elite",
            brand: "Nike",
            image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400",
            price: 1699000,
            size: "41",
            color: "Gray",
            quantity: 1,
        },
    ]);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = subtotal > 500000 ? 0 : 25000;
    const discount = 0;
    const total = subtotal + shipping - discount;

    const updateQuantity = (id: string, delta: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity + delta),
                    }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

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
            <section className="border-b border-[var(--border)] bg-[var(--card)]">
                <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
                    <p className="text-sm font-semibold text-[var(--accent)]">
                        Shopping Cart
                    </p>
                    <h1 className="mt-3 text-4xl font-black text-[var(--foreground)] md:text-5xl">
                        Your Cart
                    </h1>
                    <p className="mt-3 text-[var(--muted)]">
                        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                    </p>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px] lg:px-8">
                <div className="space-y-5">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 md:p-5"
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

                                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                                                <span className="rounded-full bg-[var(--secondary)] px-3 py-1">
                                                    Size: {item.size}
                                                </span>

                                                <span className="rounded-full bg-[var(--secondary)] px-3 py-1">
                                                    Color: {item.color}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--destructive)]"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="flex h-11 w-fit items-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="flex h-11 w-11 items-center justify-center text-[var(--foreground)]"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>

                                            <span className="w-10 text-center font-bold text-[var(--foreground)]">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="flex h-11 w-11 items-center justify-center text-[var(--foreground)]"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="text-left md:text-right">
                                            <p className="text-sm text-[var(--muted)]">Subtotal</p>

                                            <p className="text-xl font-black text-[var(--foreground)]">
                                                Rp{" "}
                                                {(item.price * item.quantity).toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="h-fit rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 lg:sticky lg:top-28">
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