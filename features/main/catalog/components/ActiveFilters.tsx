import { X } from "lucide-react";
import { Option } from "../types/catalog";

type ActiveFiltersProps = {
    categories: Option[];
    brands: Option[];
    category: string;
    brand: string;
    setCategory: (value: string) => void;
    setBrand: (value: string) => void;
};

export function ActiveFilters({
    categories,
    brands,
    category,
    brand,
    setCategory,
    setBrand,
}: ActiveFiltersProps) {
    const categoryLabel = categories.find((item) => item.value === category)?.label;
    const brandLabel = brands.find((item) => item.value === brand)?.label;

    return (
        <div className="flex flex-wrap gap-3">
            {category !== "all" && (
                <button
                    onClick={() => setCategory("all")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition hover:opacity-90"
                >
                    {categoryLabel}
                    <X className="h-4 w-4" />
                </button>
            )}

            {brand !== "all" && (
                <button
                    onClick={() => setBrand("all")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition hover:opacity-90"
                >
                    {brandLabel}
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}