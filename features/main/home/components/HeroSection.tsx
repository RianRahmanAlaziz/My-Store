import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[var(--primary)]">
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
    );
}