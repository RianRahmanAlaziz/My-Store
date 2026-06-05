"use client";

import { Check, CreditCard, MapPin } from "lucide-react";
import type { CheckoutStep } from "@/features/main/checkout/types/checkout";

const steps = [
    { number: 1, title: "Shipping", icon: MapPin },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Confirmation", icon: Check },
];

export function CheckoutSteps({ step }: { step: CheckoutStep }) {
    return (
        <div className="mb-12 flex justify-center">
            <div className="flex items-center gap-3 md:gap-4">
                {steps.map((item, index) => (
                    <div key={item.number} className="flex items-center">
                        <div
                            className={`flex items-center gap-3 ${item.number === step
                                ? "text-[var(--accent)]"
                                : item.number < step
                                    ? "text-[var(--success)]"
                                    : "text-[var(--muted-foreground)]"
                                }`}
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.number === step
                                    ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                                    : item.number < step
                                        ? "bg-[var(--success)] text-[var(--success-foreground)]"
                                        : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                                    }`}
                            >
                                {item.number < step ? (
                                    <Check className="h-6 w-6" />
                                ) : (
                                    <item.icon className="h-6 w-6" />
                                )}
                            </div>

                            <span className="hidden font-semibold text-[var(--muted)] sm:block">
                                {item.title}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="mx-3 h-0.5 w-10 bg-[var(--border)] md:mx-4 md:w-16" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}