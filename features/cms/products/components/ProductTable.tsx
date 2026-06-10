import Link from "next/link";
import { Edit, Eye, LoaderCircle, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import type { ProductItem } from "../types/product";
import { formatRupiah, getProductStatus } from "../utils/productHelpers";
import ProductImagesStack from "./ProductImagesStack";
import ProductStatusBadge from "./ProductStatusBadge";

type Props = {
    products: ProductItem[];
    loading: boolean;
    openDetailModal: (product: ProductItem) => void;
    openModalDelete: (product: ProductItem) => void;
};

export default function ProductTable({ products, loading, openDetailModal, openModalDelete }: Props) {
    return (
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table className="table table-report -mt-2">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap">IMAGES</th>
                        <th className="whitespace-nowrap">PRODUCT NAME</th>
                        <th className="text-center whitespace-nowrap">BRAND</th>
                        <th className="text-center whitespace-nowrap">CATEGORY</th>
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
                        products.map((product) => (
                            <motion.tr key={product.id} whileHover={{ scale: 1.02 }} className="border-b last:border-b-0">
                                <td className="w-40">
                                    <ProductImagesStack images={product.images} productName={product.name} />
                                </td>

                                <td>
                                    <div className="font-medium whitespace-nowrap">{product.name}</div>
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">SKU : {product.sku ?? "-"}</div>
                                </td>

                                <td className="text-center">{product.brand?.name ?? "-"}</td>
                                <td className="text-center">{product.category?.name ?? "-"}</td>
                                <td className="text-center">{formatRupiah(product.price)}</td>
                                <td className="w-40"><ProductStatusBadge active={getProductStatus(product)} /></td>

                                <td className="table-report__action w-56">
                                    <div className="flex justify-center items-center gap-3">
                                        <button type="button" onClick={() => openDetailModal(product)} className="flex items-center text-primary">
                                            <Eye className="w-4 h-4 mr-1" />
                                            Detail
                                        </button>

                                        <Link href={`/dashboard/products/${product.slug}/edit`} className="flex items-center">
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
                                        </Link>

                                        <button type="button" onClick={() => openModalDelete(product)} className="flex items-center text-danger">
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
