"use client";

import Link from "next/link";
import {
    ArrowLeft,
    CheckSquare,
    LoaderCircle,
    Package,
    Truck,
    User,
    Wallet,
} from "lucide-react";
import useOrderDetail from "../hooks/useOrderDetail";
import OrderStatusBadge from "./OrderStatusBadge";

type Props = {
    orderId: string;
};

function formatRupiah(value: number | string) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

export default function OrderDetailPage({ orderId }: Props) {
    const {
        order,
        loading,
        updating,
        updateOrderStatus,
        updatePaymentStatus,
    } = useOrderDetail(orderId);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <LoaderCircle className="h-8 w-8 animate-spin text-slate-500" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="intro-y box mt-10 p-8 text-center">
                <p className="text-slate-500">Order tidak ditemukan.</p>
                <Link href="/dashboard/orders" className="btn btn-primary mt-4">
                    Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="intro-y flex items-center mt-8 sm:pt-15">
                <div>
                    <h2 className="text-lg font-medium">
                        Order Detail
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        #{order.invoice_number}
                    </p>
                </div>

                <Link
                    href="/dashboard/orders"
                    className="btn btn-outline-secondary ml-auto"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Link>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 lg:col-span-8">
                    <div className="box p-5">
                        <div className="flex items-center border-b border-slate-200 pb-4">
                            <Package className="w-5 h-5 mr-2 text-primary" />
                            <h3 className="font-medium">Order Items</h3>
                        </div>

                        <div className="mt-5 overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>PRODUCT</th>
                                        <th>VARIANT</th>
                                        <th className="text-center">QTY</th>
                                        <th className="text-right">PRICE</th>
                                        <th className="text-right">SUBTOTAL</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order.items?.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="font-medium">
                                                    {item.product_name ?? "-"}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-slate-500 text-sm">
                                                    Size: {item.variant_size ?? "-"} / Color:{" "}
                                                    {item.variant_color ?? "-"}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="text-right">
                                                {formatRupiah(item.price)}
                                            </td>
                                            <td className="text-right font-medium">
                                                {formatRupiah(item.subtotal)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 ml-auto max-w-sm space-y-3 border-t pt-5">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span>{formatRupiah(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Shipping</span>
                                <span>{formatRupiah(order.shipping_cost)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Discount</span>
                                <span>{formatRupiah(order.discount)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-3 text-lg font-bold">
                                <span>Total</span>
                                <span>{formatRupiah(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="box mt-5 p-5">
                        <div className="flex items-center border-b border-slate-200 pb-4">
                            <Truck className="w-5 h-5 mr-2 text-primary" />
                            <h3 className="font-medium">Shipping Address</h3>
                        </div>

                        <div className="mt-5 text-sm text-slate-600 leading-7">
                            <p className="font-medium text-slate-800">
                                {order.address?.receiver_name ?? "-"}
                            </p>
                            <p>{order.address?.phone ?? "-"}</p>
                            <p>{order.address?.address ?? "-"}</p>
                            <p>
                                {order.address?.district ?? "-"},{" "}
                                {order.address?.city ?? "-"},{" "}
                                {order.address?.province ?? "-"}{" "}
                                {order.address?.postal_code ?? ""}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="intro-y col-span-12 lg:col-span-4">
                    <div className="box p-5">
                        <div className="flex items-center border-b border-slate-200 pb-4">
                            <CheckSquare className="w-5 h-5 mr-2 text-primary" />
                            <h3 className="font-medium">Status</h3>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div>
                                <p className="mb-2 text-sm text-slate-500">
                                    Order Status
                                </p>
                                <OrderStatusBadge status={order.order_status} />

                                <select
                                    className="form-select mt-3"
                                    value={order.order_status}
                                    disabled={updating}
                                    onChange={(e) =>
                                        updateOrderStatus(e.target.value)
                                    }
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-slate-500">
                                    Payment Status
                                </p>
                                <OrderStatusBadge status={order.payment_status} />

                                <select
                                    className="form-select mt-3"
                                    value={order.payment_status}
                                    disabled={updating}
                                    onChange={(e) =>
                                        updatePaymentStatus(e.target.value)
                                    }
                                >
                                    <option value="unpaid">Unpaid</option>
                                    <option value="paid">Paid</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="box mt-5 p-5">
                        <div className="flex items-center border-b border-slate-200 pb-4">
                            <User className="w-5 h-5 mr-2 text-primary" />
                            <h3 className="font-medium">Customer</h3>
                        </div>

                        <div className="mt-5 text-sm leading-7">
                            <p className="font-medium text-slate-800">
                                {order.user?.name ?? "-"}
                            </p>
                            <p className="text-slate-500">
                                {order.user?.email ?? "-"}
                            </p>
                        </div>
                    </div>

                    <div className="box mt-5 p-5">
                        <div className="flex items-center border-b border-slate-200 pb-4">
                            <Wallet className="w-5 h-5 mr-2 text-primary" />
                            <h3 className="font-medium">Payment</h3>
                        </div>

                        <div className="mt-5 text-sm leading-7">
                            <p>
                                <span className="text-slate-500">
                                    Method:
                                </span>{" "}
                                {order.payment_method}
                            </p>
                            <p>
                                <span className="text-slate-500">
                                    Status:
                                </span>{" "}
                                {order.payment_status}
                            </p>
                            <p>
                                <span className="text-slate-500">
                                    Created:
                                </span>{" "}
                                {new Date(order.created_at).toLocaleString(
                                    "id-ID"
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}