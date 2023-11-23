import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { revalidateTag } from "next/cache";
import { type Product } from "@/components/ProductList/types";
import { FetchTag } from "@/lib/fetchtag";

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

type AsyncFunction = () => Promise<void>;

export async function withRevalidate<T extends AsyncFunction>(func: T, tag: string) {
	await func();

	revalidateTag(tag);
}

export async function withRevalidateCart<T extends AsyncFunction>(func: T) {
	return withRevalidate(func, FetchTag.CART);
}
