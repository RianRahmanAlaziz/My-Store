"use client";

import Link from "next/link";
import {
    ArrowLeftRight,
    Bookmark,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Eye,
    FileText,
    LoaderCircle,
    Search,
} from "lucide-react";
import useOrders from "@/features/cms/orders/hooks/useOrders";

function formatRupiah(value: number | string) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

function getStatusClass(status: string) {
    switch (status) {
        case "completed":
        case "delivered":
        case "paid":
            return "text-success";
        case "cancelled":
        case "failed":
            return "text-danger";
        case "pending":
        case "waiting_payment":
        case "unpaid":
            return "text-warning";
        default:
            return "text-primary";
    }
}

export default function OrdersPage() {
    const {
        orders,
        loading,
        searchTerm,
        setSearchTerm,
        orderStatus,
        setOrderStatus,
        pagination,
        handlePageChange,
    } = useOrders();

    return (
        <>
            <h2 className="intro-y text-lg font-medium sm:pt-24">
                Orders Management
            </h2>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                    <div className="flex w-full sm:w-auto">
                        <div className="w-48 relative text-slate-500">
                            <input
                                type="text"
                                className="form-control w-48 box pr-10"
                                placeholder="Search by invoice..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
                        </div>

                        <select
                            className="form-select box ml-2"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                        >
                            <option value="">Status</option>
                            <option value="waiting_payment">Waiting Payment</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="packing">Packing</option>
                            <option value="delivered">Delivered</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="hidden xl:block mx-auto text-slate-500">
                        Showing {orders.length > 0 ? 1 : 0} to {orders.length} of{" "}
                        {pagination.total} entries
                    </div>

                </div>

                <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
                    <table className="table table-report -mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">
                                    <input className="form-check-input" type="checkbox" />
                                </th>
                                <th className="whitespace-nowrap">INVOICE</th>
                                <th className="whitespace-nowrap">BUYER NAME</th>
                                <th className="text-center whitespace-nowrap">STATUS</th>
                                <th className="whitespace-nowrap">PAYMENT</th>
                                <th className="text-right whitespace-nowrap">
                                    <div className="pr-16">TOTAL TRANSACTION</div>
                                </th>
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
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-4">
                                        Tidak ada data order
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="intro-x">
                                        <td className="w-10">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                            />
                                        </td>

                                        <td className="w-40 !py-4">
                                            <Link
                                                href={`/dashboard/orders/${order.id}`}
                                                className="underline decoration-dotted whitespace-nowrap"
                                            >
                                                #{order.invoice_number}
                                            </Link>
                                        </td>

                                        <td className="w-40">
                                            <div className="font-medium whitespace-nowrap">
                                                {order.user?.name ?? "-"}
                                            </div>
                                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                                {order.address?.city ?? "-"},{" "}
                                                {order.address?.province ?? "-"}
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <div
                                                className={`flex items-center justify-center whitespace-nowrap ${getStatusClass(
                                                    order.order_status
                                                )}`}
                                            >
                                                <CheckSquare className="w-4 h-4 mr-2" />
                                                {order.order_status}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="whitespace-nowrap">
                                                {order.payment_method}
                                            </div>
                                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                                {order.payment_status}
                                            </div>
                                        </td>

                                        <td className="w-40 text-left">
                                            <div className="pr-16">
                                                {formatRupiah(order.total)}
                                            </div>
                                        </td>

                                        <td className="table-report__action">
                                            <div className="flex justify-center items-center">
                                                <Link
                                                    className="flex items-center text-primary whitespace-nowrap mr-5"
                                                    href={`/dashboard/orders/${order.id}`}
                                                >
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View Details
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="flex items-center text-primary whitespace-nowrap"
                                                >
                                                    <ArrowLeftRight className="w-4 h-4 mr-1" />
                                                    Change Status
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                    <nav className="w-full sm:w-auto sm:mr-auto">
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
                                    onClick={() =>
                                        handlePageChange(pagination.current_page - 1)
                                    }
                                    disabled={pagination.current_page === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            </li>

                            {Array.from({ length: pagination.last_page }).map(
                                (_, index) => {
                                    const page = index + 1;

                                    return (
                                        <li
                                            key={page}
                                            className={`page-item ${pagination.current_page === page
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            <button
                                                type="button"
                                                className="page-link"
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    );
                                }
                            )}

                            <li className="page-item">
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() =>
                                        handlePageChange(pagination.current_page + 1)
                                    }
                                    disabled={
                                        pagination.current_page === pagination.last_page
                                    }
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </li>

                            <li className="page-item">
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() =>
                                        handlePageChange(pagination.last_page)
                                    }
                                    disabled={
                                        pagination.current_page === pagination.last_page
                                    }
                                >
                                    <ChevronsRight className="w-4 h-4" />
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <select className="w-20 form-select box mt-3 sm:mt-0" disabled>
                        <option>{pagination.per_page}</option>
                    </select>
                </div>
            </div>
        </>
    );
}