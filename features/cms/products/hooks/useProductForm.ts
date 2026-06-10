"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { FieldErrors, OptionItem, ProductForm, ProductMode, ProductVariant } from "../types/product";
import {
    createProduct,
    createProductVariant,
    getProductBySlug,
    getProductOptions,
    updateProduct,
    updateProductVariant,
    uploadProductImage,
} from "../services/productService";
import { normalizeList } from "../utils/productHelpers";

const defaultForm: ProductForm = {
    name: "",
    brand_id: "",
    category_id: "",
    price: "",
    original_price: "",
    description: "",
    sku: "",
    is_active: true,
    is_best_seller: false,
    is_trending: false,
    is_new: false,
    variants: [{ size: "", color: "", stock: "" }],
    images: [],
};

export function useProductForm(mode: ProductMode, productId?: string) {
    const router = useRouter();

    const [formData, setFormData] = useState<ProductForm>(defaultForm);
    const [brands, setBrands] = useState<OptionItem[]>([]);
    const [categories, setCategories] = useState<OptionItem[]>([]);
    const [loading, setLoading] = useState(mode === "edit");
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
        async function fetchOptions() {
            const [brandRes, categoryRes] = await getProductOptions();
            setBrands(normalizeList(brandRes));
            setCategories(normalizeList(categoryRes));
        }

        fetchOptions().catch(() => toast.error("Gagal mengambil brand/category"));
    }, []);

    useEffect(() => {
        if (mode !== "edit" || !productId) return;

        async function fetchProduct() {
            try {
                setLoading(true);
                const response = await getProductBySlug(productId!);
                const product = response.data?.data ?? response.data;
                const oldImages = product.images?.map((image: any) => image.image ?? image.url).filter(Boolean) ?? [];

                setPreviews(oldImages);
                setFormData({
                    name: product.name ?? "",
                    brand_id: String(product.brand_id ?? product.brand?.id ?? ""),
                    category_id: String(product.category_id ?? product.category?.id ?? ""),
                    price: String(product.price ?? ""),
                    original_price: String(product.original_price ?? ""),
                    description: product.description ?? "",
                    sku: product.sku ?? "",
                    is_active: Boolean(product.is_active ?? product.status === "active" ?? true),
                    is_best_seller: Boolean(product.is_best_seller),
                    is_trending: Boolean(product.is_trending),
                    is_new: Boolean(product.is_new),
                    variants: product.variants?.length > 0
                        ? product.variants.map((variant: any) => ({
                              id: variant.id,
                              size: variant.size ?? "",
                              color: variant.color ?? "",
                              stock: String(variant.stock ?? ""),
                          }))
                        : [{ size: "", color: "", stock: "" }],
                    images: [],
                });
            } catch (error) {
                console.error("Gagal mengambil detail product:", error);
                toast.error("Gagal mengambil detail product");
            } finally {
                setLoading(false);
            }
        }

        void fetchProduct();
    }, [mode, productId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSwitchChange = (name: keyof ProductForm, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []).slice(0, 5);
        setFormData((prev) => ({ ...prev, images: files }));
        setPreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, imageIndex) => imageIndex !== index),
        }));
        setPreviews((prev) => prev.filter((_, imageIndex) => imageIndex !== index));
    };

    const handleVariantChange = (index: number, field: keyof ProductVariant, value: string) => {
        setFormData((prev) => ({
            ...prev,
            variants: prev.variants.map((variant, variantIndex) =>
                variantIndex === index ? { ...variant, [field]: value } : variant
            ),
        }));
    };

    const addVariant = () => {
        setFormData((prev) => ({
            ...prev,
            variants: [...prev.variants, { size: "", color: "", stock: "" }],
        }));
    };

    const removeVariant = (index: number) => {
        if (formData.variants.length <= 1) {
            toast.info("Minimal harus ada 1 variant");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            variants: prev.variants.filter((_, variantIndex) => variantIndex !== index),
        }));
    };

    const handleSubmit = async () => {
        try {
            setSaving(true);
            setErrors({});

            const productPayload = {
                name: formData.name,
                brand_id: formData.brand_id,
                category_id: formData.category_id,
                price: Number(formData.price),
                original_price: Number(formData.original_price || 0),
                description: formData.description,
                sku: formData.sku,
                is_active: formData.is_active,
                is_best_seller: formData.is_best_seller,
                is_trending: formData.is_trending,
                is_new: formData.is_new,
            };

            let productSlug = productId;

            if (mode === "edit") {
                await updateProduct(productId!, productPayload);
            } else {
                const productResponse = await createProduct(productPayload);
                productSlug = productResponse.data?.data?.slug;
            }

            if (!productSlug) throw new Error("Slug product tidak ditemukan");

            const validVariants = formData.variants.filter((variant) => variant.size && variant.color && variant.stock);

            await Promise.all(
                validVariants.map((variant) => {
                    const variantPayload = {
                        size: variant.size,
                        color: variant.color,
                        stock: Number(variant.stock),
                    };

                    if (mode === "edit" && variant.id) {
                        return updateProductVariant(productSlug!, variant.id, variantPayload);
                    }

                    return createProductVariant(productSlug!, variantPayload);
                })
            );

            await Promise.all(
                formData.images.map((image, index) => {
                    const imagePayload = new FormData();
                    imagePayload.append("image", image);
                    imagePayload.append("is_main", index === 0 ? "1" : "0");
                    return uploadProductImage(productSlug!, imagePayload);
                })
            );

            toast.success(mode === "edit" ? "Product berhasil diperbarui" : "Product berhasil ditambahkan");
            router.push("/dashboard/products");
        } catch (error: any) {
            const fieldErrors = error?.response?.data?.errors;
            if (fieldErrors) setErrors(fieldErrors);

            toast.error(
                error?.response?.data?.message ??
                    (mode === "edit" ? "Gagal memperbarui product" : "Gagal menambahkan product")
            );
        } finally {
            setSaving(false);
        }
    };

    return {
        formData,
        setFormData,
        brands,
        categories,
        loading,
        saving,
        errors,
        previews,
        handleChange,
        handleSwitchChange,
        handleImageChange,
        removeImage,
        handleVariantChange,
        addVariant,
        removeVariant,
        handleSubmit,
    };
}
