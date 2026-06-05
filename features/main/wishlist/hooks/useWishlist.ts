"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useWishlistStore } from "@/features/main/wishlist/stores/useWishlistStore";

export function useWishlist() {
    const { user, loading: authLoading } = useAuth();

    const wishlistItems = useWishlistStore((state) => state.items);
    const loading = useWishlistStore((state) => state.loading);
    const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
    const clearLocalItems = useWishlistStore((state) => state.clearLocalItems);
    const removeItem = useWishlistStore((state) => state.removeItem);

    useEffect(() => {
        if (authLoading) return;

        if (user) {
            fetchWishlist();
        } else {
            clearLocalItems();
        }
    }, [user, authLoading, fetchWishlist, clearLocalItems]);

    return {
        wishlistItems,
        loading,
        removeItem,
        clearLocalItems,
        refetch: fetchWishlist,
    };
}