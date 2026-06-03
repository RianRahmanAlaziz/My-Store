import { axiosInstance } from "@/lib/axios";

export async function getProductDetail(slug: string) {
    const response = await axiosInstance.get(`/products/${slug}`);

    return response.data;
}

export async function getProducts(params?: {
    search?: string;
    category?: string;
    brand?: string;
    sort?: string;
    per_page?: number;
    is_trending?: boolean;
    is_new?: boolean;
    is_best_seller?: boolean;
}) {
    const response = await axiosInstance.get("/products", {
        params,
    });

    return response.data;
}