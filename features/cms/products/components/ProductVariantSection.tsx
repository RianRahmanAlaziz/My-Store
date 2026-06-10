import { Plus, X } from "lucide-react";
import type { ProductForm, ProductVariant } from "../types/product";
import FormSection from "./FormSection";

type Props = {
    formData: ProductForm;
    handleVariantChange: (index: number, field: keyof ProductVariant, value: string) => void;
    addVariant: () => void;
    removeVariant: (index: number) => void;
};

export default function ProductVariantSection({ formData, handleVariantChange, addVariant, removeVariant }: Props) {
    return (
        <FormSection id="product-variant" title="Product Variant" className="mt-5">
            {formData.variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 mt-4 first:mt-0">
                    <input value={variant.size} onChange={(e) => handleVariantChange(index, "size", e.target.value)} className="form-control col-span-4" placeholder="Size" type="text" />
                    <input value={variant.color} onChange={(e) => handleVariantChange(index, "color", e.target.value)} className="form-control col-span-4" placeholder="Color" type="text" />
                    <input value={variant.stock} onChange={(e) => handleVariantChange(index, "stock", e.target.value)} className="form-control col-span-3" placeholder="Stock" type="number" />
                    <button type="button" onClick={() => removeVariant(index)} className="btn btn-danger col-span-1 flex items-center justify-center">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}

            <button type="button" onClick={addVariant} className="btn btn-outline-primary mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
            </button>
        </FormSection>
    );
}
