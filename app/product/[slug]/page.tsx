import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/features/product/components/ProductCard";
import ProductDetailClient from "../../../features/product/components/ProductDetailClient";

type ProductDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    const { slug } = await params;

    const product = products.find((item) => item.slug === slug);

    if (!product) {
        return (
            <main className="bg-[var(--background)] px-4 py-20">
                <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">
                        Product not found
                    </h1>

                    <p className="mt-3 text-[var(--muted)]">
                        Produk yang kamu cari tidak tersedia.
                    </p>

                    <Link href="/catalog">
                        <Button className="mt-6">Back to Catalog</Button>
                    </Link>
                </div>
            </main>
        );
    }

    const relatedProducts = products
        .filter(
            (item) => item.category === product.category && item.slug !== product.slug
        )
        .slice(0, 4);

    return (
        <main className="bg-[var(--background)]">
            <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <Link
                    href="/catalog"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--accent)]"
                >
                    <ChevronLeft className="h-5 w-5" />
                    Back to Catalog
                </Link>

                <ProductDetailClient product={product} />
            </section>

            {relatedProducts.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
                    <h2 className="text-3xl font-black text-[var(--foreground)]">
                        Related Products
                    </h2>

                    <p className="mt-2 text-[var(--muted)]">
                        Produk lain yang mungkin kamu suka.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}