"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion } from "motion/react";

type ProductCardProps = {
    product: Product;
    topAction?: React.ReactNode;
};

export function ProductCard({ product, topAction }: ProductCardProps) {
    const discount = product.originalPrice
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="relative aspect-square overflow-hidden bg-[var(--secondary)]">
                <Link href={`/product/${product.slug}`} className="block h-full w-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                </Link>

                <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col gap-2">
                    {product.isNew && <Badge variant="accent">NEW</Badge>}
                    {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
                </div>

                <div className="absolute right-3 top-3 z-20 opacity-0 transition group-hover:opacity-100">
                    {topAction ?? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)]/80 text-[var(--foreground)] backdrop-blur transition hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                        >
                            <Heart className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            <Link href={`/product/${product.slug}`} className="block">
                <div className="p-4">
                    <p className="text-sm text-[var(--muted)]">{product.brand}</p>

                    <h3 className="mt-1 line-clamp-1 font-semibold text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
                        {product.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />

                        <span className="text-sm font-semibold text-[var(--foreground)]">
                            {product.rating}
                        </span>

                        <span className="text-sm text-[var(--muted)]">
                            ({product.reviews})
                        </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <p className="text-lg font-bold text-[var(--foreground)]">
                            Rp {product.price.toLocaleString("id-ID")}
                        </p>

                        {product.originalPrice && (
                            <p className="text-sm text-[var(--muted-foreground)] line-through">
                                Rp {product.originalPrice.toLocaleString("id-ID")}
                            </p>
                        )}
                    </div>
                </div>
            </Link>

            <div className="px-4 pb-4">
                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className="w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </Button>
            </div>
        </motion.div>
    );
}