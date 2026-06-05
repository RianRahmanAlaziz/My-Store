"use client";

import Select, { SingleValue } from "react-select";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { CheckoutInput } from "@/features/main/checkout/components/CheckoutInput";
import type {
    CheckoutStep,
    ProvinceOption,
} from "@/features/main/checkout/types/checkout";

export function ShippingForm({
    province,
    provinceOptions,
    setProvince,
    setStep,
}: {
    province: ProvinceOption | null;
    provinceOptions: ProvinceOption[];
    setProvince: (value: ProvinceOption | null) => void;
    setStep: (step: CheckoutStep) => void;
}) {
    const handleProvinceChange = (option: SingleValue<ProvinceOption>) => {
        setProvince(option);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8"
        >
            <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
                Shipping Address
            </h2>

            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <CheckoutInput placeholder="First Name" />
                    <CheckoutInput placeholder="Last Name" />
                </div>

                <CheckoutInput placeholder="Email Address" type="email" />
                <CheckoutInput placeholder="Phone Number" type="tel" />
                <CheckoutInput placeholder="Street Address" />

                <div className="grid grid-cols-2 gap-4">
                    <CheckoutInput placeholder="City" />
                    <CheckoutInput placeholder="Postal Code" />
                </div>

                <Select
                    options={provinceOptions}
                    value={province}
                    onChange={handleProvinceChange}
                    placeholder="Select Province"
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            minHeight: "48px",
                            borderRadius: "12px",
                            borderColor: state.isFocused ? "var(--accent)" : "var(--border)",
                            backgroundColor: "var(--input-background)",
                            boxShadow: "none",
                            "&:hover": {
                                borderColor: "var(--accent)",
                            },
                        }),
                        menu: (base) => ({
                            ...base,
                            borderRadius: "12px",
                            overflow: "hidden",
                            backgroundColor: "var(--card)",
                            zIndex: 999,
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected
                                ? "var(--accent)"
                                : state.isFocused
                                    ? "var(--secondary)"
                                    : "var(--card)",
                            color: state.isSelected
                                ? "var(--accent-foreground)"
                                : "var(--foreground)",
                            cursor: "pointer",
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: "var(--foreground)",
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: "var(--muted-foreground)",
                        }),
                    }}
                />

                <div className="pt-4">
                    <Button size="lg" className="w-full" onClick={() => setStep(2)}>
                        Continue to Payment
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}