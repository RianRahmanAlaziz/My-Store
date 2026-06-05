export function CheckoutInput({
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