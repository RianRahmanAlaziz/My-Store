export function normalizeProduct(product: any) {
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand?.name ?? product.brand,
        category: product.category?.slug ?? product.category,
        image: product.image,
        price: product.price,
        originalPrice: product.original_price,
        rating: product.rating ?? 5,
        reviews: product.reviews ?? 0,
        isNew: product.is_new,
        isTrending: product.is_trending,
        isBestSeller: product.is_best_seller,
        isWishlisted: product.is_wishlisted ?? false,
    };
}