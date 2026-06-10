import { axiosInstance } from "@/lib/axios";
import type { CategoryFormData } from "../types/category";

export function getCategories(page = 1, search = "") {
    return axiosInstance.get("/categories", {
        params: { page, search },
    });
}

export function createCategory(data: CategoryFormData) {
    return axiosInstance.post("/categories", data);
}

export function updateCategory(id: number | string, data: CategoryFormData) {
    return axiosInstance.put(`/categories/${id}`, data);
}

export function deleteCategory(id: number | string) {
    return axiosInstance.delete(`/categories/${id}`);
}