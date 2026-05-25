import Link from "next/link";
import { ArrowRight, Award, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { products, Product } from "@/data/products";

export default function HomePage() {
  const trendingProducts = products.filter((item) => item.isTrending).slice(0, 4);
  const newProducts = products.filter((item) => item.isNew).slice(0, 4);
  const bestSellers = products.filter((item) => item.isBestSeller).slice(0, 4);

  return (
    <main className="bg-[var(--background)]">
      <section className="relative overflow-hidden  bg-[var(--primary)]">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600"
            alt="Hero Shoes"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:px-8">
          <div className="text-[var(--primary-foreground)]">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              New Collection 2026
            </p>

            <h1 className="max-w-2xl text-5xl font-black leading-tight md:text-7xl">
              Step Into Your Modern Style
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/70">
              Temukan sepatu modern untuk running, lifestyle, casual, dan daily
              outfit dengan kualitas premium.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/catalog">
                <Button size="lg">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              <Link href="/catalog?category=running">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white hover:text-black"
                >
                  Explore Running
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900"
                alt="Featured Shoes"
                className="aspect-square rounded-[2.5rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-5 px-4 md:grid-cols-4 lg:px-8">
        {[
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
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--secondary)] text-[var(--accent)]">
              <item.icon className="h-6 w-6" />
            </div>

            <h3 className="font-bold text-[var(--foreground)]">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>
          </div>
        ))}
      </section>

      <ProductSection
        title="Trending Now"
        subtitle="Sepatu paling populer minggu ini"
        products={trendingProducts}
      />

      <ProductSection
        title="New Arrivals"
        subtitle="Koleksi terbaru yang baru hadir"
        products={newProducts}
        variant="soft"
      />

      <ProductSection
        title="Best Sellers"
        subtitle="Produk favorit pilihan customer"
        products={bestSellers}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="rounded-[2rem] bg-[var(--primary)] px-6 py-14 text-center text-[var(--primary-foreground)] md:px-12">
          <h2 className="text-3xl font-black md:text-5xl">
            Join StepHub Community
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Dapatkan promo, diskon, dan info sepatu terbaru langsung ke email.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Masukkan email kamu"
              className="h-14 flex-1 rounded-full px-6 text-slate-950 outline-none"
            />

            <button className="h-14 rounded-full bg-orange-500 px-8 font-semibold text-white transition hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductSection({
  title,
  subtitle,
  products,
  variant,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  variant?: "soft";
}) {
  return (
    <section
      className={`mx-auto max-w-7xl px-4 py-20 lg:px-8 ${variant === "soft" ? "rounded-[2rem] bg-[var(--card)]" : ""
        }`}
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--foreground)] md:text-4xl">
            {title}
          </h2>

          <p className="mt-2 text-[var(--muted)]">{subtitle}</p>
        </div>

        <Link href="/catalog">
          <Button
            variant="outline"
            className="hidden sm:inline-flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}