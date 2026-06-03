import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Option } from "../types/catalog";
import { FilterPanel } from "./FilterPanel";

type FilterDrawerProps = {
    open: boolean;
    categories: Option[];
    brands: Option[];
    category: string;
    brand: string;
    search: string;
    setOpen: (value: boolean) => void;
    setCategory: (value: string) => void;
    setBrand: (value: string) => void;
    clearFilters: () => void;
};

export function FilterDrawer({
    open,
    categories,
    brands,
    category,
    brand,
    search,
    setOpen,
    setCategory,
    setBrand,
    clearFilters,
}: FilterDrawerProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/40 lg:hidden">
            <div className="ml-auto h-full w-[85%] max-w-sm bg-[var(--card)] p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[var(--foreground)]">
                        Filter Products
                    </h2>

                    <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
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

                <Button className="mt-6 w-full" onClick={() => setOpen(false)}>
                    Apply Filter
                </Button>
            </div>
        </div>
    );
}