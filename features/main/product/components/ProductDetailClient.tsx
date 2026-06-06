"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Heart,
    Minus,
    Plus,
    RotateCcw,
    Shield,
    ShoppingCart,
    Star,
    Truck,
    Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/main/ui/Button";
import { Badge } from "@/components/main/ui/Badge";
import { toast } from "react-toastify";
import { addToCart } from "@/features/main/cart/services/cartService";
import { useCartStore } from "@/features/main/cart/stores/useCartStore";
import { useAuth } from "@/app/contexts/AuthContext";


export type ProductDetailItem = {
    id: number;
    slug: string;
    name: string;
    sku?: string;
    brand: string;
    category: string;
    categorySlug: string;
    image: string;
    images: string[];
    price: number;
    originalPrice?: number | null;
    description: string;
    sizes: string[] | number[];
    colors: string[];
    variants: {
        id: number;
        size: string | number;
        color: string;
        stock: number;
    }[];
    rating: number;
    reviews: number;
    features?: string[];
    isNew?: boolean;
    isTrending?: boolean;
    isBestSeller?: boolean;
};

export default function ProductDetailClient({ product }: { product: ProductDetailItem }) {
    const { user } = useAuth();
    const [cartLoading, setCartLoading] = useState(false);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const images = product.images || [product.image];

    const discount = product.originalPrice
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
        : 0;

    const reviews = [
        {
            id: 1,
            name: "Ahmad Rizki",
            rating: 5,
            date: "2026-05-20",
            comment:
                "Kualitas premium! Sangat nyaman dipakai seharian. Pengiriman cepat juga.",
            verified: true,
        },
        {
            id: 2,
            name: "Siti Nurhaliza",
            rating: 4,
            date: "2026-05-18",
            comment:
                "Desainnya keren banget, tapi sizenya agak kekecilan. Saran order 1 size lebih besar.",
            verified: true,
        },
        {
            id: 3,
            name: "Budi Santoso",
            rating: 5,
            date: "2026-05-15",
            comment:
                "Sepatu terbaik yang pernah saya beli! Worth it banget dengan harganya.",
            verified: true,
        },
    ];

    const selectedVariant =
        selectedSize && selectedColor
            ? product.variants.find(
                (variant) =>
                    String(variant.size) === String(selectedSize) &&
                    String(variant.color) === String(selectedColor)
            )
            : null;

    const handleAddToCart = async () => {

        try {
            if (!selectedSize) {
                toast.error("Pilih ukuran terlebih dahulu");
                return;
            }

            if (!selectedColor) {
                toast.error("Pilih warna terlebih dahulu");
                return;
            }

            if (!selectedVariant) {
                toast.error("Variant produk tidak tersedia");
                return;
            }

            if (selectedVariant.stock < quantity) {
                toast.error("Stock tidak mencukupi");
                return;
            }

            setCartLoading(true);
            if (!user) {
                toast.info("Silakan login terlebih dahulu");
                return;
            }
            await addToCart({
                product_id: product.id,
                product_variant_id: selectedVariant.id,
                quantity,
            });

            await fetchCart();

            toast.success("Produk berhasil ditambahkan ke cart");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ?? "Gagal menambahkan produk ke cart"
            );
        } finally {
            setCartLoading(false);
        }
    };

    return (
        <div className="space-y-20">
            <div className="grid gap-10 lg:grid-cols-2">
                <div>
                    <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)]">
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-square bg-[var(--secondary)]"
                        >
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`aspect-square overflow-hidden rounded-2xl border-2 transition ${selectedImage === idx
                                    ? "border-[var(--accent)]"
                                    : "border-transparent hover:border-[var(--border)]"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`${product.name} ${idx + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[var(--secondary)] px-4 py-2 text-sm font-medium text-[var(--muted)]">
                            {product.brand}
                        </span>
                    </div>

                    <h1 className="text-4xl font-black text-[var(--foreground)] md:text-5xl">
                        {product.name}
                    </h1>

                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.floor(product.rating)
                                        ? "fill-[var(--accent)] text-[var(--accent)]"
                                        : "text-[var(--muted-foreground)]"
                                        }`}
                                />
                            ))}
                        </div>

                        <span className="font-medium text-[var(--foreground)]">
                            {product.rating}
                        </span>

                        <span className="text-sm text-[var(--muted)]">
                            ({product.reviews} reviews)
                        </span>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <p className="text-3xl font-black text-[var(--foreground)]">
                            Rp {product.price.toLocaleString("id-ID")}
                        </p>

                        {product.originalPrice && (
                            <>
                                <p className="text-lg text-[var(--muted-foreground)] line-through">
                                    Rp {product.originalPrice.toLocaleString("id-ID")}
                                </p>
                                <Badge variant="destructive">
                                    -
                                    {Math.round(
                                        ((product.originalPrice - product.price) /
                                            product.originalPrice) *
                                        100
                                    )}
                                    %
                                </Badge>
                            </>
                        )}
                    </div>

                    <p className="mt-6 leading-8 text-[var(--muted)]">
                        {product.description}
                    </p>

                    {product.features && (
                        <div className="mt-8">
                            <h3 className="mb-3 font-bold text-[var(--foreground)]">
                                Key Features
                            </h3>

                            <ul className="space-y-2">
                                {product.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2 text-[var(--muted)]"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-8">
                        <h3 className="mb-3 font-bold text-[var(--foreground)]">
                            Select Size
                        </h3>
                        {!selectedSize && (
                            <p className="mb-3 text-sm text-[var(--destructive)]">
                                Please select a size
                            </p>
                        )}
                        <div className="flex flex-wrap gap-3">
                            {product.sizes?.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`flex h-12 min-w-12 items-center justify-center rounded-xl border px-4 font-semibold transition ${selectedSize === size
                                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                                        : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="mb-3 font-bold text-[var(--foreground)]">
                            Select Color
                        </h3>
                        {!selectedColor && (
                            <p className="mb-3 text-sm text-[var(--destructive)]">
                                Please select a color
                            </p>
                        )}
                        <div className="flex flex-wrap gap-3">
                            {product.colors?.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`h-12 rounded-xl border px-5 text-sm font-semibold transition ${selectedColor === color
                                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                                        : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex h-12 items-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="flex h-12 w-12 items-center justify-center text-[var(--foreground)]"
                            >
                                <Minus className="h-4 w-4" />
                            </button>

                            <span className="w-10 text-center font-bold text-[var(--foreground)]">
                                {quantity}
                            </span>

                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="flex h-12 w-12 items-center justify-center text-[var(--foreground)]"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        <Button
                            onClick={handleAddToCart}
                            disabled={cartLoading}
                            className="flex-1">
                            {cartLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <ShoppingCart className="h-5 w-5" />
                            )}
                            Add to Cart
                        </Button>

                        <Button variant="outline" size="icon">
                            <Heart className="h-5 w-5" />
                        </Button>
                    </div>

                    <Link href="/checkout">
                        <Button size="lg" className="mt-4 w-full">
                            Buy Now
                        </Button>
                    </Link>

                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-6">
                        <InfoBox icon={<Truck />} title="Free Shipping" desc="Orders over 500k" />
                        <InfoBox icon={<Shield />} title="Original" desc="100% authentic" />
                        <InfoBox icon={<RotateCcw />} title="Easy Return" desc="7 days return" />
                    </div>
                </div>
            </div>

            <section>
                <h2 className="mb-8 text-3xl font-black text-[var(--foreground)]">
                    Customer Reviews
                </h2>

                <div className="mb-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8">
                    <div className="flex flex-col gap-8 md:flex-row">
                        <div className="text-center md:border-r md:border-[var(--border)] md:pr-8">
                            <div className="mb-2 text-6xl font-black text-[var(--foreground)]">
                                {product.rating}
                            </div>

                            <div className="mb-2 flex items-center justify-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating)
                                            ? "fill-[var(--accent)] text-[var(--accent)]"
                                            : "text-[var(--muted-foreground)]"
                                            }`}
                                    />
                                ))}
                            </div>

                            <p className="text-[var(--muted)]">
                                Based on {product.reviews} reviews
                            </p>
                        </div>

                        <div className="flex-1 space-y-3">
                            {[5, 4, 3, 2, 1].map((rating) => {
                                const percent = rating === 5 ? 70 : rating === 4 ? 20 : 10;

                                return (
                                    <div key={rating} className="flex items-center gap-4">
                                        <span className="w-14 text-sm text-[var(--foreground)]">
                                            {rating} stars
                                        </span>

                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--secondary)]">
                                            <div
                                                className="h-full bg-[var(--accent)]"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>

                                        <span className="w-12 text-sm text-[var(--muted)]">
                                            {percent}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6"
                        >
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                        <h4 className="font-bold text-[var(--foreground)]">
                                            {review.name}
                                        </h4>

                                        {review.verified && (
                                            <Badge variant="success">Verified Purchase</Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating
                                                    ? "fill-[var(--accent)] text-[var(--accent)]"
                                                    : "text-[var(--muted-foreground)]"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <span className="text-sm text-[var(--muted)]">
                                    {review.date}
                                </span>
                            </div>

                            <p className="text-[var(--muted)]">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function InfoBox({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className="text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center text-[var(--accent)]">
                {icon}
            </div>
            <p className="text-sm font-bold text-[var(--foreground)]">{title}</p>
            <p className="text-xs text-[var(--muted)]">{desc}</p>
        </div>
    );
}