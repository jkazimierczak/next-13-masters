import { type Product } from "@/features/ProductList/types";
import { executeGraphql } from "@/api/graphql";
import {
	ProductGetByIdDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetByGenreSlugDocument,
	ProductsGetBySearchDocument,
	ProductsGetCountByCollectionSlugDocument,
	ProductsGetCountByGenreSlugDocument,
	ProductsGetCountDocument,
	ProductsGetDocument,
	type ProductsGetQuery,
	ProductsGetSimilarByGenreNameDocument,
} from "@/gql/graphql";
import { itemsPerPage } from "@/constants";

function preparePaginationArgs(page: number) {
	return {
		count: itemsPerPage,
		offset: itemsPerPage * (page - 1),
	};
}

function mapGqlProductsToProducts(products: ProductsGetQuery["products"]) {
	return products.map((p) => {
		return {
			id: p.id,
			title: p.name,
			price: p.price,
			genre: p.genres[0]?.name || "",
			images: p.images.map((img) => ({
				src: img.url,
				alt: p.name,
			})),
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
	const gqlRes = await executeGraphql(ProductsGetByGenreSlugDocument, {
		slug,
		...preparePaginationArgs(page),
	});

	if (!gqlRes.genres[0]) {
		return null;
	}

	return mapGqlProductsToProducts(gqlRes.genres[0].products);
}

export async function getProductsByCollectionSlug(
	slug: string,
	page: number,
): Promise<Product[] | null> {
	const gqlRes = await executeGraphql(ProductsGetByCollectionSlugDocument, {
		slug,
		...preparePaginationArgs(page),
	});

	if (!gqlRes.collections[0]) {
		return null;
	}

	return mapGqlProductsToProducts(gqlRes.collections[0].products);
}

export async function getSimilarProducts(genreName: string, excludedProductId: string) {
	const gqlRes = await executeGraphql(ProductsGetSimilarByGenreNameDocument, {
		genreName,
		excludedProductId,
	});

	return mapGqlProductsToProducts(gqlRes.products);
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
		genre: p.genres[0]?.name || "",
		images: p.images.map((img) => ({
			src: img.url,
			alt: p.name,
		})),
		regularEdition: p.regularEdition,
		deluxeEdition: p.deluxeEdition,
		formats: p.formats,
	};
}

export async function getProductsCount() {
	const gqlRes = await executeGraphql(ProductsGetCountDocument, {});

	return gqlRes.productsConnection.aggregate.count;
}

export async function getProductsCountByCategorySlug(slug: string) {
	const gqlRes = await executeGraphql(ProductsGetCountByGenreSlugDocument, { slug });

	return gqlRes.productsConnection.aggregate.count;
}

export async function getProductsCountByCollectionSlug(slug: string) {
	const gqlRes = await executeGraphql(ProductsGetCountByCollectionSlugDocument, { slug });

	return gqlRes.productsConnection.aggregate.count;
}
