"use client";

import ProductModals from "@/features/cms/products/components/ProductModals";
import ProductPagination from "@/features/cms/products/components/ProductPagination";
import ProductTable from "@/features/cms/products/components/ProductTable";
import ProductToolbar from "@/features/cms/products/components/ProductToolbar";
import useProducts from "@/features/cms/products/hooks/useProducts";

export default function ProductsPage() {
    const products = useProducts();

    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-7 sm:pt-24">
                Products Management
            </h2>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <ProductToolbar searchTerm={products.searchTerm} setSearchTerm={products.setSearchTerm} />

                <ProductTable
                    products={products.products}
                    loading={products.loading}
                    openDetailModal={products.openDetailModal}
                    openModalDelete={products.openModalDelete}
                />

                <ProductPagination pagination={products.pagination} handlePageChange={products.handlePageChange} />
            </div>

            <ProductModals {...products} />
        </>
    );
}
