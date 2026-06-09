"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";
import type { OrderItemType, Pagination } from "../types/order";

const DEFAULT_PAGINATION: Pagination = {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
};

function normalizeOrdersResponse(response: any) {
    const payload = response?.data;

    const orders = Array.isArray(payload?.data) ? payload.data : [];

    const meta = payload?.meta ?? null;

    return {
        orders,
        pagination: {
            current_page: Number(meta?.current_page ?? 1),
            last_page: Number(meta?.last_page ?? 1),
            per_page: Number(meta?.per_page ?? 10),
            total: Number(meta?.total ?? orders.length),
        },
    };
}

export default function useOrders() {
    const [orders, setOrders] = useState<OrderItemType[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    const [pagination, setPagination] =
        useState<Pagination>(DEFAULT_PAGINATION);

    const fetchOrders = async (
        page: number = 1,
        search: string = ""
    ): Promise<void> => {
        try {
            setLoading(true);

            const response = await axiosInstance.get("/admin/orders", {
                params: {
                    page,
                    search: searchTerm,
                    order_status: orderStatus || undefined,
                    payment_status: paymentStatus || undefined,
                },
            });

            const normalized = normalizeOrdersResponse(response);

            setOrders(normalized.orders);
            setPagination(normalized.pagination);
        } catch (error) {
            console.error("Gagal mengambil data orders:", error);
            toast.error("Gagal mengambil data orders");
            setOrders([]);
            setPagination(DEFAULT_PAGINATION);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            void fetchOrders(1);
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [searchTerm, orderStatus, paymentStatus]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > pagination.last_page) return;

        void fetchOrders(page);
    };

    return {
        orders,
        loading,
        searchTerm,
        setSearchTerm,
        orderStatus,
        setOrderStatus,
        paymentStatus,
        setPaymentStatus,
        pagination,
        fetchOrders,
        handlePageChange,
    };
}