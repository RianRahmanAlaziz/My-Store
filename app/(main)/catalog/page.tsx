"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/main/ui/Button";
import { ProductCard } from "@/features/main/product/components/ProductCard";

import { normalizeProduct } from "@/features/main/catalog/helpers/normalizeProduct";

import { CatalogSearchSort } from "@/features/main/catalog/components/CatalogSearchSort";
import { ActiveFilters } from "@/features/main/catalog/components/ActiveFilters";
import { FilterPanel } from "@/features/main/catalog/components/FilterPanel";
import { FilterDrawer } from "@/features/main/catalog/components/FilterDrawer";
import { EmptyProduct } from "@/features/main/catalog/components/EmptyProduct";
import { CatalogSkeleton } from "@/features/main/catalog/components/CatalogSkeleton";
import { FilterSkeleton } from "@/features/main/catalog/components/FilterSkeleton";
import { useCatalogPage } from "@/features/main/catalog/hooks/useCatalogPage";
import { useEffect } from "react";
import { useWishlistStore } from "@/features/main/wishlist/stores/useWishlistStore";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CatalogPage() {

    const {
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
    } = useCatalogPage();

    const { user, loading: authLoading } = useAuth();
    const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
    const clearLocalItems = useWishlistStore((state) => state.clearLocalItems);

    useEffect(() => {
        if (authLoading) return;

        if (user) {
            fetchWishlist();
        } else {
            clearLocalItems();
        }
    }, [user, authLoading, fetchWishlist, clearLocalItems]);

    return (
        <main className="bg-[var(--background)]">
            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr] lg:px-8">
                <aside className="hidden lg:block">
                    {loading ? (
                        <FilterSkeleton />
                    ) : (
                        <FilterPanel
                            categories={categories}
                            brands={brands}
                            category={category}
                            brand={brand}
                            search={search}
                            setCategory={setCategory}
                            setBrand={setBrand}
                            clearFilters={resetFilters}
                        />
                    )}
                </aside>

                <div>
                    <div className="mb-6 flex justify-end lg:hidden">
                        <Button variant="outline" onClick={() => setOpenFilter(true)}>
                            <SlidersHorizontal className="h-5 w-5" />
                            Filter
                        </Button>
                    </div>

                    <CatalogSearchSort
                        search={search}
                        sort={sort}
                        setSearch={setSearch}
                        setSort={setSort}
                    />

                    <div className="mb-6 flex items-center justify-between gap-4">
                        <ActiveFilters
                            categories={categories}
                            brands={brands}
                            category={category}
                            brand={brand}
                            setCategory={setCategory}
                            setBrand={setBrand}
                        />

                        <p className="text-sm text-[var(--muted)]">
                            Showing{" "}
                            <span className="font-bold text-[var(--foreground)]">
                                {products.length}
                            </span>{" "}
                            products
                        </p>
                    </div>

                    {loading ? (
                        <CatalogSkeleton />
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={normalizeProduct(product)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyProduct onReset={resetFilters} />
                    )}
                </div>
            </section>

            <FilterDrawer
                open={openFilter}
                categories={categories}
                brands={brands}
                category={category}
                brand={brand}
                search={search}
                setOpen={setOpenFilter}
                setCategory={setCategory}
                setBrand={setBrand}
                clearFilters={resetFilters}
            />
        </main>
    );
}