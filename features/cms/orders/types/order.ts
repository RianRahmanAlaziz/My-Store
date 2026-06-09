export type OrderUser = {
    id: number;
    name: string;
    email: string;
};

export type OrderAddress = {
    id: number;
    receiver_name: string;
    phone: string;
    address: string;
    province: string;
    city: string;
    district: string;
    postal_code: string;
};

export type OrderItem = {
    id: number;
    product_id: number;
    product_variant_id: number;
    product_name: string;
    variant_size?: string;
    variant_color?: string;
    price: number;
    quantity: number;
    subtotal: number;
};

export type OrderItemType = {
    id: number;
    invoice_number: string;
    user?: OrderUser;
    subtotal: number;
    shipping_cost: number;
    discount: number;
    total: number;
    payment_method: string;
    payment_status: string;
    order_status: string;
    note?: string | null;
    address?: OrderAddress | null;
    items?: OrderItem[];
    created_at: string;
};

export type Pagination = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};