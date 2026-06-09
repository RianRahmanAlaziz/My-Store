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
    Eye,
} from "lucide-react";

import Image from "next/image";
import { getImageUrl } from "@/lib/image";
import ModalDelete from "@/components/cms/common/ModalDelete";
import useProducts from "@/features/cms/products/hooks/useProducts";
import { motion } from "motion/react";
import Link from "next/link";
import DetailModal from "@/components/cms/common/DetailModal";
import ProductDetail from "@/features/cms/products/components/ProductDetail";

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
        openDetailModal,
        selectedProduct,
        isOpenDetail,
        setIsOpenDetail,
    } = useProducts();


    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-7 sm:pt-24">Products Management</h2>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <Link
                        href="/dashboard/products/create"
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Link>
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
                                <th className="whitespace-nowrap">IMAGES</th>
                                <th className="whitespace-nowrap">PRODUCT NAME</th>
                                <th className="text-center whitespace-nowrap">BRAND</th>
                                <th className="text-center whitespace-nowrap">  CATEGORY</th>
                                <th className="text-center whitespace-nowrap">PRICE</th>
                                <th className="text-center whitespace-nowrap">STATUS</th>
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
                                            <td className="w-40">
                                                <div className="flex">
                                                    {product.images?.slice(0, 3).map((image, index) => (
                                                        <div
                                                            key={image.id}
                                                            className={`relative h-10 w-10 overflow-hidden rounded-full border-2 border-white zoom-in ${index > 0 ? "-ml-5" : ""
                                                                }`}
                                                        >
                                                            <Image
                                                                src={getImageUrl(image.image)}
                                                                alt={product.name}
                                                                fill
                                                                sizes="40px"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}

                                                    {(product.images?.length ?? 0) > 3 && (
                                                        <div className="relative -ml-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-semibold text-slate-600">
                                                            +{(product.images?.length ?? 0) - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            <td>
                                                <div className="font-medium whitespace-nowrap">
                                                    {product.name}
                                                </div>
                                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                                    SKU : {product.sku}
                                                </div>
                                            </td>

                                            <td className="text-center">
                                                {product.brand?.name ?? "-"}
                                            </td>
                                            <td className="text-center">
                                                {product.category?.name ?? "-"}
                                            </td>

                                            <td className="text-center">
                                                {formatRupiah(product.price)}
                                            </td>

                                            <td className="w-40">
                                                {isActive ? (
                                                    <div className="flex items-center justify-center text-primary">
                                                        <CheckSquare className="mr-2 h-4 w-4" />
                                                        Active
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center text-danger">
                                                        <CheckSquare className="mr-2 h-4 w-4" />
                                                        Inactive
                                                    </div>
                                                )}
                                            </td>

                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => openDetailModal(product)}
                                                        className="flex items-center mr-3 text-success"
                                                        title="Detail"
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Detail
                                                    </button>
                                                    <Link
                                                        href={`/dashboard/products/${product.slug}/edit`}
                                                        className="flex items-center mr-3 "
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </Link>
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

            <DetailModal
                isOpen={isOpenDetail}
                onClose={() => setIsOpenDetail(false)}
                title="Product details"
                hideSave
            >
                {selectedProduct && <ProductDetail product={selectedProduct} />}
            </DetailModal>

            <ModalDelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteProduct}
                title={modalDataDelete.title}
            />
        </>
    );
}