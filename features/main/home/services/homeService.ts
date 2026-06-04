import { getProducts } from "@/features/main/product/services/productService";
import { normalizeProductCard } from "@/features/main/product/helpers/normalizeProduct";

export async function getHomeProducts() {
    const [bestSellerRes, trendingRes, newArrivalRes] = await Promise.all([
        getProducts({
            is_best_seller: true,
            per_page: 4,
        }),
        getProducts({
            is_trending: true,
            per_page: 4,
        }),
        getProducts({
            is_new: true,
            per_page: 4,
        }),
    ]);

    return {
        bestSellers: bestSellerRes.data.map(normalizeProductCard),
        trendingProducts: trendingRes.data.map(normalizeProductCard),
        newProducts: newArrivalRes.data.map(normalizeProductCard),
    };
}