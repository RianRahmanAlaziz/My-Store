export function formatPrice(value: number) {
    return `Rp ${value.toLocaleString("id-ID")}`;
}

export function formatShortPrice(value: number) {
    if (value >= 1000000) {
        return `Rp ${(value / 1000000).toFixed(1)}jt`;
    }

    return formatPrice(value);
}