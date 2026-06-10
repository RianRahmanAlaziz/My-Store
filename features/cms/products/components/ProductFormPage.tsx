"use client";

import { LoaderCircle } from "lucide-react";
import type { ProductMode } from "../types/product";
import { useProductForm } from "../hooks/useProductForm";
import ProductDetailSection from "./ProductDetailSection";
import ProductFormNavigation from "./ProductFormNavigation";
import ProductInformationSection from "./ProductInformationSection";
import ProductManagementSection from "./ProductManagementSection";
import ProductSubmitBar from "./ProductSubmitBar";
import ProductUploadSection from "./ProductUploadSection";
import ProductVariantSection from "./ProductVariantSection";

type ProductFormPageProps = {
    mode: ProductMode;
    productId?: string;
};

export default function ProductFormPage({ mode, productId }: ProductFormPageProps) {
    const productForm = useProductForm(mode, productId);

    if (productForm.loading) {
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
                    <ProductInformationSection {...productForm} />
                    <ProductUploadSection {...productForm} />
                    <ProductDetailSection {...productForm} />
                    <ProductVariantSection {...productForm} />
                    <ProductManagementSection {...productForm} />
                    <ProductSubmitBar saving={productForm.saving} onSubmit={productForm.handleSubmit} />
                </div>

                <ProductFormNavigation loading={productForm.loading} />
            </div>
        </>
    );
}
