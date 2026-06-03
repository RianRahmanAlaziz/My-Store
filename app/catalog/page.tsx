"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/features/product/components/ProductCard";

import { getProducts } from "@/features/product/services/productService";
import { getCategories } from "@/features/category/services/categoryService";
import { getBrands } from "@/features/brand/services/brandService";

import { Option } from "@/features/catalog/types/catalog";
import { normalizeProduct } from "@/features/catalog/helpers/normalizeProduct";


import { CatalogSearchSort } from "@/features/catalog/components/CatalogSearchSort";
import { ActiveFilters } from "@/features/catalog/components/ActiveFilters";
import { FilterPanel } from "@/features/catalog/components/FilterPanel";
import { FilterDrawer } from "@/features/catalog/components/FilterDrawer";
import { EmptyProduct } from "@/features/catalog/components/EmptyProduct";
import { CatalogSkeleton } from "@/features/catalog/components/CatalogSkeleton";
import { FilterSkeleton } from "@/features/catalog/components/FilterSkeleton";

export default function CatalogPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<Option[]>([]);
    const [brands, setBrands] = useState<Option[]>([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [brand, setBrand] = useState("all");
    const [sort, setSort] = useState("latest");

    const [openFilter, setOpenFilter] = useState(false);
    const [loading, setLoading] = useState(true);

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

    const clearFilters = () => {
        setSearch("");
        setCategory("all");
        setBrand("all");
        setSort("latest");
    };

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
                            clearFilters={clearFilters}
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
                        <EmptyProduct onReset={clearFilters} />
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
                clearFilters={clearFilters}
            />
        </main>
    );
}