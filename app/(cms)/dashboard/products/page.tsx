"use client";

import {
    ChevronsLeft,
    ChevronsRight,
    ChevronLeft,
    ChevronRight,
    LoaderCircle,
    CheckSquare,
    Edit,
    Plus,
    Search,
    Trash2,
} from "lucide-react";

import Modal from "@/components/cms/common/Modal";
import ModalDelete from "@/components/cms/common/ModalDelete";
import InputProduct from "@/features/cms/products/components/InputProduct";
import useProducts from "@/features/cms/products/hooks/useProducts";
import { motion } from "motion/react";

function formatRupiah(value: number | string) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

export default function ProductsPage() {
    const {
        isOpen,
        isOpenDelete,
        products,
        loading,
        saving,
        deleting,
        searchTerm,
        setSearchTerm,
        pagination,
        modalData,
        modalDataDelete,
        formData,
        setFormData,
        errors,
        setErrors,
        setIsOpen,
        setIsOpenDelete,
        handlePageChange,
        handleSaveProduct,
        openAddProductModal,
        openEditProductModal,
        openModalDelete,
        handleDeleteProduct,
    } = useProducts();

    console.log(products.length);

    return (
        <>
            <h2 className="intro-y text-lg font-medium sm:pt-24">Products Management</h2>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        onClick={openAddProductModal}
                        className="btn btn-primary shadow-lg mr-2">
                        <Plus className='pr-1.5' /> Product
                    </button>
                    <div className="hidden md:block mx-auto text-slate-500" />

                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <input
                                type="text"
                                className="form-control w-56 box pr-10"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setSearchTerm(e.target.value)
                                }
                            />
                            <i
                                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                                data-lucide="search"
                            />
                        </div>
                    </div>
                </div>

                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    <table className="table table-report -mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">Product</th>
                                <th className="whitespace-nowrap">Brand</th>
                                <th className="whitespace-nowrap">Category</th>
                                <th className="whitespace-nowrap">Variants</th>
                                <th className="whitespace-nowrap">Price</th>
                                <th className="whitespace-nowrap">Status</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="py-6">
                                        <div className="flex justify-center items-center">
                                            <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                                        </div>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-4">
                                        Tidak ada data product
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => {
                                    const variantCount =
                                        product.variants?.length ?? 0;

                                    const totalStock =
                                        product.variants?.reduce(
                                            (sum, variant) =>
                                                sum + Number(variant.stock || 0),
                                            0
                                        ) ?? 0;

                                    const isActive =
                                        product.status === "active" ||
                                        product.status === "published" ||
                                        product.status === undefined;

                                    return (
                                        <motion.tr
                                            key={product.id}
                                            whileHover={{ scale: 1.02 }}
                                            className="border-b last:border-b-0"
                                        >
                                            <td>
                                                <span className="font-medium whitespace-nowrap">
                                                    {product.name}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex items-center">
                                                    {product.brand?.name ?? "-"}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center">
                                                    {product.category?.name ?? "-"}
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 text-slate-600">
                                                {variantCount} variants
                                                <span className="ml-1 text-xs text-slate-400">
                                                    / {totalStock} stock
                                                </span>
                                            </td>

                                            <td>
                                                <div className="flex items-center">
                                                    {formatRupiah(product.price)}
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${isActive
                                                        ? "bg-success/20 text-success"
                                                        : "bg-slate-200 text-slate-500"
                                                        }`}
                                                >
                                                    {product.status ?? "active"}
                                                </span>
                                            </td>

                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button type="button" onClick={() => openEditProductModal(product)}
                                                        className="flex items-center mr-3 "
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </button>
                                                    <button type="button" onClick={() => openModalDelete(product)}
                                                        className="flex items-center mr-3 text-red-500"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-1" /> Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="intro-y col-span-12 flex justify-center items-center mt-5">
                    <nav className="w-auto">
                        <ul className="pagination">
                            <li className="page-item">
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => handlePageChange(1)}
                                    disabled={pagination.current_page === 1}
                                >
                                    <ChevronsLeft className="w-4 h-4" />
                                </button>
                            </li>

                            <li className="page-item">
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => handlePageChange(pagination.current_page - 1)}
                                    disabled={pagination.current_page === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            </li>

                            {Array.from({ length: pagination.last_page }).map((_, i) => (
                                <li
                                    key={i}
                                    className={`page-item ${pagination.current_page === i + 1 ? "active" : ""
                                        }`}
                                >
                                    <button
                                        type="button"
                                        className="page-link"
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li className="page-item">
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => handlePageChange(pagination.current_page + 1)}
                                    disabled={pagination.current_page === pagination.last_page}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </li>

                            <li className="page-item">
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => handlePageChange(pagination.last_page)}
                                    disabled={pagination.current_page === pagination.last_page}
                                >
                                    <ChevronsRight className="w-4 h-4" />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div >



            {/* <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
                onSave={handleSaveProduct}
                isLoading={saving}
            >
                <InputProduct
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                />
            </Modal>

            <ModalDelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteProduct}
                title={modalDataDelete.title}
                isLoading={deleting}
            /> */}
        </>
    );
}