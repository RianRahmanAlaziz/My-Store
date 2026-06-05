import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CatalogStore {
    search: string;
    category: string;
    brand: string;
    sort: string;

    setSearch: (value: string) => void;
    setCategory: (value: string) => void;
    setBrand: (value: string) => void;
    setSort: (value: string) => void;

    resetFilters: () => void;
}

export const useCatalogStore = create<CatalogStore>()(
    persist(
        (set) => ({
            search: "",
            category: "all",
            brand: "all",
            sort: "latest",

            setSearch: (search) =>
                set({ search }),

            setCategory: (category) =>
                set({ category }),

            setBrand: (brand) =>
                set({ brand }),

            setSort: (sort) =>
                set({ sort }),

            resetFilters: () =>
                set({
                    search: "",
                    category: "all",
                    brand: "all",
                    sort: "latest",
                }),
        }),
        {
            name: "myshop-catalog-filters",
            storage: createJSONStorage(() => localStorage),
        }
    )
);