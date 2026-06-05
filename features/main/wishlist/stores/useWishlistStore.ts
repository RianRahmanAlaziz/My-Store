import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-toastify";

import {
    addWishlist,
    getWishlist,
    removeWishlist,
    removeWishlistByProduct,
} from "../services/wishlistService";

import { normalizeProductCard } from "@/features/main/product/helpers/normalizeProduct";
import type { ProductCardItem } from "@/features/main/product/components/ProductCard";

export interface WishlistItem {
    id: number;
    product: ProductCardItem;
}

interface WishlistStore {
    items: WishlistItem[];
    loading: boolean;
    actionLoadingId: number | null;

    fetchWishlist: () => Promise<void>;
    addItem: (productId: number) => Promise<void>;
    removeItem: (wishlistId: number) => Promise<void>;
    toggleByProduct: (product: ProductCardItem) => Promise<void>;
    isWishlisted: (productSlug: string) => boolean;
    clearLocalItems: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            loading: false,
            actionLoadingId: null,

            fetchWishlist: async () => {
                set({ loading: true });

                try {
                    const response = await getWishlist();

                    const items = response.data.map((item: any) => ({
                        id: item.id,
                        product: normalizeProductCard(item.product),
                    }));

                    set({ items });
                } catch {
                    toast.error("Gagal mengambil data wishlist");
                } finally {
                    set({ loading: false });
                }
            },

            addItem: async (productId) => {
                set({ actionLoadingId: productId });

                try {
                    await addWishlist(productId);
                    await get().fetchWishlist();

                    toast.success("Produk ditambahkan ke wishlist");
                } catch (error: any) {
                    toast.error(
                        error?.response?.data?.message ?? "Gagal menambahkan wishlist"
                    );
                } finally {
                    set({ actionLoadingId: null });
                }
            },

            removeItem: async (wishlistId) => {
                set({ actionLoadingId: wishlistId });

                try {
                    await removeWishlist(wishlistId);

                    set((state) => ({
                        items: state.items.filter((item) => item.id !== wishlistId),
                    }));

                    toast.success("Produk berhasil dihapus dari wishlist");
                } catch {
                    toast.error("Gagal menghapus wishlist");
                } finally {
                    set({ actionLoadingId: null });
                }
            },

            toggleByProduct: async (product) => {
                set({ actionLoadingId: product.id });

                try {
                    const exists = get().items.some(
                        (item) => item.product.slug === product.slug
                    );

                    if (exists) {
                        await removeWishlistByProduct(product.slug);

                        set((state) => ({
                            items: state.items.filter(
                                (item) => item.product.slug !== product.slug
                            ),
                        }));

                        toast.success("Produk dihapus dari wishlist");
                    } else {
                        await addWishlist(product.id);
                        await get().fetchWishlist();

                        toast.success("Produk ditambahkan ke wishlist");
                    }
                } catch (error: any) {
                    toast.error(
                        error?.response?.data?.message ?? "Terjadi kesalahan"
                    );
                } finally {
                    set({ actionLoadingId: null });
                }
            },

            isWishlisted: (productSlug) => {
                return get().items.some(
                    (item) => item.product.slug === productSlug
                );
            },

            clearLocalItems: () => {
                set({ items: [] });
            },
        }),
        {
            name: "myshop-wishlist",
            storage: createJSONStorage(() => localStorage),
        }
    )
);