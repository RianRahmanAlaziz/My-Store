"use client";

import React, { useEffect } from "react";
import {
    CheckSquare,
    ChevronLeft,
    ChevronsLeft,
    ChevronRight,
    ChevronsRight,
    LoaderCircle,
    Trash2,
    Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import useCategories from "@/features/cms/categories/hooks/useCategories";
import Modal from "@/components/cms/common/Modal";
import InputCategories from "@/features/cms/categories/components/InputCategories";
import Modaldelete from "@/components/cms/common/ModalDelete";

export default function CategoriesPage() {

    const {
        isOpen,
        isOpenDelete,
        categories,
        loading,
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
        handleSaveCategories,
        openAddCategoriesModal,
        openEditCategoryModal,
        openModalDelete,
        handleDeleteCategories,
    } = useCategories();

    return (
        <>
            <h2 className="intro-y text-lg font-medium sm:pt-24">Categories Management</h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        type="button"
                        onClick={openAddCategoriesModal}
                        className="btn btn-primary shadow-lg">
                        <Plus className='pr-1.5' /> Category
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
                                <th className="whitespace-nowrap">NAME</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="py-6">
                                        <div className="flex justify-center items-center">
                                            <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                                        </div>
                                    </td>
                                </tr>
                            ) : categories.length > 0 ? (
                                [...categories]
                                    .filter(
                                        (u) =>
                                            u.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => {
                                        const da = a.created_at ? new Date(a.created_at).getTime() : 0;
                                        const db = b.created_at ? new Date(b.created_at).getTime() : 0;
                                        return da - db;
                                    })
                                    .map((u) => (
                                        <motion.tr key={u.id} whileHover={{ scale: 1.02 }}>

                                            <td>
                                                <div className="font-medium whitespace-nowrap">{u.name}</div>
                                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{u.slug}</div>
                                            </td>

                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditCategoryModal(u)}
                                                        className="flex items-center mr-3 "
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => openModalDelete(u)}
                                                        className="flex items-center mr-3 text-red-500"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-1" /> Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-4">
                                        Tidak ada data Categoires yang ditemukan.
                                    </td>
                                </tr>
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

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
                onSave={handleSaveCategories}
            >
                <InputCategories
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
    )
}
