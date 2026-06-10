import { axiosInstance } from "@/lib/axios";
import type { BrandFormData } from "../types/brand";

export async function getBrands(page = 1, search = "") {
    return axiosInstance.get("/brands", {
        params: { page, search },
    });
}

export async function createBrand(data: BrandFormData) {
    return axiosInstance.post("/brands", data);
}

export async function updateBrand(id: number | string, data: BrandFormData) {
    return axiosInstance.put(`/brands/${id}`, data);
}

export async function deleteBrand(id: number | string) {
    return axiosInstance.delete(`/brands/${id}`);
}