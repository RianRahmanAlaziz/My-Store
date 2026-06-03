"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    Phone,
    User,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log("Register:", formData);
    };

    return (
        <main className="flex min-h-screen bg-[var(--background)]">
            <section className="relative hidden overflow-hidden lg:block lg:w-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[var(--primary)]/95 to-[var(--primary)]">
                    <img
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200"
                        alt="Shoes"
                        className="h-full w-full object-cover opacity-20"
                    />
                </div>

                <div className="relative flex h-full flex-col justify-center px-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)]">
                                <span className="text-3xl font-bold text-white">S</span>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold">StepHub</h1>
                                <p className="text-white/90">Shoes Store</p>
                            </div>
                        </div>

                        <h2 className="mb-6 text-5xl font-bold">
                            Join StepHub Today
                        </h2>

                        <p className="mb-8 text-xl text-white/90">
                            Join thousands of satisfied customers and discover your perfect
                            pair.
                        </p>

                        <div className="space-y-6">
                            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                                <h3 className="mb-2 text-2xl font-bold">
                                    Exclusive Benefits
                                </h3>

                                <ul className="space-y-3 text-white/90">
                                    <BenefitItem text="Early access to new releases and limited editions" />
                                    <BenefitItem text="Member-only discounts up to 30% off" />
                                    <BenefitItem text="Free shipping on all orders" />
                                    <BenefitItem text="Birthday rewards and special surprises" />
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="flex w-full items-center justify-center p-8 lg:w-1/2">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-8 text-center lg:hidden">
                        <div className="mb-4 inline-flex items-center gap-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]">
                                <span className="text-xl font-bold text-white">S</span>
                            </div>

                            <div className="text-left">
                                <h1 className="text-xl font-bold text-[var(--foreground)]">
                                    StepHub
                                </h1>
                                <p className="text-xs text-[var(--muted-foreground)]">
                                    Shoes Store
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="mb-2 text-3xl font-bold text-[var(--foreground)]">
                            Create Account
                        </h2>

                        <p className="text-[var(--muted-foreground)]">
                            Sign up to start shopping with exclusive benefits.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="First Name"
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                                icon={<User className="h-5 w-5" />}
                            />

                            <InputField
                                label="Last Name"
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            icon={<Mail className="h-5 w-5" />}
                        />

                        <InputField
                            label="Phone Number"
                            type="tel"
                            name="phone"
                            placeholder="+62 812-3456-7890"
                            value={formData.phone}
                            onChange={handleChange}
                            icon={<Phone className="h-5 w-5" />}
                        />

                        <PasswordField
                            label="Password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />

                        <p className="-mt-3 text-xs text-[var(--muted-foreground)]">
                            Must be at least 8 characters with uppercase, lowercase and number.
                        </p>

                        <PasswordField
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            showPassword={showConfirmPassword}
                            setShowPassword={setShowConfirmPassword}
                        />

                        <label className="flex cursor-pointer items-start gap-2">
                            <input
                                type="checkbox"
                                className="mt-0.5 h-4 w-4 rounded accent-[var(--accent)]"
                                required
                            />

                            <span className="text-sm text-[var(--muted-foreground)]">
                                I agree to StepHub&apos;s{" "}
                                <Link
                                    href="/terms"
                                    className="text-[var(--accent)] hover:underline"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="text-[var(--accent)] hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>

                        <Button type="submit" size="lg" className="w-full">
                            Create Account
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--border)]" />
                            </div>

                            <div className="relative flex justify-center text-sm">
                                <span className="bg-[var(--background)] px-4 text-[var(--muted-foreground)]">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button type="button" variant="outline" size="lg">
                                Google
                            </Button>

                            <Button type="button" variant="outline" size="lg">
                                Facebook
                            </Button>
                        </div>

                        <p className="text-center text-sm text-[var(--muted-foreground)]">
                            Already have an account?{" "}
                            <Link
                                href="/auth/login"
                                className="font-medium text-[var(--accent)] hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </section>
        </main>
    );
}

function InputField({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    icon,
}: {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                        {icon}
                    </div>
                )}

                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className={`h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--input-background)] text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)] ${icon ? "px-12" : "px-4"
                        }`}
                />
            </div>
        </div>
    );
}

function PasswordField({
    label,
    name,
    placeholder,
    value,
    onChange,
    showPassword,
    setShowPassword,
}: {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    setShowPassword: (value: boolean) => void;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                {label}
            </label>

            <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                    <Lock className="h-5 w-5" />
                </div>

                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--input-background)] px-12 text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)]"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    );
}

function BenefitItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white" />
            {text}
        </li>
    );
}