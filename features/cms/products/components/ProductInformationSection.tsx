import type { FieldErrors, OptionItem, ProductForm } from "../types/product";
import FormRow from "./FormRow";
import FormSection from "./FormSection";

type Props = {
    formData: ProductForm;
    brands: OptionItem[];
    categories: OptionItem[];
    errors: FieldErrors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default function ProductInformationSection({ formData, brands, categories, errors, handleChange }: Props) {
    return (
        <FormSection id="product-information" title="Product Information">
            <FormRow
                title="Product Name"
                badge="Required"
                description="Include product type, brand, and extra information such as color, material, or type."
            >
                <input name="name" value={formData.name} onChange={handleChange} type="text" className="form-control" placeholder="Product name" />
                {errors.name?.[0] && <div className="text-danger text-xs mt-1">{errors.name[0]}</div>}
            </FormRow>

            <FormRow title="Brand" badge="Required">
                <select name="brand_id" value={formData.brand_id} onChange={handleChange} className="form-select">
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                {errors.brand_id?.[0] && <div className="text-danger text-xs mt-1">{errors.brand_id[0]}</div>}
            </FormRow>

            <FormRow title="Category" badge="Required">
                <select name="category_id" value={formData.category_id} onChange={handleChange} className="form-select">
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.category_id?.[0] && <div className="text-danger text-xs mt-1">{errors.category_id[0]}</div>}
            </FormRow>

            <FormRow title="Original Price" badge="Required">
                <input name="original_price" value={formData.original_price} onChange={handleChange} type="number" className="form-control" placeholder="--" />
                {errors.original_price?.[0] && <div className="text-danger text-xs mt-1">{errors.original_price[0]}</div>}
            </FormRow>

            <FormRow title="Price" badge="Required">
                <input name="price" value={formData.price} onChange={handleChange} type="number" className="form-control" placeholder="--" />
                {errors.price?.[0] && <div className="text-danger text-xs mt-1">{errors.price[0]}</div>}
            </FormRow>
        </FormSection>
    );
}
