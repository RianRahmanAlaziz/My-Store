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
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex h-12 w-full items-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 shadow-sm md:max-w-md">
                <Search className="h-5 w-5 shrink-0 text-[var(--muted-foreground)]" />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search shoes..."
                    className="h-full min-w-0 flex-1 bg-transparent pl-3 pr-2 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
                />
            </div>

            <Select
                value={sortOptions.find((item) => item.value === sort)}
                onChange={(selected) => setSort(selected?.value || "latest")}
                options={sortOptions}
                isSearchable={false}
                className="w-full md:min-w-[220px] md:w-auto "
                styles={{
                    control: (base, state) => ({
                        ...base,
                        minHeight: "48px",
                        borderRadius: "0.75rem",
                        borderColor: state.isFocused
                            ? "var(--accent)"
                            : "var(--border)",
                        backgroundColor: "var(--card)",
                        boxShadow: state.isFocused
                            ? "0 0 0 3px rgb(59 130 246 / 0.1)"
                            : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
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
                        boxShadow:
                            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
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