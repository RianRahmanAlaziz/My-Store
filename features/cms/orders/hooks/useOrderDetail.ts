"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";
import type { OrderItemType } from "../types/order";

export default function useOrderDetail(orderId: string) {
    const [order, setOrder] = useState<OrderItemType | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchOrder = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.get(`/admin/orders/${orderId}`);

            setOrder(response.data?.data ?? response.data);
        } catch (error) {
            console.error("Gagal mengambil detail order:", error);
            toast.error("Gagal mengambil detail order");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!orderId) return;

        void fetchOrder();
    }, [orderId]);

    const updateOrderStatus = async (status: string) => {
        try {
            setUpdating(true);

            await axiosInstance.patch(`/admin/orders/${orderId}/status`, {
                order_status: status,
            });

            toast.success("Status order berhasil diperbarui");

            await fetchOrder();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                "Gagal memperbarui status order"
            );
        } finally {
            setUpdating(false);
        }
    };

    const updatePaymentStatus = async (status: string) => {
        try {
            setUpdating(true);

            await axiosInstance.patch(`/admin/orders/${orderId}/payment-status`, {
                payment_status: status,
            });

            toast.success("Status pembayaran berhasil diperbarui");

            await fetchOrder();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                "Gagal memperbarui status pembayaran"
            );
        } finally {
            setUpdating(false);
        }
    };

    return {
        order,
        loading,
        updating,
        fetchOrder,
        updateOrderStatus,
        updatePaymentStatus,
    };
}