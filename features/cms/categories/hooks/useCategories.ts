"use client";

import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";

export type CategoriesItem = {
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

function normalizeCategoriesResponse(response: any) {
    const payload = response?.data;

    const categories =
        Array.isArray(payload?.data?.data)
            ? payload.data.data
            : Array.isArray(payload?.data)
                ? payload.data
                : Array.isArray(payload?.categories?.data)
                    ? payload.categories.data
                    : Array.isArray(payload?.categories)
                        ? payload.categories
                        : Array.isArray(payload)
                            ? payload
                            : [];

    const meta =
        payload?.data?.current_page
            ? payload.data
            : payload?.categories?.current_page
                ? payload.categories
                : null;

    return {
        categories,
        pagination: {
            current_page: Number(meta?.current_page ?? 1),
            last_page: Number(meta?.last_page ?? 1),
            per_page: Number(meta?.per_page ?? 10),
            total: Number(meta?.total ?? categories.length),
        },
    };
}

export default function useCategories() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

    const [categories, setCategories] = useState<CategoriesItem[]>([]);
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

    const fetchCategories = async (
        page: number = 1,
        search: string = ""
    ): Promise<void> => {
        try {
            setLoading(true);

            const res = await axiosInstance.get("/categories", {
                params: {
                    page,
                    search,
                },
            });

            const normalized = normalizeCategoriesResponse(res);

            setCategories(normalized.categories);
            setPagination(normalized.pagination);
        } catch (error: unknown) {
            console.error("Gagal mengambil data Categories:", error);
            setCategories([]);
            setPagination(DEFAULT_PAGINATION);
            toast.error("Gagal mengambil data Categories 😞");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            void fetchCategories(1, searchTerm);
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [searchTerm]);

    const handlePageChange = (page: number): void => {
        if (page < 1 || page > pagination.last_page) return;

        void fetchCategories(page, searchTerm);
    };

    const handleSaveCategories = async (): Promise<void> => {
        const { mode, editId } = modalData;

        try {
            const url =
                mode === "edit"
                    ? `/categories/${editId}`
                    : "/categories";

            const method = mode === "edit" ? "put" : "post";

            await axiosInstance({
                method,
                url,
                data: formData,
            });

            await fetchCategories(pagination.current_page, searchTerm);

            setIsOpen(false);
            setFormData({ name: "", slug: "" });
            setErrors({});

            if (mode === "edit") {
                toast.info("Category berhasil diperbarui");
            } else {
                toast.success("Category berhasil ditambahkan");
            }
        } catch (error: unknown) {
            const err = error as AxiosError<any>;

            const fieldErrors = err.response?.data?.errors as
                | FieldErrors
                | undefined;

            if (fieldErrors) setErrors(fieldErrors);

            toast.error(
                mode === "edit"
                    ? "Gagal memperbarui category ⚠️"
                    : "Gagal menambahkan category 🚫"
            );
        }
    };

    const openAddCategoriesModal = (): void => {
        setFormData({ name: "", slug: "" });
        setErrors({});
        setModalData({
            title: "Add New Category",
            mode: "add",
            editId: null,
        });
        setIsOpen(true);
    };

    const openEditCategoryModal = (category: CategoriesItem): void => {
        setFormData({
            name: category.name ?? "",
            slug: category.slug ?? "",
        });

        setErrors({});
        setModalData({
            title: "Edit Category",
            mode: "edit",
            editId: category.id,
        });
        setIsOpen(true);
    };

    const openModalDelete = (category: CategoriesItem): void => {
        setModalDataDelete({
            title: `Hapus category "${category.name}"?`,
            id: category.id,
        });
        setIsOpenDelete(true);
    };

    const handleDeleteCategories = async (): Promise<void> => {
        try {
            if (modalDataDelete.id == null) return;

            await axiosInstance.delete(`/categories/${modalDataDelete.id}`);

            await fetchCategories(pagination.current_page, searchTerm);

            setIsOpenDelete(false);
            toast.success("Category berhasil dihapus 🗑️");
        } catch (error: unknown) {
            const err = error as AxiosError<any>;

            console.error(
                "Gagal menghapus Category:",
                err.response?.data || err.message
            );

            toast.error("Gagal menghapus Category ❌");
        }
    };

    return {
        isOpen,
        isOpenDelete,
        categories,
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
        handleSaveCategories,
        openAddCategoriesModal,
        openEditCategoryModal,
        openModalDelete,
        handleDeleteCategories,
    };
}