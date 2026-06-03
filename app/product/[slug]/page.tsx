import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import ProductDetailClient from "@/features/product/components/ProductDetailClient";
import { ProductNotFound } from "@/features/product/components/ProductNotFound";
import { RelatedProducts } from "@/features/product/components/RelatedProducts";

import {
    getProductDetail,
    getProducts,
} from "@/features/product/services/productService";

import {
    normalizeProductCard,
    normalizeProductDetail,
} from "@/features/product/helpers/normalizeProduct";

type ProductDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    const { slug } = await params;

    try {
        const productResponse = await getProductDetail(slug);
        const product = normalizeProductDetail(productResponse.data);

        const relatedResponse = await getProducts({
            category: product.categorySlug,
            per_page: 4,
        });

        const relatedProducts = relatedResponse.data
            .filter((item: any) => item.slug !== product.slug)
            .map(normalizeProductCard);

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

                <RelatedProducts products={relatedProducts} />
            </main>
        );
    } catch {
        return <ProductNotFound />;
    }
}