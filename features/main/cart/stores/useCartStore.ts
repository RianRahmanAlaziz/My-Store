import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    clearCart as clearCartApi,
    getCart,
    removeCartItem,
    updateCartQuantity,
    updateCartVariant,
} from "@/features/main/cart/services/cartService";
import type { CartItem, CartSummary } from "@/features/main/cart/types/cart";

const DEFAULT_SUMMARY: CartSummary = {
    total_items: 0,
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
};

function normalizeCartItems(response: any): CartItem[] {
    return (response?.data?.items ?? []).map((item: any) => {
        const product = item.product ?? {};
        const variant = item.variant ?? null;
        const price = Number(product.price ?? item.price ?? 0);
        const quantity = Number(item.quantity ?? 1);

        return {
            id: Number(item.id),
            productId: Number(product.id ?? item.product_id ?? 0),
            slug: product.slug ?? "#",
            name: product.name ?? "Produk",
            brand: product.brand?.name ?? product.brand ?? "-",
            image: product.image ?? product.thumbnail ?? "/images/placeholder-shoe.png",
            price,
            size: variant?.size ? String(variant.size) : "-",
            color: variant?.color ? String(variant.color) : "-",
            quantity,
            subtotal: Number(item.subtotal ?? price * quantity),
            variantId: variant?.id ? Number(variant.id) : null,
            variants: (product.variants ?? []).map((productVariant: any) => ({
                id: Number(productVariant.id),
                size: String(productVariant.size),
                color: String(productVariant.color),
                stock: productVariant.stock,
            })),
        };
    });
}

function buildSummary(items: CartItem[], apiSummary?: Partial<CartSummary>): CartSummary {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const shipping = subtotal > 500000 || subtotal === 0 ? 0 : 25000;
    const discount = 0;

    return {
        total_items:
            Number(apiSummary?.total_items) ||
            items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: Number(apiSummary?.subtotal ?? subtotal),
        shipping: Number(apiSummary?.shipping ?? shipping),
        discount: Number(apiSummary?.discount ?? discount),
        total: Number(apiSummary?.total ?? subtotal + shipping - discount),
    };
}

type CartStore = {
    items: CartItem[];
    summary: CartSummary;
    loading: boolean;
    updatingId: number | null;
    hydrated: boolean;
    error: string | null;

    setHydrated: (hydrated: boolean) => void;
    fetchCart: () => Promise<void>;
    changeQuantity: (cartId: number, quantity: number) => Promise<void>;
    changeVariant: (cartId: number, variantId: number) => Promise<void>;
    removeItem: (cartId: number) => Promise<void>;

    clearCart: () => Promise<void>;
    clearCartState: () => void;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            summary: DEFAULT_SUMMARY,
            loading: false,
            updatingId: null,
            hydrated: false,
            error: null,

            setHydrated: (hydrated) => set({ hydrated }),

            fetchCart: async () => {
                try {
                    set({ loading: true, error: null });

                    const response = await getCart();
                    const items = normalizeCartItems(response);

                    set({
                        items,
                        summary: buildSummary(items, response?.data?.summary),
                    });
                } catch (error: any) {
                    if (error?.response?.status === 401) {
                        set({
                            items: [],
                            summary: DEFAULT_SUMMARY,
                            error: null,
                        });

                        return;
                    }

                    set({
                        error:
                            error?.response?.data?.message ??
                            "Gagal mengambil cart",
                    });
                } finally {
                    set({ loading: false });
                }
            },

            changeQuantity: async (cartId, quantity) => {
                if (quantity < 1) return;

                const item = get().items.find((cartItem) => cartItem.id === cartId);
                if (!item) return;

                const previousItems = get().items;
                const nextItems = previousItems.map((cartItem) =>
                    cartItem.id === cartId
                        ? {
                            ...cartItem,
                            quantity,
                            subtotal: cartItem.price * quantity,
                        }
                        : cartItem
                );

                try {
                    set({
                        items: nextItems,
                        summary: buildSummary(nextItems),
                        updatingId: cartId,
                        error: null,
                    });

                    await updateCartQuantity(cartId, quantity, item.variantId);
                    await get().fetchCart();
                } catch (error: any) {
                    set({
                        items: previousItems,
                        summary: buildSummary(previousItems),
                        error:
                            error?.response?.data?.message ??
                            "Gagal update quantity",
                    });

                    throw error;
                } finally {
                    set({ updatingId: null });
                }
            },

            changeVariant: async (cartId, variantId) => {
                const item = get().items.find((cartItem) => cartItem.id === cartId);
                if (!item) return;

                const selectedVariant = item.variants.find(
                    (variant) => variant.id === variantId
                );
                if (!selectedVariant) return;

                const previousItems = get().items;
                const nextItems = previousItems.map((cartItem) =>
                    cartItem.id === cartId
                        ? {
                            ...cartItem,
                            variantId,
                            size: selectedVariant.size,
                            color: selectedVariant.color,
                        }
                        : cartItem
                );

                try {
                    set({
                        items: nextItems,
                        summary: buildSummary(nextItems),
                        updatingId: cartId,
                        error: null,
                    });

                    await updateCartVariant(cartId, variantId, item.quantity);
                    await get().fetchCart();
                } catch (error: any) {
                    set({
                        items: previousItems,
                        summary: buildSummary(previousItems),
                        error:
                            error?.response?.data?.message ??
                            "Gagal mengubah variant",
                    });

                    throw error;
                } finally {
                    set({ updatingId: null });
                }
            },

            removeItem: async (cartId) => {
                const previousItems = get().items;
                const nextItems = previousItems.filter((item) => item.id !== cartId);

                try {
                    set({
                        items: nextItems,
                        summary: buildSummary(nextItems),
                        updatingId: cartId,
                        error: null,
                    });

                    await removeCartItem(cartId);
                    await get().fetchCart();
                } catch (error: any) {
                    set({
                        items: previousItems,
                        summary: buildSummary(previousItems),
                        error:
                            error?.response?.data?.message ??
                            "Gagal menghapus cart",
                    });

                    throw error;
                } finally {
                    set({ updatingId: null });
                }
            },

            clearCart: async () => {
                const previousItems = get().items;

                try {
                    set({
                        items: [],
                        summary: DEFAULT_SUMMARY,
                        loading: true,
                        error: null,
                    });

                    await clearCartApi();
                } catch (error: any) {
                    if (error?.response?.status === 401) {
                        set({
                            items: [],
                            summary: DEFAULT_SUMMARY,
                            error: null,
                        });

                        return;
                    }

                    set({
                        items: previousItems,
                        summary: buildSummary(previousItems),
                        error:
                            error?.response?.data?.message ??
                            "Gagal mengosongkan cart",
                    });

                    throw error;
                } finally {
                    set({ loading: false });
                }
            },

            clearCartState: () => {
                set({
                    items: [],
                    summary: DEFAULT_SUMMARY,
                    updatingId: null,
                    error: null,
                });
            },
        }),
        {
            name: "my-store-cart",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                items: state.items,
                summary: state.summary,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);