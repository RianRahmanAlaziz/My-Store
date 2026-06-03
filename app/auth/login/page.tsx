"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { login } from "@/features/auth/services/authService";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await login({
                email,
                password,
            });

            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success(`Selamat datang ${user.name}`);

            setTimeout(() => {
                if (user.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/");
                }
            }, 1000);

        } catch (error: any) {
            toast.error(
                "Login gagal. Silakan coba lagi."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen bg-[var(--background)]">
            <section className="relative hidden overflow-hidden lg:block lg:w-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary)]/95 to-[var(--accent)]">
                    <img
                        src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200"
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
                            Welcome Back to StepHub
                        </h2>

                        <p className="mb-8 text-xl text-white/90">
                            Step into style with premium footwear from the world&apos;s best
                            brands.
                        </p>

                        <div className="space-y-4">
                            <Benefit
                                title="100% Authentic Products"
                                description="All shoes are guaranteed original from authorized distributors."
                            />

                            <Benefit
                                title="Free Shipping"
                                description="Enjoy free delivery on orders over Rp 500,000."
                            />

                            <Benefit
                                title="Easy Returns"
                                description="30-day hassle-free return policy on all products."
                            />
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
                            Sign In
                        </h2>

                        <p className="text-[var(--muted-foreground)]">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={setEmail}
                            icon={<Mail className="h-5 w-5" />}
                        />

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                                Password
                            </label>

                            <div className="relative">
                                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                                    <Lock className="h-5 w-5" />
                                </div>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        <div className="flex items-center justify-between">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded accent-[var(--accent)]"
                                />
                                <span className="text-sm text-[var(--foreground)]">
                                    Remember me
                                </span>
                            </label>

                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-[var(--accent)] hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>

                        <p className="text-center text-sm text-[var(--muted-foreground)]">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/auth/register"
                                className="font-medium text-[var(--accent)] hover:underline"
                            >
                                Sign up for free
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
    placeholder,
    value,
    onChange,
    icon,
}: {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                {label}
            </label>

            <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                    {icon}
                </div>

                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--input-background)] px-12 text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent)]"
                />
            </div>
        </div>
    );
}

function Benefit({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/80">{description}</p>
        </div>
    );
}