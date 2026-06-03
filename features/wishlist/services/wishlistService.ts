import { axiosInstance } from "@/lib/axios";

export async function addWishlist(productId: number) {
    const response = await axiosInstance.post("/wishlist", {
        product_id: productId,
    });

    return response.data;
}

export async function removeWishlistByProduct(productId: number) {
    const response = await axiosInstance.delete(`/wishlist/product/${productId}`);

    return response.data;
}