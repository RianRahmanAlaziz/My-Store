"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCartStore } from "@/features/main/cart/stores/useCartStore";

export function useCartPage() {
    const cartItems = useCartStore((state) => state.items);
    const summary = useCartStore((state) => state.summary);
    const loading = useCartStore((state) => state.loading);
    const updatingId = useCartStore((state) => state.updatingId);

    const fetchCart = useCartStore((state) => state.fetchCart);
    const changeQuantity = useCartStore((state) => state.changeQuantity);
    const changeVariant = useCartStore((state) => state.changeVariant);
    const removeItem = useCartStore((state) => state.removeItem);

    useEffect(() => {
        fetchCart().catch((error: any) => {
            toast.error(error?.response?.data?.message ?? "Gagal mengambil cart");
        });
    }, [fetchCart]);

    const handleVariantChange = async (cartId: number, variantId: number) => {
        try {
            await changeVariant(cartId, variantId);
            toast.success("Variant berhasil diubah");
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Gagal mengubah variant");
        }
    };

    const handleQuantityChange = async (cartId: number, quantity: number) => {
        try {
            await changeQuantity(cartId, quantity);
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Gagal update quantity");
        }
    };

    const handleRemoveItem = async (cartId: number) => {
        try {
            await removeItem(cartId);
            toast.success("Produk dihapus dari cart");
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Gagal menghapus cart");
        }
    };

    return {
        cartItems,
        summary,
        loading,
        updatingId,
        handleVariantChange,
        handleQuantityChange,
        handleRemoveItem,
    };
}