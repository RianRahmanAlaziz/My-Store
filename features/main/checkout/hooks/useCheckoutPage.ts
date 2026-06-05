"use client";

import { useState } from "react";
import type {
    CheckoutStep,
    PaymentMethod,
    ProvinceOption,
} from "@/features/main/checkout/types/checkout";
import { useCartStore } from "@/features/main/cart/stores/useCartStore";

export function useCheckoutPage() {
    const [step, setStep] = useState<CheckoutStep>(1);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris");
    const [province, setProvince] = useState<ProvinceOption | null>(null);

    const orderItems = useCartStore((state) => state.items);
    const summary = useCartStore((state) => state.summary);

    const provinceOptions: ProvinceOption[] = [
        { value: "dki-jakarta", label: "DKI Jakarta" },
        { value: "jawa-barat", label: "Jawa Barat" },
        { value: "jawa-tengah", label: "Jawa Tengah" },
        { value: "jawa-timur", label: "Jawa Timur" },
    ];

    return {
        step,
        setStep,
        paymentMethod,
        setPaymentMethod,
        province,
        setProvince,
        provinceOptions,
        orderItems,
        summary,
    };
}