import Image from "next/image";
import { getImageUrl } from "@/lib/image";
import type { ProductImage } from "../types/product";

type Props = {
    images?: ProductImage[];
    productName: string;
};

export default function ProductImagesStack({ images = [], productName }: Props) {
    return (
        <div className="flex">
            {images.slice(0, 3).map((image, index) => (
                <div
                    key={image.id}
                    className={`relative h-10 w-10 overflow-hidden rounded-full border-2 border-white zoom-in ${index > 0 ? "-ml-5" : ""}`}
                >
                    <Image src={getImageUrl(image.image)} alt={productName} fill sizes="40px" className="object-cover" />
                </div>
            ))}

            {images.length > 3 && (
                <div className="relative -ml-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-semibold text-slate-600">
                    +{images.length - 3}
                </div>
            )}
        </div>
    );
}
