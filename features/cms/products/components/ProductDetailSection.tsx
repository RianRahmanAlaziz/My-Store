import type { FieldErrors, ProductForm } from "../types/product";
import FormRow from "./FormRow";
import FormSection from "./FormSection";

type Props = {
    formData: ProductForm;
    errors: FieldErrors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default function ProductDetailSection({ formData, errors, handleChange }: Props) {
    return (
        <FormSection id="product-detail" title="Product Detail" className="mt-5">
            <FormRow title="SKU" badge="Optional" description="Gunakan kode unik untuk identifikasi stok product.">
                <input id="sku" name="sku" type="text" value={formData.sku} onChange={handleChange} className="form-control" placeholder="Contoh: SHOE-NIKE-001" />
                {errors.sku?.[0] && <div className="text-danger text-xs mt-1">{errors.sku[0]}</div>}
            </FormRow>

            <FormRow title="Product Description" badge="Required">
                <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows={5} placeholder="Product description" />
                {errors.description?.[0] && <div className="text-danger text-xs mt-1">{errors.description[0]}</div>}
            </FormRow>
        </FormSection>
    );
}
