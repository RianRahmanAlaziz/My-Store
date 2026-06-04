"use client";

import Link from "next/link";
import { Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ProductCard } from "@/features/main/product/components/ProductCard";
import type { ProductCardItem } from "@/features/main/product/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { getWishlist, removeWishlist } from "@/features/main/wishlist/services/wishlistService";
import { normalizeProductCard } from "@/features/main/product/helpers/normalizeProduct";

type WishlistItem = {
    id: number;
    product: ProductCardItem;
};


export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            setLoading(true);

            const response = await getWishlist();

            const items = response.data.map((item: any) => ({
                id: item.id,
                product: normalizeProductCard(item.product),
            }));

            setWishlistItems(items);
        } catch (error: any) {
            toast.error(
                "Gagal mengambil data wishlist"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveWishlist = async (wishlistId: number) => {
        try {
            await removeWishlist(wishlistId);

            setWishlistItems((items) =>
                items.filter((item) => item.id !== wishlistId)
            );

            toast.success("Produk berhasil dihapus dari wishlist");
        } catch (error: any) {
            toast.error(
                "Gagal menghapus wishlist"
            );
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) {
        return (
            <main className="bg-[var(--background)] px-4 py-20">
                <div className="mx-auto flex max-w-2xl items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
                    <span className="ml-3 text-[var(--muted)]">
                        Loading wishlist...
                    </span>
                </div>
            </main>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <main className="bg-[var(--background)] px-4 py-20">
                <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--accent)]">
                        <Heart className="h-10 w-10" />
                    </div>

                    <h1 className="text-3xl font-black text-[var(--foreground)]">
                        Wishlist is empty
                    </h1>

                    <p className="mt-3 text-[var(--muted)]">
                        Belum ada produk favorit yang kamu simpan.
                    </p>

                    <Link href="/catalog">
                        <Button className="mt-6">Explore Products</Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[var(--background)]">
            <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/90 py-12 text-[var(--primary-foreground)]">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <h1 className="text-4xl font-black md:text-5xl">Favorite Products</h1>
                    <p className="mt-4 text-lg text-white/80">
                        Produk sepatu favorit kamu tersimpan di sini.
                    </p>
                </div>
            </section>

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
                        onClick={() => setWishlistItems([])}
                        className="text-sm font-semibold text-[var(--destructive)]"
                    >
                        Clear All
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="relative">
                            <ProductCard
                                product={item.product}
                                topAction={
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveWishlist(item.id)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)]/80 text-[var(--destructive)] backdrop-blur transition hover:bg-[var(--destructive)] hover:text-white"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                }
                            />
                        </div>
                    ))}
                </div>
            </section>

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
        </main>
    );
}