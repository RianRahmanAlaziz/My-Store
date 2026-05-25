"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const cartCount = 3;

    const menus = [
        { name: "All Shoes", href: "/catalog" },
        { name: "Running", href: "/catalog?category=running" },
        { name: "Lifestyle", href: "/catalog?category=lifestyle" },
        { name: "Casual", href: "/catalog?category=casual" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-xl font-bold text-[var(--primary-foreground)]">
                        S
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-[var(--foreground)]">
                            StepHub
                        </h1>
                        <p className="text-xs text-[var(--muted)]">Shoes Store</p>
                    </div>
                </Link>

                <div className="hidden items-center gap-8 lg:flex">
                    {menus.map((menu) => (
                        <Link
                            key={menu.name}
                            href={menu.href}
                            className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--accent)]"
                        >
                            {menu.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden w-full max-w-sm items-center rounded-full bg-[var(--secondary)] px-4 lg:flex">
                    <Search className="h-5 w-5 text-[var(--muted-foreground)]" />

                    <input
                        type="search"
                        placeholder="Search modern shoes..."
                        className="h-11 flex-1 bg-transparent px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden lg:inline-flex"
                        aria-label="Wishlist"
                    >
                        <Heart className="h-5 w-5" />
                    </Button>

                    <Link href="/cart" className="relative">
                        <Button variant="ghost" size="icon" aria-label="Cart">
                            <ShoppingCart className="h-5 w-5" />
                        </Button>

                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-foreground)]">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link href="/account" className="hidden lg:block">
                        <Button variant="ghost" size="icon" aria-label="Account">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(!open)}
                        className="lg:hidden"
                        aria-label="Open menu"
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </nav>

            {open && (
                <div className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-5 lg:hidden">
                    <div className="mb-4 flex items-center rounded-full bg-[var(--secondary)] px-4">
                        <Search className="h-5 w-5 text-[var(--muted-foreground)]" />

                        <input
                            type="search"
                            placeholder="Search shoes..."
                            className="h-11 flex-1 bg-transparent px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        {menus.map((menu) => (
                            <Link
                                key={menu.name}
                                href={menu.href}
                                onClick={() => setOpen(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--accent)]"
                            >
                                {menu.name}
                            </Link>
                        ))}

                        <Link
                            href="/account"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--accent)]"
                        >
                            <User className="h-5 w-5" />
                            My Account
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}