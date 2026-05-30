"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Check,
    CreditCard,
    MapPin,
    Package,
    Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import Select from "react-select";

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("qris");

    const steps = [
        { number: 1, title: "Shipping", icon: MapPin },
        { number: 2, title: "Payment", icon: CreditCard },
        { number: 3, title: "Confirmation", icon: Check },
    ];

    const orderItems = [
        {
            name: "Air Max Premium",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200",
            size: "42",
            qty: 1,
            price: 1899000,
        },
        {
            name: "UltraBoost 22",
            image: "https://images.unsplash.com/photo-1600185365778-7875a359b924?w=200",
            size: "43",
            qty: 2,
            price: 2199000,
        },
    ];

    const provinceOptions = [
        { value: "dki-jakarta", label: "DKI Jakarta" },
        { value: "jawa-barat", label: "Jawa Barat" },
        { value: "jawa-tengah", label: "Jawa Tengah" },
        { value: "jawa-timur", label: "Jawa Timur" },
    ];
    const [province, setProvince] = useState(null);

    const subtotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const shipping = subtotal > 500000 ? 0 : 25000;
    const total = subtotal + shipping;

    return (
        <main className="min-h-screen bg-[var(--background)]">
            <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/90 py-12 text-[var(--primary-foreground)]">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <h1 className="text-4xl font-black md:text-5xl">Checkout</h1>
                    <p className="mt-4 text-lg text-white/80">
                        Complete your purchase
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
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
                                                : "bg-[var(--muted)] text-[var(--success-foreground)]"
                                            }`}
                                    >
                                        {item.number < step ? (
                                            <Check className="h-6 w-6" />
                                        ) : (
                                            <item.icon className="h-6 w-6" />
                                        )}
                                    </div>

                                    <span className="hidden text-[var(--muted)] font-semibold sm:block">
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

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {step === 1 && (
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
                                        <Input placeholder="First Name" />
                                        <Input placeholder="Last Name" />
                                    </div>

                                    <Input placeholder="Email Address" type="email" />
                                    <Input placeholder="Phone Number" type="tel" />
                                    <Input placeholder="Street Address" />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="City" />
                                        <Input placeholder="Postal Code" />
                                    </div>

                                    <Select
                                        options={provinceOptions}
                                        value={province}
                                        onChange={setProvince}
                                        placeholder="Select Province"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                minHeight: "48px",
                                                borderRadius: "12px",
                                                borderColor: state.isFocused
                                                    ? "var(--accent)"
                                                    : "var(--border)",
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
                                        <Button
                                            size="lg"
                                            className="w-full"
                                            onClick={() => setStep(2)}
                                        >
                                            Continue to Payment
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
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
                                        <Input placeholder="Card Number" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input placeholder="MM/YY" />
                                            <Input placeholder="CVV" />
                                        </div>
                                        <Input placeholder="Cardholder Name" />
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        size="lg"
                                        className="w-full"
                                        onClick={() => setStep(3)}
                                    >
                                        Complete Order
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
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
                        )}
                    </div>

                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
                            <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">
                                Order Summary
                            </h2>

                            <div className="mb-6 space-y-4">
                                {orderItems.map((item) => (
                                    <div key={item.name} className="flex gap-4">
                                        <div className="h-16 w-16 overflow-hidden rounded-xl bg-[var(--muted)]">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-[var(--foreground)]">
                                                {item.name}
                                            </h4>

                                            <p className="text-xs text-[var(--muted)]">
                                                Size: {item.size} × {item.qty}
                                            </p>
                                        </div>

                                        <span className="font-semibold text-[var(--foreground)]">
                                            {formatShortPrice(item.price * item.qty)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 border-t border-[var(--border)] pt-4">
                                <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />

                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--muted)]">Shipping</span>
                                    <span className="font-semibold text-[var(--success)]">
                                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                                    </span>
                                </div>

                                <div className="flex justify-between border-t border-[var(--border)] pt-3 text-lg font-bold text-[var(--foreground)]">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

function Input({
    placeholder,
    type = "text",
}: {
    placeholder: string;
    type?: string;
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--input-background)] px-4 text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)]"
        />
    );
}

function PaymentOption({
    active,
    onClick,
    icon,
    title,
    subtitle,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full rounded-2xl border-2 p-6 text-left transition ${active
                ? "border-[var(--accent)] bg-[var(--accent)]/5"
                : "border-[var(--border)] hover:border-[var(--accent)]/50"
                }`}
        >
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    {icon}
                </div>

                <div>
                    <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
                    <p className="text-sm text-[var(--muted)]">{subtitle}</p>
                </div>
            </div>
        </button>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-[var(--muted)]">{label}</span>
            <span className="font-semibold text-[var(--foreground)]">{value}</span>
        </div>
    );
}

function formatPrice(value: number) {
    return `Rp ${value.toLocaleString("id-ID")}`;
}

function formatShortPrice(value: number) {
    if (value >= 1000000) {
        return `Rp ${(value / 1000000).toFixed(1)}jt`;
    }

    return formatPrice(value);
}