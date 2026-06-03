import { Search } from "lucide-react";
import Select from "react-select";
import { sortOptions } from "../constants/sortOptions";

type CatalogSearchSortProps = {
    search: string;
    sort: string;
    setSearch: (value: string) => void;
    setSort: (value: string) => void;
};

export function CatalogSearchSort({
    search,
    sort,
    setSearch,
    setSort,
}: CatalogSearchSortProps) {
    return (
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
                value={sortOptions.find((item) => item.value === sort)}
                onChange={(selected) => setSort(selected?.value || "latest")}
                options={sortOptions}
                isSearchable={false}
                className="min-w-[220px]"
                styles={{
                    control: (base) => ({
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
    );
}