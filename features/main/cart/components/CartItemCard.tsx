import Link from "next/link";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/features/main/cart/types/cart";

type CartItemCardProps = {
    item: CartItem;
    updatingId: number | null;
    onVariantChange: (cartId: number, variantId: number) => void;
    onQuantityChange: (cartId: number, quantity: number) => void;
    onRemove: (cartId: number) => void;
};

export function CartItemCard({
    item,
    updatingId,
    onVariantChange,
    onQuantityChange,
    onRemove,
}: CartItemCardProps) {
    const uniqueSizes = Array.from(
        new Set(item.variants.map((variant) => variant.size))
    );

    const availableColors = item.variants
        .filter((variant) => variant.size === item.size)
        .map((variant) => variant.color);

    const uniqueColors = Array.from(new Set(availableColors));

    return (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 md:p-5">
            <div className="flex gap-4">
                <Link
                    href={`/product/${item.slug}`}
                    className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[var(--secondary)] md:h-36 md:w-36"
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                    />
                </Link>

                <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex justify-between gap-4">
                        <div>
                            <p className="text-sm text-[var(--muted)]">{item.brand}</p>

                            <Link href={`/product/${item.slug}`}>
                                <h2 className="mt-1 line-clamp-2 text-lg font-bold text-[var(--foreground)] transition hover:text-[var(--accent)]">
                                    {item.name}
                                </h2>
                            </Link>

                            <div className="mt-4 space-y-4">
                                <VariantSelector
                                    label="Size"
                                    options={uniqueSizes}
                                    selected={item.size}
                                    disabled={updatingId === item.id}
                                    onSelect={(size) => {
                                        const variant =
                                            item.variants.find(
                                                (cartVariant) =>
                                                    cartVariant.size === size &&
                                                    cartVariant.color === item.color
                                            ) ??
                                            item.variants.find(
                                                (cartVariant) => cartVariant.size === size
                                            );

                                        if (variant) {
                                            onVariantChange(item.id, variant.id);
                                        }
                                    }}
                                />

                                <VariantSelector
                                    label="Color"
                                    options={uniqueColors}
                                    selected={item.color}
                                    disabled={updatingId === item.id}
                                    onSelect={(color) => {
                                        const variant = item.variants.find(
                                            (cartVariant) =>
                                                cartVariant.color === color &&
                                                cartVariant.size === item.size
                                        );

                                        if (variant) {
                                            onVariantChange(item.id, variant.id);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => onRemove(item.id)}
                            disabled={updatingId === item.id}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--secondary)] hover:text-[var(--destructive)] disabled:opacity-50"
                        >
                            {updatingId === item.id ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Trash2 className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex h-11 w-fit items-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
                            <button
                                type="button"
                                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                                disabled={updatingId === item.id || item.quantity <= 1}
                                className="flex h-11 w-11 items-center justify-center text-[var(--foreground)] disabled:opacity-40"
                            >
                                <Minus className="h-4 w-4" />
                            </button>

                            <span className="w-10 text-center font-bold text-[var(--foreground)]">
                                {item.quantity}
                            </span>

                            <button
                                type="button"
                                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                                disabled={updatingId === item.id}
                                className="flex h-11 w-11 items-center justify-center text-[var(--foreground)] disabled:opacity-40"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-sm text-[var(--muted)]">Subtotal</p>
                            <p className="text-xl font-black text-[var(--foreground)]">
                                Rp {item.subtotal.toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function VariantSelector({
    label,
    options,
    selected,
    disabled,
    onSelect,
}: {
    label: string;
    options: string[];
    selected: string;
    disabled: boolean;
    onSelect: (value: string) => void;
}) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-[var(--muted)]">
                {label}
            </label>

            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const isSelected = option === selected;

                    return (
                        <button
                            key={option}
                            type="button"
                            disabled={disabled}
                            onClick={() => onSelect(option)}
                            className={`min-w-10 rounded-xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${isSelected
                                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                                : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                }`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}