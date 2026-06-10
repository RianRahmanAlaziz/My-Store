import Modal from "@/components/cms/common/Modal";
import Modaldelete from "@/components/cms/common/ModalDelete";
import CategoryForm from "./CategoryForm";
import type {
    CategoryFormData,
    FieldErrors,
    ModalData,
    ModalDeleteData,
} from "../types/category";

type Props = {
    isOpen: boolean;
    isOpenDelete: boolean;
    setIsOpen: (value: boolean) => void;
    setIsOpenDelete: (value: boolean) => void;
    modalData: ModalData;
    modalDataDelete: ModalDeleteData;
    formData: CategoryFormData;
    setFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>;
    errors: FieldErrors;
    setErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
    handleSaveCategories: () => Promise<void>;
    handleDeleteCategories: () => Promise<void>;
};

export default function CategoryModals({
    isOpen,
    isOpenDelete,
    setIsOpen,
    setIsOpenDelete,
    modalData,
    modalDataDelete,
    formData,
    setFormData,
    errors,
    setErrors,
    handleSaveCategories,
    handleDeleteCategories,
}: Props) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
                onSave={handleSaveCategories}
            >
                <CategoryForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                />
            </Modal>

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteCategories}
                title={modalDataDelete.title}
            />
        </>
    );
}