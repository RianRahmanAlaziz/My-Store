import Modal from "@/components/cms/common/Modal";
import Modaldelete from "@/components/cms/common/ModalDelete";
import BrandForm from "./BrandForm";
import type { BrandFormData, FieldErrors, ModalData, ModalDeleteData } from "../types/brand";

type Props = {
    isOpen: boolean;
    isOpenDelete: boolean;
    setIsOpen: (value: boolean) => void;
    setIsOpenDelete: (value: boolean) => void;
    modalData: ModalData;
    modalDataDelete: ModalDeleteData;
    formData: BrandFormData;
    setFormData: React.Dispatch<React.SetStateAction<BrandFormData>>;
    errors: FieldErrors;
    setErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
    handleSave: () => Promise<void>;
    handleDelete: () => Promise<void>;
};

export default function BrandModals({
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
    handleSave,
    handleDelete,
}: Props) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
                onSave={handleSave}
            >
                <BrandForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                />
            </Modal>

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDelete}
                title={modalDataDelete.title}
            />
        </>
    );
}