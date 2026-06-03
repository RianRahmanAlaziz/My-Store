import { ProductCard, ProductCardItem } from "@/features/product/components/ProductCard";

type RelatedProductsProps = {
    products: ProductCardItem[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) return null;

    return (
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <h2 className="text-3xl font-black text-[var(--foreground)]">
                Related Products
            </h2>

            <p className="mt-2 text-[var(--muted)]">
                Produk lain yang mungkin kamu suka.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </section>
    );
}