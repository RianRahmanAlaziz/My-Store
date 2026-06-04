import { axiosInstance } from "@/lib/axios";

export async function getCart() {
    const response = await axiosInstance.get("/cart");

    return response.data;
}

export async function addToCart(payload: {
    product_id: number;
    product_variant_id?: number | null;
    quantity: number;
}) {
    const response = await axiosInstance.post("/cart", payload);

    return response.data;
}

export async function updateCartQuantity(cartId: number, quantity: number) {
    const response = await axiosInstance.put(`/cart/${cartId}`, {
        quantity,
    });

    return response.data;
}

export async function removeCartItem(cartId: number) {
    const response = await axiosInstance.delete(`/cart/${cartId}`);
    return response.data;
}

export async function clearCart() {
    const response = await axiosInstance.delete("/cart");
    return response.data;
}

export async function updateCartVariant(
    cartId: number,
    productVariantId: number
) {
    const response = await axiosInstance.put(`/cart/${cartId}`, {
        product_variant_id: productVariantId,
    });

    return response.data;
}