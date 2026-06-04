import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/features/main/product/components/ProductCard";
import type { ProductCardItem } from "@/features/main/product/components/ProductCard";

type ProductSectionProps = {
    title: string;
    subtitle: string;
    products: ProductCardItem[];
    variant?: "soft";
};

export function ProductSection({
    title,
    subtitle,
    products,
    variant,
}: ProductSectionProps) {
    if (products.length === 0) return null;

    return (
        <section
            className={`mx-auto max-w-7xl px-4 py-20 lg:px-8 ${variant === "soft" ? "mt-7 shadow-lg rounded-[1rem] border border-[var(--border)] bg-[var(--card)]" : ""
                }`}
        >
            <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-[var(--foreground)] md:text-4xl">
                        {title}
                    </h2>

                    <p className="mt-2 text-[var(--muted)]">{subtitle}</p>
                </div>

                <Link href="/catalog">
                    <Button variant="outline" className="hidden sm:inline-flex">
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}