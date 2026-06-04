"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getWishlist, removeWishlist } from "@/features/main/wishlist/services/wishlistService";
import { normalizeProductCard } from "@/features/main/product/helpers/normalizeProduct";
import type { WishlistItem } from "@/features/main/wishlist/types/wishlist";

export function useWishlist() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            setLoading(true);

            const response = await getWishlist();

            const items = response.data.map((item: any) => ({
                id: item.id,
                product: normalizeProductCard(item.product),
            }));

            setWishlistItems(items);
        } catch {
            toast.error("Gagal mengambil data wishlist");
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (wishlistId: number) => {
        try {
            await removeWishlist(wishlistId);

            setWishlistItems((items) =>
                items.filter((item) => item.id !== wishlistId)
            );

            toast.success("Produk berhasil dihapus dari wishlist");
        } catch {
            toast.error("Gagal menghapus wishlist");
        }
    };

    const clearLocalItems = () => {
        setWishlistItems([]);
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return {
        wishlistItems,
        loading,
        removeItem,
        clearLocalItems,
        refetch: fetchWishlist,
    };
}