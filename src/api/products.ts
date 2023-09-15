import { type Product } from "@/features/ProductList/types";

const API_URL = new URL("https://naszsklep-api.vercel.app/api/products");

export async function getProducts(page: number) {
	console.log(page);
	const queryParams = {
		take: "20",
		offset: String(20 * (page - 1)),
	};

	const urlQueryParams = new URLSearchParams([...Object.entries(queryParams)]).toString();

	const res = await fetch(`${API_URL.origin}${API_URL.pathname}?${urlQueryParams}`);
	return (await res.json()) as Product[];
}

export async function getProductById(productId: string) {
	const res = await fetch(`${API_URL.toString()}/${productId}`);
	try {
		return (await res.json()) as Product;
	} catch (e) {
		return null;
	}
}
