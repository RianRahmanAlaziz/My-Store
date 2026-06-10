import type { OptionItem, Pagination, ProductItem } from "../types/product";

export const DEFAULT_PAGINATION: Pagination = {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
};

export function formatRupiah(value: number | string) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

export function normalizeList(response: any): OptionItem[] {
    const payload = response?.data;

    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload)) return payload;

    return [];
}

export function normalizeProductsPayload(response: any): {
    products: ProductItem[];
    pagination: Pagination;
} {
    const payload = response?.data;

    const products = Array.isArray(payload?.data?.data)
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

    const meta = payload?.data?.current_page
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
}

export function getProductStatus(product: ProductItem) {
    return product.is_active === true || product.status === "active" || product.status === "published" || product.status === undefined;
}
