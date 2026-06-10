import type { ProductForm } from "../types/product";
import FormRow from "./FormRow";
import FormSection from "./FormSection";

type Props = {
    formData: ProductForm;
    handleSwitchChange: (name: keyof ProductForm, checked: boolean) => void;
};

const switches: Array<{
    key: keyof ProductForm;
    id: string;
    title: string;
    description: string;
}> = [
    {
        key: "is_best_seller",
        id: "product-best-seller",
        title: "Product Best Seller",
        description: "Tandai product sebagai best seller.",
    },
    {
        key: "is_trending",
        id: "product-trending",
        title: "Product Trending",
        description: "Tandai product sebagai trending.",
    },
    {
        key: "is_new",
        id: "product-new",
        title: "New Product",
        description: "Tandai product sebagai produk terbaru.",
    },
    {
        key: "is_active",
        id: "product-status",
        title: "Product Status",
        description: "Jika aktif, product akan tampil di halaman customer.",
    },
];

export default function ProductManagementSection({ formData, handleSwitchChange }: Props) {
    return (
        <FormSection id="product-management" title="Product Management" className="mt-5">
            {switches.map((item) => (
                <FormRow key={item.id} title={item.title} description={item.description}>
                    <div className="form-check form-switch">
                        <input
                            id={item.id}
                            className="form-check-input"
                            type="checkbox"
                            checked={Boolean(formData[item.key])}
                            onChange={(e) => handleSwitchChange(item.key, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                            Active
                        </label>
                    </div>
                </FormRow>
            ))}
        </FormSection>
    );
}
