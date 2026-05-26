export interface Product {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    category: string;
    rating: number;
    reviews: number;
    colors: string[];
    sizes: string[];
    description?: string;
    features?: string[];
    isTrending?: boolean;
    isNew?: boolean;
    isBestSeller?: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        slug: "nike-air-max-270",
        name: "Air Max Premium",
        brand: "Nike",
        price: 1899000,
        originalPrice: 2299000,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
        images: [
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800",
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800",
        ],
        category: "Running",
        rating: 4.8,
        reviews: 234,
        colors: ["White", "Black", "Orange"],
        sizes: ["39", "40", "41", "42", "43", "44"],
        description: "Premium running shoes dengan teknologi Air Max untuk kenyamanan maksimal. Desain modern dan stylish cocok untuk gaya hidup aktif Anda.",
        features: [
            "Air Max cushioning technology",
            "Breathable mesh upper",
            "Durable rubber outsole",
            "Lightweight design"
        ],
        isTrending: true,
        isBestSeller: true,
    },
    {
        id: "2",
        slug: "ultraboost-22",
        name: "UltraBoost 22",
        brand: "Adidas",
        price: 2199000,
        image: "https://images.unsplash.com/photo-1600185365778-7875a359b924?w=800",
        images: [
            "https://images.unsplash.com/photo-1600185365778-7875a359b924?w=800",
            "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800",
        ],
        category: "Running",
        rating: 4.9,
        reviews: 456,
        colors: ["White", "Red", "Black"],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        description: "Revolutionary comfort dengan teknologi Boost. Sempurna untuk lari jarak jauh dan aktivitas sehari-hari.",
        features: [
            "Boost midsole technology",
            "Primeknit upper",
            "Continental rubber outsole",
            "Energy return system"
        ],
        isNew: true,
        isTrending: true,
    },
    {
        id: "3",
        slug: "air-jordan-retro",
        name: "Air Jordan Retro",
        brand: "Nike",
        price: 2599000,
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800",
        images: [
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800",
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
        ],
        category: "Lifestyle",
        rating: 5.0,
        reviews: 892,
        colors: ["White", "Black", "Red"],
        sizes: ["39", "40", "41", "42", "43", "44"],
        description: "Iconic basketball sneakers dengan heritage design. Koleksi legendary yang timeless.",
        features: [
            "Premium leather upper",
            "Air cushioning",
            "Iconic design",
            "Durable construction"
        ],
        isBestSeller: true,
    },
    {
        id: "4",
        slug: "casual-walker",
        name: "Casual Walker",
        brand: "Puma",
        price: 1299000,
        originalPrice: 1599000,
        image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800",
        images: [
            "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800",
        ],
        category: "Casual",
        rating: 4.5,
        reviews: 167,
        colors: ["Brown", "White", "Beige"],
        sizes: ["39", "40", "41", "42", "43"],
        description: "Sepatu casual yang nyaman untuk penggunaan sehari-hari. Style minimalis dan versatile.",
        features: [
            "Soft cushioned insole",
            "Breathable material",
            "Versatile design",
            "Lightweight"
        ],
        isNew: true,
    },
    {
        id: "5",
        slug: "running-pro-elite",
        name: "Running Pro Elite",
        brand: "Nike",
        price: 1699000,
        image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800",
        images: [
            "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800",
        ],
        category: "Running",
        rating: 4.7,
        reviews: 289,
        colors: ["Gray", "Blue", "Black"],
        sizes: ["40", "41", "42", "43", "44"],
        description: "Professional running shoes untuk performa maksimal. Teknologi terkini untuk pelari serius.",
        features: [
            "Advanced cushioning",
            "Responsive foam",
            "Lightweight mesh",
            "Enhanced grip"
        ],
        isTrending: true,
    },
    {
        id: "6",
        slug: "classic-low",
        name: "Classic Low",
        brand: "Adidas",
        price: 999000,
        image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800",
        images: [
            "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800",
        ],
        category: "Lifestyle",
        rating: 4.6,
        reviews: 445,
        colors: ["White", "Black"],
        sizes: ["39", "40", "41", "42", "43", "44"],
        description: "Timeless classic design yang tidak pernah ketinggalan zaman. Essential untuk koleksi sneakers Anda.",
        features: [
            "Classic silhouette",
            "Premium leather",
            "Comfortable fit",
            "Iconic style"
        ],
        isBestSeller: true,
    },
    {
        id: "7",
        slug: "sport-runner-x",
        name: "Sport Runner X",
        brand: "Puma",
        price: 1499000,
        image: "https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?w=800",
        images: [
            "https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?w=800",
        ],
        category: "Running",
        rating: 4.4,
        reviews: 156,
        colors: ["Blue", "Orange", "Black"],
        sizes: ["39", "40", "41", "42", "43"],
        description: "Dynamic running shoes dengan desain sporty. Cocok untuk workout dan aktivitas outdoor.",
        features: [
            "Dynamic support",
            "Flexible sole",
            "Moisture-wicking",
            "Stylish design"
        ],
        isNew: true,
    },
    {
        id: "8",
        slug: "street-collection",
        name: "Street Collection",
        brand: "Nike",
        price: 1799000,
        image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=800",
        images: [
            "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=800",
        ],
        category: "Lifestyle",
        rating: 4.8,
        reviews: 523,
        colors: ["Multi"],
        sizes: ["40", "41", "42", "43", "44"],
        description: "Koleksi streetwear yang bold dan stylish. Ekspresikan gaya unik Anda dengan confidence.",
        features: [
            "Bold colorways",
            "Premium materials",
            "Streetwear aesthetic",
            "Comfortable all-day wear"
        ],
        isTrending: true,
    },
];

export const categories = [
    { id: "all", name: "All Shoes", count: products.length },
    { id: "running", name: "Running", count: products.filter(p => p.category === "Running").length },
    { id: "lifestyle", name: "Lifestyle", count: products.filter(p => p.category === "Lifestyle").length },
    { id: "casual", name: "Casual", count: products.filter(p => p.category === "Casual").length },
];

export const brands = ["Nike", "Adidas", "Puma"];
