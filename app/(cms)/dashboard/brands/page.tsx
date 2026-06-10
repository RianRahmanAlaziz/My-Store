"use client";

import useBrands from "@/features/cms/brands/hooks/useBrands";
import BrandToolbar from "@/features/cms/brands/components/BrandToolbar";
import BrandTable from "@/features/cms/brands/components/BrandTable";
import BrandPagination from "@/features/cms/brands/components/BrandPagination";
import BrandModals from "@/features/cms/brands/components/BrandModals";

export default function BrandPage() {
    const brands = useBrands();

    return (
        <>
            <h2 className="intro-y text-lg font-medium sm:pt-24">
                Brands Management
            </h2>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <BrandToolbar
                    searchTerm={brands.searchTerm}
                    setSearchTerm={brands.setSearchTerm}
                    openAddModal={brands.openAddModal}
                />

                <BrandTable
                    brands={brands.brands}
                    loading={brands.loading}
                    openEditModal={brands.openEditModal}
                    openModalDelete={brands.openModalDelete}
                />

                <BrandPagination
                    pagination={brands.pagination}
                    handlePageChange={brands.handlePageChange}
                />
            </div>

            <BrandModals {...brands} />
        </>
    );
}