import type {
    CategoryFormData,
    FieldErrors,
} from "../types/category";
import { generateSlug } from "../utils/generateSlug";

type Props = {
    formData: CategoryFormData;
    setFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>;
    errors: FieldErrors;
    setErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
};

export default function CategoryForm({
    formData,
    setFormData,
    errors,
    setErrors,
}: Props) {
    const clearError = (field: keyof CategoryFormData) => {
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
        const field = name as keyof CategoryFormData;

        setFormData((prev) => ({
            ...prev,
            [field]: value,
            ...(field === "name"
                ? { slug: generateSlug(value) }
                : {}),
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
                    <small className="text-danger">
                        {errors.name[0]}
                    </small>
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
                    <small className="text-danger">
                        {errors.slug[0]}
                    </small>
                )}
            </div>
        </>
    );
}