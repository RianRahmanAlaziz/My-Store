"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { ModalDeleteData, Pagination, ProductItem } from "../types/product";
import { deleteProduct, getProducts } from "../services/productService";
import { DEFAULT_PAGINATION, normalizeProductsPayload } from "../utils/productHelpers";

export default function useProducts() {
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);
    const [modalDataDelete, setModalDataDelete] = useState<ModalDeleteData>({ title: "" });

    const fetchProducts = async (page = 1, search = searchTerm) => {
        try {
            setLoading(true);
            const response = await getProducts(page, search);
            const normalized = normalizeProductsPayload(response);

            setProducts(normalized.products);
            setPagination(normalized.pagination);
        } catch (error) {
            console.error("Gagal mengambil data product:", error);
            toast.error("Gagal mengambil data product");
            setProducts([]);
            setPagination(DEFAULT_PAGINATION);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            void fetchProducts(1, searchTerm);
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [searchTerm]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > pagination.last_page) return;
        void fetchProducts(page, searchTerm);
    };

    const openDetailModal = (product: ProductItem) => {
        setSelectedProduct(product);
        setIsOpenDetail(true);
    };

    const openModalDelete = (product: ProductItem) => {
        setModalDataDelete({
            title: `Hapus product ${product.name}?`,
            slug: product.slug,
        });
        setIsOpenDelete(true);
    };

    const handleDeleteProduct = async () => {
        if (!modalDataDelete.slug) return;

        try {
            setDeleting(true);
            await deleteProduct(modalDataDelete.slug);
            toast.success("Product berhasil dihapus");
            setIsOpenDelete(false);
            await fetchProducts(pagination.current_page, searchTerm);
        } catch (error) {
            console.error("Gagal menghapus product:", error);
            toast.error("Gagal menghapus product");
        } finally {
            setDeleting(false);
        }
    };

    return {
        isOpenDelete,
        setIsOpenDelete,
        isOpenDetail,
        setIsOpenDetail,
        selectedProduct,
        products,
        loading,
        deleting,
        searchTerm,
        setSearchTerm,
        pagination,
        modalDataDelete,
        handlePageChange,
        openDetailModal,
        openModalDelete,
        handleDeleteProduct,
    };
}
