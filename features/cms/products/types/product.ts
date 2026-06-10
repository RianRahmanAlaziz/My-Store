export type ProductMode = "create" | "edit";

export type OptionItem = {
    id: number | string;
    name: string;
};

export type ProductVariant = {
    id?: number | string;
    size: string;
    color: string;
    stock: number | string;
};

export type ProductImage = {
    id: number | string;
    image: string;
    url?: string;
};

export type ProductItem = {
    id: number | string;
    name: string;
    slug: string;
    sku?: string;
    description?: string;
    price: number | string;
    original_price?: number | string;
    status?: string;
    is_active?: boolean;
    is_best_seller?: boolean;
    is_trending?: boolean;
    is_new?: boolean;
    is_wishlisted?: boolean;
    rating?: number | string;
    reviews?: number | string;
    brand_id?: number | string;
    category_id?: number | string;
    brand?: OptionItem;
    category?: OptionItem;
    images?: ProductImage[];
    variants?: ProductVariant[];
    sizes?: string[];
    colors?: string[];
    created_at?: string;
};

export type ProductForm = {
    name: string;
    brand_id: string;
    category_id: string;
    price: string;
    original_price: string;
    description: string;
    sku: string;
    is_active: boolean;
    is_best_seller: boolean;
    is_trending: boolean;
    is_new: boolean;
    variants: ProductVariant[];
    images: File[];
};

export type FieldErrors = Record<string, string[] | undefined>;

export type Pagination = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type ModalDeleteData = {
    title: string;
    slug?: string;
};
