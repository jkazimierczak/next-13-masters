import { type Product } from "@/features/ProductList/types";

const API_URL = new URL("https://naszsklep-api.vercel.app/api/products");

export async function getProducts(_page: number) {
	const queryParams = {
		take: "20",
	};

	const urlQueryParams = new URLSearchParams([...Object.entries(queryParams)]).toString();

	const res = await fetch(`${API_URL.origin}${API_URL.pathname}?${urlQueryParams}`);
	return (await res.json()) as Product[];
}

export async function getProductById(productId: string) {
	const res = await fetch(`${API_URL.toString()}/${productId}`);
	return (await res.json()) as Product;
}
