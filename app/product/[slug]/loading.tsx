import { ProductDetailSkeleton } from "@/features/product/components/ProductDetailSkeleton";

export default function Loading() {
    return (
        <main className="bg-[var(--background)]">
            <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <ProductDetailSkeleton />
            </section>
        </main>
    );
}