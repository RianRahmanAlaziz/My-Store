"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/features/main/checkout/utils/formatPrice";
import type { PaymentMethod } from "@/features/main/checkout/types/checkout";

export function ConfirmationStep({
    paymentMethod,
    total,
}: {
    paymentMethod: PaymentMethod;
    total: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-center md:p-8"
        >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--success)] text-[var(--success-foreground)]">
                <Check className="h-10 w-10" />
            </div>

            <h2 className="mb-4 text-3xl font-bold text-[var(--foreground)]">
                Order Confirmed!
            </h2>

            <p className="mb-2 text-[var(--muted)]">
                Order Number:{" "}
                <span className="font-semibold text-[var(--foreground)]">
                    #SH-2026-0525-001
                </span>
            </p>

            <p className="mb-8 text-[var(--muted)]">
                We've sent a confirmation email to your inbox
            </p>

            {paymentMethod === "qris" && (
                <div className="mb-8 rounded-2xl bg-[var(--muted)]/30 p-8">
                    <p className="mb-4 text-sm text-[var(--muted)]">
                        Scan this QR code to complete payment
                    </p>

                    <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-2xl bg-white">
                        <div className="text-center">
                            <div className="mx-auto mb-2 h-48 w-48 rounded-xl bg-black/5" />
                            <p className="text-xs text-slate-500">QRIS Payment</p>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-[var(--muted)]">
                        Total:{" "}
                        <span className="text-lg font-bold text-[var(--foreground)]">
                            {formatPrice(total)}
                        </span>
                    </p>
                </div>
            )}

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg">Track Order</Button>

                <Link href="/catalog">
                    <Button size="lg" variant="outline">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}