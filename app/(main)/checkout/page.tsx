"use client";

import { CheckoutSteps } from "@/features/main/checkout/components/CheckoutSteps";
import { ShippingForm } from "@/features/main/checkout/components/ShippingForm";
import { PaymentForm } from "@/features/main/checkout/components/PaymentForm";
import { ConfirmationStep } from "@/features/main/checkout/components/ConfirmationStep";
import { CheckoutSummary } from "@/features/main/checkout/components/CheckoutSummary";
import { useCheckoutPage } from "@/features/main/checkout/hooks/useCheckoutPage";

export default function CheckoutPage() {
    const {
        step,
        setStep,
        paymentMethod,
        setPaymentMethod,
        province,
        setProvince,
        provinceOptions,
        orderItems,
        summary,
    } = useCheckoutPage();

    const subtotal = summary.subtotal;
    const shipping = summary.shipping;
    const total = summary.total;

    return (
        <main className="min-h-screen bg-[var(--background)]">
            <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/90 py-12 text-[var(--primary-foreground)]">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <h1 className="text-4xl font-black md:text-5xl">Checkout</h1>
                    <p className="mt-4 text-lg text-white/80">Complete your purchase</p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
                <CheckoutSteps step={step} />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <ShippingForm
                                province={province}
                                provinceOptions={provinceOptions}
                                setProvince={setProvince}
                                setStep={setStep}
                            />
                        )}

                        {step === 2 && (
                            <PaymentForm
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                setStep={setStep}
                            />
                        )}

                        {step === 3 && (
                            <ConfirmationStep paymentMethod={paymentMethod} total={total} />
                        )}
                    </div>

                    <CheckoutSummary
                        orderItems={orderItems}
                        subtotal={subtotal}
                        shipping={shipping}
                        total={total}
                    />
                </div>
            </section>
        </main>
    );
}