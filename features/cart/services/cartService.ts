import { axiosInstance } from "@/lib/axios";

export async function addToCart(payload: {
    product_id: number;
    product_variant_id?: number | null;
    quantity: number;
}) {
    const response = await axiosInstance.post("/cart", payload);

    return response.data;
}