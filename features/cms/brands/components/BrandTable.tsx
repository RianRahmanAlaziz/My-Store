import { CheckSquare, LoaderCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { BrandItem } from "../types/brand";

type Props = {
    brands: BrandItem[];
    loading: boolean;
    openEditModal: (brand: BrandItem) => void;
    openModalDelete: (brand: BrandItem) => void;
};

export default function BrandTable({
    brands,
    loading,
    openEditModal,
    openModalDelete,
}: Props) {
    return (
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
                            <td colSpan={2} className="py-6">
                                <div className="flex justify-center items-center">
                                    <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                                </div>
                            </td>
                        </tr>
                    ) : brands.length > 0 ? (
                        brands.map((brand) => (
                            <motion.tr key={brand.id} whileHover={{ scale: 1.02 }}>
                                <td>
                                    <div className="font-medium whitespace-nowrap">
                                        {brand.name}
                                    </div>
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        {brand.slug}
                                    </div>
                                </td>

                                <td className="table-report__action w-56">
                                    <div className="flex justify-center items-center">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(brand)}
                                            className="flex items-center mr-3"
                                        >
                                            <CheckSquare className="w-4 h-4 mr-1" />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => openModalDelete(brand)}
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
                                Tidak ada data brand yang ditemukan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}