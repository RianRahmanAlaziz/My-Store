type OrderStatusBadgeProps = {
    status: string;
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    const variants: Record<string, string> = {
        pending: "bg-warning/20 text-warning",
        paid: "bg-primary/20 text-primary",
        processing: "bg-primary/20 text-primary",
        shipped: "bg-success/20 text-success",
        delivered: "bg-success/20 text-success",
        cancelled: "bg-danger/20 text-danger",
        failed: "bg-danger/20 text-danger",
        unpaid: "bg-warning/20 text-warning",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${variants[status] ?? "bg-slate-200 text-slate-600"
                }`}
        >
            {status}
        </span>
    );
}