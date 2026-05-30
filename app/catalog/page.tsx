"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/features/product/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import Select from "react-select";

export default function CatalogPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("latest");
    const [openFilter, setOpenFilter] = useState(false);
    const [brand, setBrand] = useState("all");
    const brands = ["all", "Nike", "Adidas", "Puma", "New Balance", "Converse"];
    const categories = ["all", "running", "lifestyle", "casual"];

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search) {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category !== "all") {
            result = result.filter(
                (product) => product.category?.toLowerCase() === category
            );
        }

        if (brand !== "all") {
            result = result.filter(
                (product) => product.brand.toLowerCase() === brand.toLowerCase()
            );
        }

        if (sort === "low-price") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "high-price") {
            result.sort((a, b) => b.price - a.price);
        }

        if (sort === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [search, category, brand, sort]);

    const clearFilters = () => {
        setSearch("");
        setCategory("all");
        setBrand("all");
    };

    return (
        <main className="bg-[var(--background)]">
            <section className="border-b border-[var(--border)] bg-[var(--card)]">
                <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
                    <p className="text-sm font-semibold text-[var(--accent)]">
                        StepHub Catalog
                    </p>

                    <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <div>
                            <h1 className="text-4xl font-black text-[var(--foreground)] md:text-5xl">
                                Explore Modern Shoes
                            </h1>

                            <p className="mt-3 max-w-2xl text-[var(--muted)]">
                                Cari sepatu favorit kamu berdasarkan kategori, harga, rating,
                                dan koleksi terbaru.
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            className="lg:hidden"
                            onClick={() => setOpenFilter(true)}
                        >
                            <SlidersHorizontal className="h-5 w-5" />
                            Filter
                        </Button>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr] lg:px-8">
                <aside className="hidden lg:block">
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
                </aside>

                <div>
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex h-12 flex-1 items-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-4">
                            <Search className="h-5 w-5 text-[var(--muted-foreground)]" />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search shoes..."
                                className="h-full flex-1 bg-transparent px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
                            />
                        </div>

                        <Select
                            value={[
                                { value: "latest", label: "Latest" },
                                { value: "low-price", label: "Lowest Price" },
                                { value: "high-price", label: "Highest Price" },
                                { value: "rating", label: "Best Rating" },
                            ].find((item) => item.value === sort)}
                            onChange={(selected) => setSort(selected?.value || "latest")}
                            options={[
                                { value: "latest", label: "Latest" },
                                { value: "low-price", label: "Lowest Price" },
                                { value: "high-price", label: "Highest Price" },
                                { value: "rating", label: "Best Rating" },
                            ]}
                            isSearchable={false}
                            className="min-w-[220px]"
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    minHeight: "48px",
                                    borderRadius: "0.75rem",
                                    borderColor: "var(--border)",
                                    backgroundColor: "var(--card)",
                                    boxShadow: "none",
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    cursor: "pointer",
                                    "&:hover": {
                                        borderColor: "var(--border)",
                                    },
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: "var(--foreground)",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                }),
                                menu: (base) => ({
                                    ...base,
                                    borderRadius: "0.75rem",
                                    overflow: "hidden",
                                    backgroundColor: "var(--card)",
                                    border: "1px solid var(--border)",
                                    zIndex: 50,
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected
                                        ? "var(--accent)"
                                        : state.isFocused
                                            ? "var(--secondary)"
                                            : "var(--card)",
                                    color: state.isSelected
                                        ? "var(--accent-foreground)"
                                        : "var(--foreground)",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                }),
                                indicatorSeparator: () => ({
                                    display: "none",
                                }),
                                dropdownIndicator: (base) => ({
                                    ...base,
                                    color: "var(--foreground)",
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: "var(--foreground)",
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: "var(--muted-foreground)",
                                }),
                            }}
                        />
                    </div>

                    <div className="mb-6 flex items-center justify-between ">
                        {(category !== "all" || brand !== "all") && (
                            <div className="mb-6 flex flex-wrap gap-3 ">
                                {category !== "all" && (
                                    <button
                                        onClick={() => setCategory("all")}
                                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition hover:opacity-90 cursor-pointer"
                                    >
                                        {category}
                                        <X className="h-4 w-4" />
                                    </button>
                                )}

                                {brand !== "all" && (
                                    <button
                                        onClick={() => setBrand("all")}
                                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition hover:opacity-90 cursor-pointer"
                                    >
                                        {brand}
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        )}
                        <p className="text-sm text-[var(--muted)]">
                            Showing{" "}
                            <span className="font-bold text-[var(--foreground)]">
                                {filteredProducts.length}
                            </span>{" "}
                            products
                        </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] px-6 py-20 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--accent)]">
                                <Search className="h-8 w-8" />
                            </div>

                            <h3 className="text-xl font-bold text-[var(--foreground)]">
                                Product not found
                            </h3>

                            <p className="mt-2 text-[var(--muted)]">
                                Coba gunakan keyword atau filter lain.
                            </p>

                            <Button
                                className="mt-6"
                                onClick={() => {
                                    setSearch("");
                                    setCategory("all");
                                }}
                            >
                                Reset Search
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {openFilter && (
                <div className="fixed inset-0 z-[100] bg-black/40 lg:hidden">
                    <div className="ml-auto h-full w-[85%] max-w-sm bg-[var(--card)] p-5">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[var(--foreground)]">
                                Filter Products
                            </h2>

                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setOpenFilter(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

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

                        <Button className="mt-6 w-full" onClick={() => setOpenFilter(false)}>
                            Apply Filter
                        </Button>
                    </div>
                </div>
            )}
        </main>
    );
}

function FilterPanel({
    categories,
    brands,
    category,
    brand,
    search,
    setCategory,
    setBrand,
    clearFilters,
}: {
    categories: string[];
    brands: string[];
    category: string;
    brand: string;
    search: string;
    setCategory: (value: string) => void;
    setBrand: (value: string) => void;
    clearFilters: () => void;
}) {
    return (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="mb-5 flex items-center gap-2">
                <Filter className="h-5 w-5 text-[var(--accent)]" />
                <h2 className="font-bold text-[var(--foreground)]">Filter</h2>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                    Category
                </h3>

                <div className="flex flex-col gap-2">
                    {categories.map((item) => (
                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`cursor-pointer rounded-2xl px-4 py-3 text-left text-sm font-medium capitalize transition ${category === item
                                ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                                : "bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--accent)]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                    Brand
                </h3>

                <div className="flex flex-col gap-2">
                    {brands.map((item) => (
                        <button
                            key={item}
                            onClick={() => setBrand(item)}
                            className={`cursor-pointer rounded-2xl px-4 py-3 text-left text-sm font-medium capitalize transition ${brand === item
                                ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                                : "bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--accent)]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {(search || category !== "all" || brand !== "all") && (
                <Button
                    variant="outline"
                    size="sm"
                    className="mt-8 w-full"
                    onClick={clearFilters}
                >
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                </Button>
            )}
        </div>
    );
}