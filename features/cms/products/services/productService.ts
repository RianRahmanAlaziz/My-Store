import { axiosInstance } from "@/lib/axios";
import type { ProductForm } from "../types/product";

export function getProducts(page = 1, search = "") {
    return axiosInstance.get("/products", {
        params: { page, search },
    });
}

export function getProductOptions() {
    return Promise.all([
        axiosInstance.get("/brands"),
        axiosInstance.get("/categories"),
    ]);
}

export function getProductBySlug(slug: string) {
    return axiosInstance.get(`/products/${slug}`);
}

export function createProduct(payload: Partial<ProductForm>) {
    return axiosInstance.post("/products", payload);
}

export function updateProduct(slug: string, payload: Partial<ProductForm>) {
    return axiosInstance.put(`/products/${slug}`, payload);
}

export function deleteProduct(slug: string) {
    return axiosInstance.delete(`/products/${slug}`);
}

export function createProductVariant(slug: string, payload: unknown) {
    return axiosInstance.post(`/products/${slug}/variants`, payload);
}

export function updateProductVariant(slug: string, variantId: number | string, payload: unknown) {
    return axiosInstance.put(`/products/${slug}/variants/${variantId}`, payload);
}

export function uploadProductImage(slug: string, payload: FormData) {
    return axiosInstance.post(`/products/${slug}/images`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}
