import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Product } from "@/components/ProductList/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
	return Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(price / 100);
}

/**
 * Return placeholder image if no images are provided.
 * @param images
 */
export function prepareImageProps(images: Product["images"]) {
	return images && images[0]
		? {
				src: images[0].src,
				alt: images[0].alt,
		  }
		: {
				src: "/placeholder-img.webp",
				alt: "Placeholder image of album cover.",
		  };
}
