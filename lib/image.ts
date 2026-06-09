const API_URL = process.env.NEXT_PUBLIC_API_URL_IMAGE ?? "";

export function getImageUrl(
    path?: string | null,
    fallback = "/images/placeholder-shoe.png"
) {
    if (!path) return fallback;

    // sudah full URL
    if (path.startsWith("http")) {
        return path;
    }

    return `${API_URL}${path}`;
}