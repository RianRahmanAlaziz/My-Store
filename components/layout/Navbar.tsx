"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, LogIn, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCartStore } from "@/features/main/cart/stores/useCartStore";
import { getCategories } from "@/features/main/category/services/categoryService";
import { useCatalogStore } from "@/features/main/catalog/stores/useCatalogStore";

type CategoryMenu = {
    id: number;
    name: string;
    slug: string;
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<CategoryMenu[]>([]);

    const { user, loading } = useAuth();

    const cartCount = useCartStore((state) => state.summary.total_items);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const clearCartState = useCartStore((state) => state.clearCartState);

    const setCategory = useCatalogStore(
        (state) => state.setCategory
    );

    const resetFilters = useCatalogStore(
        (state) => state.resetFilters
    );

    const handleCategoryClick = (slug: string) => {
        resetFilters();
        setCategory(slug);
        setOpen(false);
    };

    const menus = [
        {
            name: "All Shoes",
            slug: "all",
        },
        ...categories.map((category) => ({
            name: category.name,
            slug: category.slug,
        })),
    ];

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await getCategories();
                setCategories(response.data ?? []);
            } catch {
                setCategories([]);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        if (loading) return;

        if (user) {
            fetchCart().catch(() => null);
        } else {
            clearCartState();
        }
    }, [user, loading, fetchCart, clearCartState]);

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
                            href="/catalog"
                            onClick={() =>
                                menu.slug === "all"
                                    ? resetFilters()
                                    : handleCategoryClick(menu.slug)
                            }
                            className="text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--accent)]"
                        >
                            {menu.name}
                        </Link>
                    ))}
                </div>



                <div className="flex items-center gap-2">
                    {!loading && user ? (
                        <>
                            <Link href="/wishlist">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden lg:inline-flex"
                                    aria-label="Wishlist"
                                >
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </Link>

                            <Link href="/cart" className="relative">
                                <Button variant="ghost" size="icon" aria-label="Cart">
                                    <ShoppingCart className="h-5 w-5" />
                                </Button>

                                {cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-foreground)]">
                                        {cartCount > 99 ? "99+" : cartCount}
                                    </span>
                                )}
                            </Link>

                            <Link href="/account" className="hidden lg:block">
                                <Button variant="ghost" size="icon" aria-label="Account">
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>
                        </>
                    ) : !loading ? (
                        <Link href="/auth/login">
                            <Button variant="ghost" size="icon" aria-label="logout">
                                <LogIn className="h-5 w-5" />
                            </Button>

                        </Link>
                    ) : null}


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
                                href="/catalog"
                                onClick={() => {
                                    if (menu.slug === "all") {
                                        resetFilters();
                                    } else {
                                        handleCategoryClick(menu.slug);
                                    }
                                }}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--accent)]"
                            >
                                {menu.name}
                            </Link>
                        ))}

                        {user ? (
                            <>
                                <Link
                                    href="/wishlist"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--accent)]"
                                >
                                    <Heart className="h-5 w-5" />
                                    Wishlist
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--accent)]"
                                >
                                    <span className="flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" />
                                        Cart
                                    </span>

                                    {cartCount > 0 && (
                                        <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-bold text-[var(--accent-foreground)]">
                                            {cartCount > 99 ? "99+" : cartCount}
                                        </span>
                                    )}
                                </Link>

                                <Link
                                    href="/account"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--accent)]"
                                >
                                    <User className="h-5 w-5" />
                                    My Account
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--accent)]"
                            >
                                <LogIn className="h-5 w-5" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}