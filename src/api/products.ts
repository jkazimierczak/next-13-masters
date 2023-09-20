import { type Product } from "@/features/ProductList/types";
import { executeGraphql } from "@/api/graphql";
import {
	ProductGetByIdDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetCountByCategorySlugDocument,
	ProductsGetCountDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";

export async function getProducts(page: number): Promise<Product[]> {
	const gqlRes = await executeGraphql(ProductsGetListDocument, {
		count: 20,
		offset: 20 * (page - 1),
	});

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

export async function getProductsByCategorySlug(slug: string, page: number) {
	const gqlRes = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug,
		count: 20,
		offset: 20 * (page - 1),
	});

	if (!gqlRes.categories[0]) {
		return null;
	}

	return gqlRes.categories[0].products.map((p) => {
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

export async function getProductsCount() {
	const gqlRes = await executeGraphql(ProductsGetCountDocument, {});

	return gqlRes.productsConnection.aggregate.count;
}

export async function getProductsCountByCategorySlug(slug: string) {
	const gqlRes = await executeGraphql(ProductsGetCountByCategorySlugDocument, { slug });

	return gqlRes.productsConnection.aggregate.count;
}
