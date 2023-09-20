import { type Product } from "@/features/ProductList/types";
import { executeGraphql } from "@/api/graphql";
import {
	ProductGetByIdDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetCountByCategorySlugDocument,
	ProductsGetCountDocument,
	ProductsGetDocument,
	type ProductsGetQuery,
} from "@/gql/graphql";

function preparePaginationArgs(page: number) {
	return {
		count: 20,
		offset: 20 * (page - 1),
	};
}

function mapGqlProductsToProducts(products: ProductsGetQuery["products"]) {
	return products.map((p) => {
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

export async function getProducts(page: number): Promise<Product[]> {
	const gqlRes = await executeGraphql(ProductsGetDocument, { ...preparePaginationArgs(page) });

	return mapGqlProductsToProducts(gqlRes.products);
}

export async function getProductsByCategorySlug(
	slug: string,
	page: number,
): Promise<Product[] | null> {
	const gqlRes = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug,
		...preparePaginationArgs(page),
	});

	if (!gqlRes.categories[0]) {
		return null;
	}

	return mapGqlProductsToProducts(gqlRes.categories[0].products);
}

export async function getProductById(productId: string): Promise<Product | null> {
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
