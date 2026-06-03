import { ProductCardItem } from "@/features/main/product/components/ProductCard";
import { ProductDetailItem } from "@/features/main/product/components/ProductDetailClient";

export function normalizeProductDetail(product: any): ProductDetailItem {
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        sku: product.sku,
        brand: product.brand?.name ?? "-",
        category: product.category?.name ?? "-",
        categorySlug: product.category?.slug ?? "",
        image: product.image ?? "/images/placeholder-shoe.png",
        images:
            product.images?.length > 0
                ? product.images.map((item: any) => item.image)
                : [product.image ?? "/images/placeholder-shoe.png"],
        price: Number(product.price),
        originalPrice: product.original_price
            ? Number(product.original_price)
            : null,
        description: product.description ?? "-",
        sizes: product.sizes ?? [],
        colors: product.colors ?? [],
        rating: product.rating ?? 0,
        reviews: product.reviews ?? 0,
        features: product.features ?? [],
        isNew: product.is_new,
        isTrending: product.is_trending,
        isBestSeller: product.is_best_seller,
    };
}

export function normalizeProductCard(product: any): ProductCardItem {
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand?.name ?? product.brand ?? "-",
        category: product.category?.slug ?? product.category ?? "",
        image: product.image ?? "/images/placeholder-shoe.png",
        price: Number(product.price),
        originalPrice: product.original_price
            ? Number(product.original_price)
            : null,
        rating: product.rating ?? 0,
        reviews: product.reviews ?? 0,
        isNew: product.is_new,
        isTrending: product.is_trending,
        isBestSeller: product.is_best_seller,
    };
}