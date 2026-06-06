"use client";

import { CreditCard, Package, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/main/ui/Button";
import { CheckoutInput } from "@/features/main/checkout/components/CheckoutInput";
import { PaymentOption } from "@/features/main/checkout/components/PaymentOption";
import type {
    CheckoutStep,
    PaymentMethod,
} from "@/features/main/checkout/types/checkout";

export function PaymentForm({
    paymentMethod,
    setPaymentMethod,
    setStep,
}: {
    paymentMethod: PaymentMethod;
    setPaymentMethod: (method: PaymentMethod) => void;
    setStep: (step: CheckoutStep) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8"
        >
            <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
                Payment Method
            </h2>

            <div className="mb-6 space-y-4">
                <PaymentOption
                    active={paymentMethod === "qris"}
                    onClick={() => setPaymentMethod("qris")}
                    icon={<Smartphone className="h-6 w-6" />}
                    title="QRIS"
                    subtitle="Scan with any e-wallet"
                />

                <PaymentOption
                    active={paymentMethod === "card"}
                    onClick={() => setPaymentMethod("card")}
                    icon={<CreditCard className="h-6 w-6" />}
                    title="Credit/Debit Card"
                    subtitle="Visa, Mastercard, JCB"
                />

                <PaymentOption
                    active={paymentMethod === "cod"}
                    onClick={() => setPaymentMethod("cod")}
                    icon={<Package className="h-6 w-6" />}
                    title="Cash on Delivery"
                    subtitle="Pay when you receive"
                />
            </div>

            {paymentMethod === "card" && (
                <div className="mb-6 space-y-4 rounded-2xl bg-[var(--muted)]/30 p-6">
                    <CheckoutInput placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-4">
                        <CheckoutInput placeholder="MM/YY" />
                        <CheckoutInput placeholder="CVV" />
                    </div>
                    <CheckoutInput placeholder="Cardholder Name" />
                </div>
            )}

            <div className="flex gap-4">
                <Button size="lg" variant="outline" onClick={() => setStep(1)}>
                    Back
                </Button>

                <Button size="lg" className="w-full" onClick={() => setStep(3)}>
                    Complete Order
                </Button>
            </div>
        </motion.div>
    );
}