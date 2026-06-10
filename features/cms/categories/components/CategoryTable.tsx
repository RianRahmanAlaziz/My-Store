import { CheckSquare, LoaderCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { CategoryItem } from "../types/category";

type Props = {
    categories: CategoryItem[];
    loading: boolean;
    openEditModal: (category: CategoryItem) => void;
    openDeleteModal: (category: CategoryItem) => void;
};

export default function CategoryTable({
    categories,
    loading,
    openEditModal,
    openDeleteModal,
}: Props) {
    return (
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table className="table table-report -mt-2">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap">NAME</th>
                        <th className="text-center whitespace-nowrap">
                            ACTIONS
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={2} className="py-6">
                                <div className="flex justify-center items-center">
                                    <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                                </div>
                            </td>
                        </tr>
                    ) : categories.length > 0 ? (
                        categories.map((category) => (
                            <motion.tr
                                key={category.id}
                                whileHover={{ scale: 1.02 }}
                            >
                                <td>
                                    <div className="font-medium whitespace-nowrap">
                                        {category.name}
                                    </div>
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        {category.slug}
                                    </div>
                                </td>

                                <td className="table-report__action w-56">
                                    <div className="flex justify-center items-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(category)
                                            }
                                            className="flex items-center mr-3"
                                        >
                                            <CheckSquare className="w-4 h-4 mr-1" />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openDeleteModal(category)
                                            }
                                            className="flex items-center mr-3 text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} className="text-center py-4">
                                Tidak ada data categories yang ditemukan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}