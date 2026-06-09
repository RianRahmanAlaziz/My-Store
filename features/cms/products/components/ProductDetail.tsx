import {
    CheckCircle,
    XCircle,
    Star,
    Heart,
    TrendingUp,
    Package,
    Tag,
    Layers,
} from "lucide-react";

type ProductDetailProps = {
    product: any;
};

function formatRupiah(value: number | string) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const mainImage =
        product.image ||
        product.images?.find((img: any) => img.is_main)?.image ||
        product.images?.[0]?.image ||
        "/dist/images/preview-9.jpg";

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-4">
                    <div className="box p-4">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-64 rounded-lg object-cover"
                        />

                        <div className="grid grid-cols-4 gap-2 mt-3">
                            {product.images?.map((item: any) => (
                                <img
                                    key={item.id}
                                    src={item.image}
                                    alt={product.name}
                                    className="h-16 w-full rounded-md object-cover border"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-8">
                    <div className="box p-5 h-full">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800">
                                    {product.name}
                                </h2>
                                <div className="text-slate-500 text-sm mt-1">
                                    SKU: {product.sku ?? "-"} • Slug: {product.slug}
                                </div>
                            </div>

                            {product.is_active ? (
                                <div className="flex items-center text-success font-medium">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Active
                                </div>
                            ) : (
                                <div className="flex items-center text-danger font-medium">
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Inactive
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-12 gap-4 mt-6">
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 box border p-4">
                                <div className="flex items-center text-slate-500">
                                    <Tag className="w-4 h-4 mr-2" />
                                    Price
                                </div>
                                <div className="text-lg font-semibold mt-2">
                                    {formatRupiah(product.price)}
                                </div>
                                {product.original_price && (
                                    <div className="text-slate-400 line-through text-xs mt-1">
                                        {formatRupiah(product.original_price)}
                                    </div>
                                )}
                            </div>

                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 box border p-4">
                                <div className="flex items-center text-slate-500">
                                    <Star className="w-4 h-4 mr-2" />
                                    Rating
                                </div>
                                <div className="text-lg font-semibold mt-2">
                                    {product.rating ?? 0}/5
                                </div>
                                <div className="text-slate-400 text-xs mt-1">
                                    {product.reviews ?? 0} reviews
                                </div>
                            </div>

                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 box border p-4">
                                <div className="flex items-center text-slate-500">
                                    <Package className="w-4 h-4 mr-2" />
                                    Stock
                                </div>
                                <div className="text-lg font-semibold mt-2">
                                    {product.variants?.reduce(
                                        (total: number, item: any) =>
                                            total + Number(item.stock || 0),
                                        0
                                    )}
                                </div>
                                <div className="text-slate-400 text-xs mt-1">
                                    Total variant stock
                                </div>
                            </div>

                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 box border p-4">
                                <div className="flex items-center text-slate-500">
                                    <Layers className="w-4 h-4 mr-2" />
                                    Variants
                                </div>
                                <div className="text-lg font-semibold mt-2">
                                    {product.variants?.length ?? 0}
                                </div>
                                <div className="text-slate-400 text-xs mt-1">
                                    Size & color options
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 mt-5">
                            <div className="col-span-12 md:col-span-6">
                                <div className="text-slate-500 text-xs">Brand</div>
                                <div className="font-medium mt-1">
                                    {product.brand?.name ?? "-"}
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <div className="text-slate-500 text-xs">Category</div>
                                <div className="font-medium mt-1">
                                    {product.category?.name ?? "-"}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-5">
                            {product.is_new && (
                                <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                                    New Product
                                </span>
                            )}

                            {product.is_trending && (
                                <span className="px-3 py-1 rounded-full text-xs bg-warning/10 text-warning flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                </span>
                            )}

                            {product.is_best_seller && (
                                <span className="px-3 py-1 rounded-full text-xs bg-success/10 text-success">
                                    Best Seller
                                </span>
                            )}

                            {product.is_wishlisted && (
                                <span className="px-3 py-1 rounded-full text-xs bg-danger/10 text-danger flex items-center">
                                    <Heart className="w-3 h-3 mr-1" />
                                    Wishlisted
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="box p-5">
                <h3 className="font-semibold text-slate-800 mb-3">
                    Product Description
                </h3>
                <p className="text-slate-600 leading-relaxed">
                    {product.description ?? "-"}
                </p>
            </div>

            {/* Variants */}
            <div className="box p-5">
                <h3 className="font-semibold text-slate-800 mb-4">
                    Product Variants
                </h3>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>SIZE</th>
                                <th>COLOR</th>
                                <th className="text-center">STOCK</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.variants?.length > 0 ? (
                                product.variants.map((variant: any) => (
                                    <tr key={variant.id}>
                                        <td>{variant.size}</td>
                                        <td>{variant.color}</td>
                                        <td className="text-center">
                                            <span className="px-3 py-1 rounded-full text-xs bg-success/10 text-success">
                                                {variant.stock}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center text-slate-500">
                                        No variants available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sizes & Colors */}
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-6 box p-5">
                    <h3 className="font-semibold text-slate-800 mb-3">
                        Available Sizes
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {product.sizes?.map((size: string) => (
                            <span
                                key={size}
                                className="px-3 py-1 rounded-md border text-sm"
                            >
                                {size}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="col-span-12 md:col-span-6 box p-5">
                    <h3 className="font-semibold text-slate-800 mb-3">
                        Available Colors
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {product.colors?.map((color: string) => (
                            <span
                                key={color}
                                className="px-3 py-1 rounded-md border text-sm"
                            >
                                {color}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}