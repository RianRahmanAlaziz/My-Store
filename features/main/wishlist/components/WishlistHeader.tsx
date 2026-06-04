export function WishlistHeader() {
    return (
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/90 py-12 text-[var(--primary-foreground)]">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <h1 className="text-4xl font-black md:text-5xl">
                    Favorite Products
                </h1>

                <p className="mt-4 text-lg text-white/80">
                    Produk sepatu favorit kamu tersimpan di sini.
                </p>
            </div>
        </section>
    );
}