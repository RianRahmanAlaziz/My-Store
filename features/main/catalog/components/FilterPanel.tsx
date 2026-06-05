import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Option } from "../types/catalog";

type FilterPanelProps = {
    categories: Option[];
    brands: Option[];
    category: string;
    brand: string;
    search: string;
    setCategory: (value: string) => void;
    setBrand: (value: string) => void;
    clearFilters: () => void;
};

export function FilterPanel({
    categories,
    brands,
    category,
    brand,
    search,
    setCategory,
    setBrand,
    clearFilters,
}: FilterPanelProps) {
    return (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
                <Filter className="h-5 w-5 text-[var(--accent)]" />
                <h2 className="font-bold text-[var(--foreground)]">Filter</h2>
            </div>

            <FilterGroup
                title="Category"
                options={categories}
                activeValue={category}
                onChange={setCategory}
            />

            <div className="mt-8">
                <FilterGroup
                    title="Brand"
                    options={brands}
                    activeValue={brand}
                    onChange={setBrand}
                />
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

function FilterGroup({
    title,
    options,
    activeValue,
    onChange,
}: {
    title: string;
    options: Option[];
    activeValue: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                {title}
            </h3>

            <div className="flex flex-col gap-2">
                {options.map((item) => (
                    <button
                        key={item.value}
                        onClick={() => onChange(item.value)}
                        className={`cursor-pointer rounded-2xl px-4 py-3 text-left text-sm font-medium capitalize transition ${activeValue === item.value
                            ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                            : "bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--accent)]"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}