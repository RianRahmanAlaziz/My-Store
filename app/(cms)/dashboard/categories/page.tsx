"use client";

import useCategories from "@/features/cms/categories/hooks/useCategories";
import CategoryToolbar from "@/features/cms/categories/components/CategoryToolbar";
import CategoryTable from "@/features/cms/categories/components/CategoryTable";
import CategoryPagination from "@/features/cms/categories/components/CategoryPagination";
import CategoryModals from "@/features/cms/categories/components/CategoryModals";

export default function CategoriesPage() {
    const categories = useCategories();

    return (
        <>
            <h2 className="intro-y text-lg font-medium sm:pt-24">
                Categories Management
            </h2>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <CategoryToolbar
                    searchTerm={categories.searchTerm}
                    setSearchTerm={categories.setSearchTerm}
                    openAddModal={categories.openAddCategoriesModal}
                />

                <CategoryTable
                    categories={categories.categories}
                    loading={categories.loading}
                    openEditModal={categories.openEditCategoryModal}
                    openDeleteModal={categories.openModalDelete}
                />

                <CategoryPagination
                    pagination={categories.pagination}
                    handlePageChange={categories.handlePageChange}
                />
            </div>

            <CategoryModals {...categories} />
        </>
    );
}