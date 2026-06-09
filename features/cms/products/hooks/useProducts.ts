"use client";

import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";


export type ProductVariant = {
    id?: number | string;
    size: string;
    color: string;
    stock: number | string;
};

export type ProductItem = {
    id: number | string;
    name: string;
    slug: string;
    sku: string;
    description?: string;
    price: number | string;
    status?: string;
    brand_id?: number | string;
    category_id?: number | string;
    brand?: {
        id: number | string;
        name: string;
    };
    images?: {
        id: number;
        image: string;
    }[];
    category?: {
        id: number | string;
        name: string;
    };
    variants?: ProductVariant[];
    created_at?: string;
};

export type FieldErrors = Record<string, string[] | undefined>;

export type FormDataProduct = {
    name: string;
    brand_id: string;
    category_id: string;
    price: string;
    description: string;
    status: string;
    variants: ProductVariant[];
};

export type Pagination = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type ModalMode = "add" | "edit";

export type ModalData = {
    title: string;
    mode: ModalMode;
    editSlug: string | null;
};

export type ModalDeleteData = {
    title: string;
    slug?: string;
};

const DEFAULT_FORM_DATA: FormDataProduct = {
    name: "",
    brand_id: "",
    category_id: "",
    price: "",
    description: "",
    status: "active",
    variants: [{ size: "", color: "", stock: "" }],
};

const DEFAULT_PAGINATION: Pagination = {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
};

const normalizeProductsPayload = (response: any) => {
    const payload = response?.data;

    const products =
        Array.isArray(payload?.data?.data)
            ? payload.data.data
            : Array.isArray(payload?.data)
                ? payload.data
                : Array.isArray(payload?.products?.data)
                    ? payload.products.data
                    : Array.isArray(payload?.products)
                        ? payload.products
                        : Array.isArray(payload)
                            ? payload
                            : [];

    const meta =
        payload?.data?.current_page
            ? payload.data
            : payload?.products?.current_page
                ? payload.products
                : null;

    return {
        products,
        pagination: {
            current_page: Number(meta?.current_page ?? 1),
            last_page: Number(meta?.last_page ?? 1),
            per_page: Number(meta?.per_page ?? 10),
            total: Number(meta?.total ?? products.length),
        },
    };
};

export default function useProducts() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const [products, setProducts] = useState<ProductItem[]>([]);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState<FormDataProduct>(DEFAULT_FORM_DATA);

    const [pagination, setPagination] =
        useState<Pagination>(DEFAULT_PAGINATION);

    const [modalData, setModalData] = useState<ModalData>({
        title: "",
        mode: "add",
        editSlug: null,
    });

    const [modalDataDelete, setModalDataDelete] =
        useState<ModalDeleteData>({
            title: "",
        });

    const openDetailModal = (product: any) => {
        setSelectedProduct(product);
        setIsOpenDetail(true);
    };

    const fetchProducts = async (
        page = 1,
        search = searchTerm
    ): Promise<void> => {
        try {
            setLoading(true);

            const response = await axiosInstance.get("/products", {
                params: {
                    page,
                    search,
                },
            });

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

    const handlePageChange = (page: number): void => {
        if (page < 1 || page > pagination.last_page) return;

        void fetchProducts(page, searchTerm);
    };

    const resetForm = () => {
        setFormData({
            ...DEFAULT_FORM_DATA,
            variants: [{ size: "", color: "", stock: "" }],
        });
        setErrors({});
    };

    const buildPayload = () => ({
        name: formData.name,
        brand_id: formData.brand_id,
        category_id: formData.category_id,
        price: Number(formData.price),
        description: formData.description,
        status: formData.status,
        variants: formData.variants
            .filter((variant) => variant.size || variant.color || variant.stock)
            .map((variant) => ({
                id: variant.id,
                size: variant.size,
                color: variant.color,
                stock: Number(variant.stock || 0),
            })),
    });

    const handleSaveProduct = async (): Promise<void> => {
        const { mode, editSlug } = modalData;


        try {
            setSaving(true);
            setErrors({});

            const url = mode === "edit" ? `/products/${editSlug}` : "/products";
            const method = mode === "edit" ? "put" : "post";

            await axiosInstance({
                method,
                url,
                data: buildPayload(),
            });

            await fetchProducts(pagination.current_page, searchTerm);

            setIsOpen(false);
            resetForm();

            toast.success(
                mode === "edit"
                    ? "Product berhasil diperbarui"
                    : "Product berhasil ditambahkan"
            );
        } catch (error) {
            const err = error as AxiosError<any>;
            const fieldErrors = err.response?.data?.errors as FieldErrors | undefined;

            if (fieldErrors) setErrors(fieldErrors);

            toast.error(
                modalData.mode === "edit"
                    ? "Gagal memperbarui product"
                    : "Gagal menambahkan product"
            );
        } finally {
            setSaving(false);
        }
    };

    const openAddProductModal = (): void => {
        resetForm();
        setModalData({
            title: "Add New Product",
            mode: "add",
            editSlug: null,
        });
        setIsOpen(true);
    };

    const openEditProductModal = (product: ProductItem): void => {
        setFormData({
            name: product.name ?? "",
            brand_id: String(product.brand_id ?? product.brand?.id ?? ""),
            category_id: String(product.category_id ?? product.category?.id ?? ""),
            price: String(product.price ?? ""),
            description: product.description ?? "",
            status: product.status ?? "active",
            variants:
                product.variants && product.variants.length > 0
                    ? product.variants.map((variant) => ({
                        id: variant.id,
                        size: variant.size ?? "",
                        color: variant.color ?? "",
                        stock: String(variant.stock ?? ""),
                    }))
                    : [{ size: "", color: "", stock: "" }],
        });

        setErrors({});
        setModalData({
            title: "Edit Product",
            mode: "edit",
            editSlug: product.slug,
        });
        setIsOpen(true);
    };

    const openModalDelete = (product: ProductItem): void => {
        setModalDataDelete({
            title: `Hapus product "${product.name}"?`,
            slug: product.slug,
        });
        setIsOpenDelete(true);
    };

    const handleDeleteProduct = async (): Promise<void> => {
        if (modalDataDelete.slug == null) return;

        try {
            setDeleting(true);

            await axiosInstance.delete(`/products/${modalDataDelete.slug}`);

            await fetchProducts(pagination.current_page, searchTerm);

            setIsOpenDelete(false);
            toast.success("Product berhasil dihapus");
        } catch (error) {
            console.error("Gagal menghapus product:", error);
            toast.error("Gagal menghapus product");
        } finally {
            setDeleting(false);
        }
    };

    return {
        isOpen,
        isOpenDelete,
        products,
        loading,
        saving,
        deleting,
        searchTerm,
        setSearchTerm,
        pagination,
        modalData,
        modalDataDelete,
        formData,
        setFormData,
        errors,
        setErrors,
        setIsOpen,
        setIsOpenDelete,
        fetchProducts,
        handlePageChange,
        handleSaveProduct,
        openAddProductModal,
        openEditProductModal,
        openModalDelete,
        handleDeleteProduct,
        openDetailModal,
        selectedProduct,
        isOpenDetail,
        setIsOpenDetail,
    };
}