import { type Product } from "@/features/ProductList/types";
import { executeGraphql } from "@/api/graphql";
import { ProductGetByIdDocument, ProductsGetListDocument } from "@/gql/graphql";

export async function getProducts(_page: number): Promise<Product[]> {
	const gqlRes = await executeGraphql(ProductsGetListDocument, {});

	return gqlRes.products.map((p) => {
		return {
			id: p.id,
			title: p.name,
			price: p.price,
			description: p.description,
			category: p.categories[0]?.name || "",
			image: p.images[0] && {
				src: p.images[0].url,
				alt: p.name,
			},
		};
	});
}

export async function getProductById(productId: string) {
	const gqlRes = await executeGraphql(ProductGetByIdDocument, { id: productId });
	const p = gqlRes.product;

	if (!p) {
		return null;
	}

	return {
		id: p.id,
		title: p.name,
		price: p.price,
		description: p.description,
		category: p.categories[0]?.name || "",
		image: p.images[0] && {
			src: p.images[0].url,
			alt: p.name,
		},
	};
}
