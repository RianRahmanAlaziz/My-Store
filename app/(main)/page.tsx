"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/features/main/home/components/HeroSection";
import { BenefitSection } from "@/features/main/home/components/BenefitSection";
import { ProductSection } from "@/features/main/home/components/ProductSection";
import { getHomeProducts } from "@/features/main/home/services/homeService";

export default function HomePage() {
  const [bestSellers, setBestSellers] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      const data = await getHomeProducts();

      setBestSellers(data.bestSellers);
      setTrendingProducts(data.trendingProducts);
      setNewProducts(data.newProducts);
    };

    fetchHomeProducts();
  }, []);

  return (
    <main className="bg-[var(--background)]">
      <HeroSection />

      <BenefitSection />

      <ProductSection
        title="Best Sellers"
        subtitle="Produk favorit pilihan customer"
        products={bestSellers}
        variant="soft"
      />

      <ProductSection
        title="Trending Now"
        subtitle="Sepatu paling populer minggu ini"
        products={trendingProducts}
        variant="soft"
      />

      <ProductSection
        title="New Arrivals"
        subtitle="Koleksi terbaru yang baru hadir"
        products={newProducts}
        variant="soft"
      />
    </main>
  );
}