import DetailModal from "@/components/cms/common/DetailModal";
import ModalDelete from "@/components/cms/common/ModalDelete";
import type { ModalDeleteData, ProductItem } from "../types/product";
import ProductDetail from "./ProductDetail";

type Props = {
    isOpenDelete: boolean;
    setIsOpenDelete: (value: boolean) => void;
    modalDataDelete: ModalDeleteData;
    handleDeleteProduct: () => Promise<void>;
    isOpenDetail: boolean;
    setIsOpenDetail: (value: boolean) => void;
    selectedProduct: ProductItem | null;
};

export default function ProductModals({
    isOpenDelete,
    setIsOpenDelete,
    modalDataDelete,
    handleDeleteProduct,
    isOpenDetail,
    setIsOpenDetail,
    selectedProduct,
}: Props) {
    return (
        <>
            <ModalDelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteProduct}
                title={modalDataDelete.title}
            />

            <DetailModal isOpen={isOpenDetail} onClose={() => setIsOpenDetail(false)} title="Product details" hideSave>
                {selectedProduct && <ProductDetail product={selectedProduct} />}
            </DetailModal>
        </>
    );
}
