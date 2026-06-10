import type { BrandFormData, FieldErrors } from "../types/brand";
import { generateSlug } from "../utils/generateSlug";

type Props = {
    formData: BrandFormData;
    setFormData: React.Dispatch<React.SetStateAction<BrandFormData>>;
    errors: FieldErrors;
    setErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
};

export default function BrandForm({
    formData,
    setFormData,
    errors,
    setErrors,
}: Props) {
    const clearError = (field: keyof BrandFormData) => {
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const field = name as keyof BrandFormData;

        setFormData((prev) => ({
            ...prev,
            [field]: value,
            ...(field === "name" ? { slug: generateSlug(value) } : {}),
        }));

        clearError(field);
    };

    return (
        <>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Name"
                    required
                    autoFocus
                />
                {errors.name?.[0] && (
                    <small className="text-danger">{errors.name[0]}</small>
                )}
            </div>

            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="slug" className="form-label">
                    Slug
                </label>
                <input
                    id="slug"
                    type="text"
                    name="slug"
                    value={formData.slug}
                    className="form-control"
                    placeholder="slug"
                    readOnly
                />
                {errors.slug?.[0] && (
                    <small className="text-danger">{errors.slug[0]}</small>
                )}
            </div>
        </>
    );
}