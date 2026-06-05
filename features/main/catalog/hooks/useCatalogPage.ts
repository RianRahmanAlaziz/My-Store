"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/features/main/product/services/productService";
import { getCategories } from "@/features/main/category/services/categoryService";
import { getBrands } from "@/features/main/brand/services/brandService";
import { useWishlistStore } from "@/features/main/wishlist/stores/useWishlistStore";
import { useCatalogStore } from "@/features/main/catalog/stores/useCatalogStore";
import type { Option } from "@/features/main/catalog/types/catalog";
import { useAuth } from "@/app/contexts/AuthContext";

export function useCatalogPage() {
    const { user, loading: authLoading } = useAuth();

    const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
    const clearLocalItems = useWishlistStore((state) => state.clearLocalItems);

    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<Option[]>([]);
    const [brands, setBrands] = useState<Option[]>([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [loading, setLoading] = useState(true);

    const {
        search,
        category,
        brand,
        sort,
        setSearch,
        setCategory,
        setBrand,
        setSort,
        resetFilters,
    } = useCatalogStore();

    useEffect(() => {
        if (authLoading) return;

        if (user) {
            fetchWishlist().catch(() => null);
        } else {
            clearLocalItems();
        }
    }, [user, authLoading, fetchWishlist, clearLocalItems]);

    const fetchMasterData = async () => {
        const [categoryRes, brandRes] = await Promise.all([
            getCategories(),
            getBrands(),
        ]);

        setCategories([
            { value: "all", label: "All" },
            ...categoryRes.data.map((item: any) => ({
                value: item.slug,
                label: item.name,
            })),
        ]);

        setBrands([
            { value: "all", label: "All" },
            ...brandRes.data.map((item: any) => ({
                value: item.slug,
                label: item.name,
            })),
        ]);
    };

    const fetchProducts = async () => {
        setLoading(true);

        try {
            const response = await getProducts({
                search: search || undefined,
                category: category !== "all" ? category : undefined,
                brand: brand !== "all" ? brand : undefined,
                sort,
                per_page: 12,
            });

            setProducts(response.data);
        } catch (error) {
            console.error(error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchMasterData();
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchProducts();
        }, 400);

        return () => clearTimeout(delay);
    }, [search, category, brand, sort]);

    return {
        products,
        categories,
        brands,
        openFilter,
        loading,

        search,
        category,
        brand,
        sort,

        setOpenFilter,
        setSearch,
        setCategory,
        setBrand,
        setSort,
        resetFilters,
    };
}