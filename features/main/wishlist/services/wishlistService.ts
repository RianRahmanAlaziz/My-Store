import { axiosInstance } from "@/lib/axios";

export async function getWishlist() {
    const response = await axiosInstance.get("/wishlist");
    return response.data;
}

export async function addWishlist(productId: number) {
    const response = await axiosInstance.post("/wishlist", {
        product_id: productId,
    });

    return response.data;
}

export async function removeWishlist(wishlistId: number) {
    const response = await axiosInstance.delete(`/wishlist/${wishlistId}`);
    return response.data;
}

export async function removeWishlistByProduct(productSlug: string) {
    const response = await axiosInstance.delete(
        `/wishlist/product/${productSlug}`
    );

    return response.data;
}