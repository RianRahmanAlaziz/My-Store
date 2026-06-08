"use client";

import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";

export type BrandsItem = {
    id: number | string;
    name: string;
    slug?: string;
    created_at?: string;
};

export type FieldErrors = Record<string, string[] | undefined>;

export type FormDataCategories = {
    name: string;
    slug: string;
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
    editId: number | string | null;
};

export type ModalDeleteData = {
    title: string;
    id?: number | string;
};

const DEFAULT_PAGINATION: Pagination = {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
};

function normalizeResponse(response: any) {
    const payload = response?.data;

    const brands =
        Array.isArray(payload?.data?.data)
            ? payload.data.data
            : Array.isArray(payload?.data)
                ? payload.data
                : Array.isArray(payload?.brands?.data)
                    ? payload.brands.data
                    : Array.isArray(payload?.brands)
                        ? payload.brands
                        : Array.isArray(payload)
                            ? payload
                            : [];

    const meta =
        payload?.data?.current_page
            ? payload.data
            : payload?.brands?.current_page
                ? payload.brands
                : null;

    return {
        brands,
        pagination: {
            current_page: Number(meta?.current_page ?? 1),
            last_page: Number(meta?.last_page ?? 1),
            per_page: Number(meta?.per_page ?? 10),
            total: Number(meta?.total ?? brands.length),
        },
    };
}

export default function useBrands() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

    const [brands, setBrands] = useState<BrandsItem[]>([]);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [loading, setLoading] = useState<boolean>(true);

    const [searchTerm, setSearchTerm] = useState<string>("");

    const [formData, setFormData] = useState<FormDataCategories>({
        name: "",
        slug: "",
    });

    const [pagination, setPagination] =
        useState<Pagination>(DEFAULT_PAGINATION);

    const [modalData, setModalData] = useState<ModalData>({
        title: "",
        mode: "add",
        editId: null,
    });

    const [modalDataDelete, setModalDataDelete] =
        useState<ModalDeleteData>({
            title: "",
        });

    const fetchBrands = async (
        page: number = 1,
        search: string = ""
    ): Promise<void> => {
        try {
            setLoading(true);

            const res = await axiosInstance.get("/brands", {
                params: {
                    page,
                    search,
                },
            });

            const normalized = normalizeResponse(res);

            setBrands(normalized.brands);
            setPagination(normalized.pagination);
        } catch (error: unknown) {
            console.error("Gagal mengambil data Brands:", error);
            setBrands([]);
            setPagination(DEFAULT_PAGINATION);
            toast.error("Gagal mengambil data Brands 😞");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            void fetchBrands(1, searchTerm);
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [searchTerm]);

    const handlePageChange = (page: number): void => {
        if (page < 1 || page > pagination.last_page) return;

        void fetchBrands(page, searchTerm);
    };

    const handleSave = async (): Promise<void> => {
        const { mode, editId } = modalData;

        try {
            const url =
                mode === "edit"
                    ? `/brands/${editId}`
                    : "/brands";

            const method = mode === "edit" ? "put" : "post";

            await axiosInstance({
                method,
                url,
                data: formData,
            });

            await fetchBrands(pagination.current_page, searchTerm);

            setIsOpen(false);
            setFormData({ name: "", slug: "" });
            setErrors({});

            if (mode === "edit") {
                toast.info("Brand berhasil diperbarui");
            } else {
                toast.success("Brand berhasil ditambahkan");
            }
        } catch (error: unknown) {
            const err = error as AxiosError<any>;

            const fieldErrors = err.response?.data?.errors as
                | FieldErrors
                | undefined;

            if (fieldErrors) setErrors(fieldErrors);

            toast.error(
                mode === "edit"
                    ? "Gagal memperbarui brand ⚠️"
                    : "Gagal menambahkan brand 🚫"
            );
        }
    };

    const openAddModal = (): void => {
        setFormData({ name: "", slug: "" });
        setErrors({});
        setModalData({
            title: "Add New Brand",
            mode: "add",
            editId: null,
        });
        setIsOpen(true);
    };

    const openEditModal = (brand: BrandsItem): void => {
        setFormData({
            name: brand.name ?? "",
            slug: brand.slug ?? "",
        });

        setErrors({});
        setModalData({
            title: "Edit Brand",
            mode: "edit",
            editId: brand.id,
        });
        setIsOpen(true);
    };

    const openModalDelete = (brand: BrandsItem): void => {
        setModalDataDelete({
            title: `Hapus brand "${brand.name}"?`,
            id: brand.id,
        });
        setIsOpenDelete(true);
    };

    const handleDelete = async (): Promise<void> => {
        try {
            if (modalDataDelete.id == null) return;

            await axiosInstance.delete(`/brands/${modalDataDelete.id}`);

            await fetchBrands(pagination.current_page, searchTerm);

            setIsOpenDelete(false);
            toast.success("Brand berhasil dihapus 🗑️");
        } catch (error: unknown) {
            const err = error as AxiosError<any>;

            console.error(
                "Gagal menghapus Brand:",
                err.response?.data || err.message
            );

            toast.error("Gagal menghapus Brand ❌");
        }
    };

    return {
        isOpen,
        isOpenDelete,
        brands,
        loading,
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
        handlePageChange,
        handleSave,
        openAddModal,
        openEditModal,
        openModalDelete,
        handleDelete,
    };
}
