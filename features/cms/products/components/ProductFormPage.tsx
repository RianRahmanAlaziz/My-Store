"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ImageIcon, LoaderCircle, Plus, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";

type ProductFormPageProps = {
    mode: "create" | "edit";
    productId?: string;
};

type OptionItem = {
    id: number | string;
    name: string;
};

type VariantItem = {
    id?: number | string;
    size: string;
    color: string;
    stock: string;
};

type ProductForm = {
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
    variants: VariantItem[];
    images: File[];
};

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

function normalizeList(response: any): OptionItem[] {
    const payload = response?.data;

    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload)) return payload;

    return [];
}

export default function ProductFormPage({
    mode,
    productId,
}: ProductFormPageProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<ProductForm>(defaultForm);
    const [brands, setBrands] = useState<OptionItem[]>([]);
    const [categories, setCategories] = useState<OptionItem[]>([]);
    const [loading, setLoading] = useState(mode === "edit");
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
        async function fetchOptions() {
            const [brandRes, categoryRes] = await Promise.all([
                axiosInstance.get("/brands"),
                axiosInstance.get("/categories"),
            ]);

            setBrands(normalizeList(brandRes));
            setCategories(normalizeList(categoryRes));
        }

        fetchOptions().catch(() => {
            toast.error("Gagal mengambil brand/category");
        });
    }, []);

    useEffect(() => {
        if (mode !== "edit" || !productId) return;

        async function fetchProduct() {
            try {
                setLoading(true);

                console.log("SLUG:", productId);

                const response = await axiosInstance.get(`/products/${productId}`);

                console.log("PRODUCT RESPONSE:", response.data);

                const product = response.data?.data ?? response.data;
                console.log("PRODUCT:", product);

                const oldImages =
                    product.images?.map((image: any) => image.image ?? image.url).filter(Boolean) ?? [];

                setPreviews(oldImages);

                setFormData({
                    name: product.name ?? "",
                    brand_id: String(product.brand_id ?? product.brand?.id ?? ""),
                    category_id: String(product.category_id ?? product.category?.id ?? ""),
                    price: String(product.price ?? ""),
                    original_price: String(product.original_price ?? ""),
                    description: product.description ?? "",
                    sku: product.sku ?? "",
                    is_active: Boolean(product.is_active),
                    is_best_seller: Boolean(product.is_best_seller),
                    is_trending: Boolean(product.is_trending),
                    is_new: Boolean(product.is_new),
                    variants:
                        product.variants?.length > 0
                            ? product.variants.map((variant: any) => ({
                                id: variant.id,
                                size: variant.size ?? "",
                                color: variant.color ?? "",
                                stock: String(variant.stock ?? ""),
                            }))
                            : [{ size: "", color: "", stock: "" }],
                    images: [],
                });
            } catch (error: any) {
                console.log("ERROR:", error.response?.data);
                console.log("STATUS:", error.response?.status);

                toast.error("Gagal mengambil detail product");
            } finally {
                console.log("LOADING FALSE");
                setLoading(false);
            }
        }

        fetchProduct();
    }, [mode, productId]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []).slice(0, 5);

        setFormData((prev) => ({
            ...prev,
            images: files,
        }));

        setPreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, imageIndex) => imageIndex !== index),
        }));

        setPreviews((prev) => prev.filter((_, imageIndex) => imageIndex !== index));
    };

    const handleVariantChange = (
        index: number,
        field: keyof VariantItem,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            variants: prev.variants.map((variant, variantIndex) =>
                variantIndex === index
                    ? { ...variant, [field]: value }
                    : variant
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
                await axiosInstance.put(`/products/${productId}`, productPayload);
            } else {
                const productResponse = await axiosInstance.post(
                    "/products",
                    productPayload
                );

                productSlug = productResponse.data?.data?.slug;
            }

            if (!productSlug) {
                throw new Error("Slug product tidak ditemukan");
            }

            const validVariants = formData.variants.filter(
                (variant) => variant.size && variant.color && variant.stock
            );

            await Promise.all(
                validVariants.map((variant) => {
                    const variantPayload = {
                        size: variant.size,
                        color: variant.color,
                        stock: Number(variant.stock),
                    };

                    if (mode === "edit" && variant.id) {
                        return axiosInstance.put(
                            `/products/${productSlug}/variants/${variant.id}`,
                            variantPayload
                        );
                    }

                    return axiosInstance.post(
                        `/products/${productSlug}/variants`,
                        variantPayload
                    );
                })
            );

            await Promise.all(
                formData.images.map((image, index) => {
                    const imagePayload = new FormData();

                    imagePayload.append("image", image);
                    imagePayload.append("is_main", index === 0 ? "1" : "0");

                    return axiosInstance.post(
                        `/products/${productSlug}/images`,
                        imagePayload,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                })
            );

            toast.success(
                mode === "edit"
                    ? "Product berhasil diperbarui"
                    : "Product berhasil ditambahkan"
            );

            router.push("/dashboard/products");
        } catch (error: any) {
            console.log(error?.response?.data);

            const fieldErrors = error?.response?.data?.errors;

            if (fieldErrors) {
                setErrors(fieldErrors);
            }

            toast.error(
                error?.response?.data?.message ??
                (mode === "edit"
                    ? "Gagal memperbarui product"
                    : "Gagal menambahkan product")
            );
        } finally {
            setSaving(false);
        }
    };

    const [activeSection, setActiveSection] =
        useState("product-information");
    const sections = [
        {
            id: "product-information",
            label: "Product Information",
        },
        {
            id: "upload-product",
            label: "Upload Product",
        },
        {
            id: "product-detail",
            label: "Product Detail",
        },
        {
            id: "product-variant",
            label: "Product Variant",
        },
        {
            id: "product-management",
            label: "Product Management",
        },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);

        if (!element) return;

        const yOffset = -120;
        const y =
            element.getBoundingClientRect().top +
            window.scrollY +
            yOffset;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });

        setActiveSection(id);
    };

    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: "-120px 0px -50% 0px",
            }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);

            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [loading]);


    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <LoaderCircle className="h-8 w-8 animate-spin text-slate-500" />
            </div>
        );
    }

    return (
        <>
            <div className="intro-y flex items-center mt-8 sm:pt-14">
                <h2 className="text-lg font-medium mr-auto">
                    {mode === "edit" ? "Edit Product" : "Add Product"}
                </h2>
            </div>

            <div className="grid grid-cols-11 gap-x-6 mt-5 pb-20">

                <div className="intro-y col-span-11 2xl:col-span-9">

                    <div id="product-information" className="intro-y box p-5">
                        <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <ChevronDown className="w-4 h-4 mr-2" />
                                Product Information
                            </div>

                            <div className="mt-5">
                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Product Name</div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">Required</div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3"> Include min. 40 characters to make it more attractive and easy for buyers to find, consisting of product type, brand, and information such as color, material, or type. </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            placeholder="Product name"
                                        />
                                        {errors.name?.[0] && (
                                            <div className="text-danger text-xs mt-1">
                                                {errors.name[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Brand</div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">Required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <select
                                            name="brand_id"
                                            value={formData.brand_id}
                                            onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="">Select Brand</option>
                                            {brands.map((brand) => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.brand_id?.[0] && (
                                            <div className="text-danger text-xs mt-1">
                                                {errors.brand_id[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Category</div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">Required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <select
                                            name="category_id"
                                            value={formData.category_id}
                                            onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id?.[0] && (
                                            <div className="text-danger text-xs mt-1">
                                                {errors.category_id[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Original Price</div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">Required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <input
                                            name="original_price"
                                            value={formData.original_price}
                                            onChange={handleChange}
                                            type="number"
                                            className="form-control"
                                            placeholder="--"
                                        />
                                        {errors.original_price?.[0] && (
                                            <div className="text-danger text-xs mt-1">
                                                {errors.original_price[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Price</div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">Required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <input
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            type="number"
                                            className="form-control"
                                            placeholder="--"
                                        />
                                        {errors.price?.[0] && (
                                            <div className="text-danger text-xs mt-1">
                                                {errors.price[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="upload-product" className="intro-y box p-5 mt-5">
                        <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <ChevronDown className="w-4 h-4 mr-2" />
                                Upload Product
                            </div>

                            <div className="mt-5">
                                <div className="form-inline items-start flex-col xl:flex-row mt-10">
                                    <div className="form-label w-full xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">
                                                    Product Photos
                                                </div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">Required</div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Upload maksimal 5 gambar product.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                                        <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                                            {previews.map((preview, index) => (
                                                <div
                                                    key={preview}
                                                    className="col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in"
                                                >
                                                    <img
                                                        src={preview}
                                                        alt="Preview"
                                                        className="rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="px-4 pb-4 mt-5 flex items-center justify-center cursor-pointer relative">
                                            <ImageIcon className="w-4 h-4 mr-2" />
                                            <span className="text-primary mr-1">
                                                Upload a file
                                            </span>
                                            or drag and drop
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="w-full h-full top-0 left-0 absolute opacity-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="product-detail" className="intro-y box p-5 mt-5">
                        <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <ChevronDown className="w-4 h-4 mr-2" />
                                Product Detail
                            </div>

                            <div className="mt-5">
                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">SKU</div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                    Optional
                                                </div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Gunakan kode unik untuk identifikasi stok product.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <input
                                            id="sku"
                                            name="sku"
                                            type="text"
                                            value={formData.sku}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Contoh: SHOE-NIKE-001"
                                        />

                                        {errors.sku?.[0] && (
                                            <div className="text-danger text-xs mt-1">
                                                {errors.sku[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">
                                                    Product Description
                                                </div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">Required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="form-control"
                                            rows={5}
                                            placeholder="Product description"
                                        />
                                        {errors.description?.[0] && (
                                            <div className="text-danger text-xs mt-1">
                                                {errors.description[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="product-variant" className="intro-y box p-5 mt-5">
                        <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <ChevronDown className="w-4 h-4 mr-2" />
                                Product Variant
                            </div>

                            <div className="mt-5">
                                {formData.variants.map((variant, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-12 gap-3 mt-4"
                                    >
                                        <input
                                            value={variant.size}
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    index,
                                                    "size",
                                                    e.target.value
                                                )
                                            }
                                            className="form-control col-span-4"
                                            placeholder="Size"
                                            type="text"
                                        />

                                        <input
                                            value={variant.color}
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    index,
                                                    "color",
                                                    e.target.value
                                                )
                                            }
                                            className="form-control col-span-4"
                                            placeholder="Color"
                                            type="text"
                                        />

                                        <input
                                            value={variant.stock}
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    index,
                                                    "stock",
                                                    e.target.value
                                                )
                                            }
                                            className="form-control col-span-3"
                                            placeholder="Stock"
                                            type="number"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="btn btn-outline-danger col-span-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="btn btn-outline-primary border-dashed w-full mt-4"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Variant
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="product-management" className="intro-y box p-5 mt-5">
                        <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <ChevronDown className="w-4 h-4 mr-2" />
                                Product Management
                            </div>
                            <div className="mt-5">
                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Product Best Seller</div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Tandai product sebagai best seller.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <div className="form-check form-switch">
                                            <input
                                                id="product-best-seller"
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={formData.is_best_seller}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        is_best_seller: e.target.checked,
                                                    }))
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="product-best-seller"
                                            >
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Product Trending</div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Tandai product sebagai trending.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <div className="form-check form-switch">
                                            <input
                                                id="product-trending"
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={formData.is_trending}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        is_trending: e.target.checked,
                                                    }))
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="product-trending"
                                            >
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">New Product</div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Tandai product sebagai produk terbaru.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <div className="form-check form-switch">
                                            <input
                                                id="product-new"
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={formData.is_new}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        is_new: e.target.checked,
                                                    }))
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="product-new"
                                            >
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Product Status</div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Jika aktif, product akan tampil di halaman customer.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <div className="form-check form-switch">
                                            <input
                                                id="product-status"
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={formData.is_active}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        is_active: e.target.checked,
                                                    }))
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="product-status"
                                            >
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
                        <Link
                            href="/dashboard/products"
                            className="btn py-3 border-slate-300 text-slate-500 w-full md:w-52"
                        >
                            Cancel
                        </Link>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={saving}
                            className="btn py-3 btn-primary w-full md:w-52"
                        >
                            {saving ? (
                                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Save
                        </button>
                    </div>
                </div>

                <div className="hidden 2xl:block">
                    <div className="fixed right-8 top-40 z-50 w-56 shadow-lg">
                        <div className="box p-5">
                            <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:h-full before:absolute before:left-0 before:z-[-1]">
                                {sections.map((section) => (
                                    <li
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`mb-4 cursor-pointer border-l-2 pl-5 transition-all duration-200 ${activeSection === section.id
                                            ? "border-primary text-primary font-medium"
                                            : "border-transparent hover:text-primary"
                                            }`}
                                    >
                                        {section.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}