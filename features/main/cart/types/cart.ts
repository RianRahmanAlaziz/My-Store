export interface CartVariant {
    id: number;
    size: string;
    color: string;
    stock?: number;
}

export interface CartItem {
    id: number;
    productId: number;
    slug: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
    subtotal: number;
    variantId: number | null;
    variants: CartVariant[];
}

export interface CartSummary {
    total_items: number;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
}
