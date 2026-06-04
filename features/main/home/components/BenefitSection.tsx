import { Award, ShieldCheck, Sparkles, Truck } from "lucide-react";

const benefits = [
    {
        title: "Original Product",
        desc: "Produk 100% authentic",
        icon: ShieldCheck,
    },
    {
        title: "Fast Delivery",
        desc: "Pengiriman cepat & aman",
        icon: Truck,
    },
    {
        title: "Premium Quality",
        desc: "Material nyaman dipakai",
        icon: Sparkles,
    },
    {
        title: "Best Brand",
        desc: "Nike, Adidas, Puma",
        icon: Award,
    },
];

export function BenefitSection() {
    return (
        <section className="mx-auto mt-12 grid max-w-7xl gap-5 px-4 md:grid-cols-4 lg:px-8">
            {benefits.map((item) => (
                <div
                    key={item.title}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg transition-shadow hover:shadow-xl"
                >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--secondary)] text-[var(--accent)]">
                        <item.icon className="h-6 w-6" />
                    </div>

                    <h3 className="font-bold text-[var(--foreground)]">{item.title}</h3>

                    <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>
                </div>
            ))}
        </section>
    );
}