export type BrandItem = {
    id: number | string;
    name: string;
    slug?: string;
    created_at?: string;
};

export type BrandFormData = {
    name: string;
    slug: string;
};

export type FieldErrors = Partial<Record<keyof BrandFormData, string[]>>;

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