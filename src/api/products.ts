import { type Product } from "@/features/ProductList/types";
import { executeGraphQL } from "@/api/graphql";
import {
	ProductGetByIdDocument,
	type ProductOrderByInput,
	ProductPublishDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetByGenreSlugDocument,
	ProductsGetByIdsDocument,
	ProductsGetBySearchDocument,
	ProductsGetCountByCollectionSlugDocument,
	ProductsGetCountByGenreSlugDocument,
	ProductsGetCountDocument,
	ProductsGetDocument,
	type ProductsGetQuery,
} from "@/gql/graphql";
import { itemsPerPage } from "@/constants";
import { algoliaIndex } from "@/lib/algolia";

function preparePaginationArgs(page: number) {
	return {
		count: itemsPerPage,
		offset: itemsPerPage * (page - 1),
	};
}

function mapGqlProductsToProducts(products: ProductsGetQuery["products"]): Product[] {
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
			averageRating: p.averageRating ?? undefined,
		};
	});
}

export async function getProducts(page: number, orderBy?: ProductOrderByInput): Promise<Product[]> {
	const gqlRes = await executeGraphQL({
		query: ProductsGetDocument,
		variables: {
			...preparePaginationArgs(page),
			orderBy: orderBy,
		},
	});

	return mapGqlProductsToProducts(gqlRes.products);
}

export async function getProductsBySearch(query: string, page: number): Promise<Product[]> {
	const { hits: searchResults } = await algoliaIndex.search(query, {
		attributesToRetrieve: ["objectID", "name"],
		attributesToHighlight: [],
	});
	console.dir(searchResults);

	const gqlRes = await executeGraphQL({
		query: ProductsGetBySearchDocument,
		variables: {
			query: query,
			...preparePaginationArgs(page),
		},
	});

	return mapGqlProductsToProducts(gqlRes.products);
}

export async function getProductsByCategorySlug(
	slug: string,
	page: number,
): Promise<Product[] | null> {
	const gqlRes = await executeGraphQL({
		query: ProductsGetByGenreSlugDocument,
		variables: {
			slug,
			...preparePaginationArgs(page),
		},
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
	const gqlRes = await executeGraphQL({
		query: ProductsGetByCollectionSlugDocument,
		variables: {
			slug,
			...preparePaginationArgs(page),
		},
	});

	if (!gqlRes.collections[0]) {
		return null;
	}

	return mapGqlProductsToProducts(gqlRes.collections[0].products);
}

export async function getSimilarProducts(genreName: string, excludedProductId: string) {
	const { hits: recommendedProducts } = await algoliaIndex.search(genreName, {
		filters: `NOT objectID:${excludedProductId}`,
		attributesToRetrieve: ["objectID"],
		attributesToHighlight: [],
	});
	const recommendedProductsIds = recommendedProducts.map((productHit) => productHit.objectID);

	const gqlRes = await executeGraphQL({
		query: ProductsGetByIdsDocument,
		variables: {
			productIds: recommendedProductsIds,
		},
	});

	return mapGqlProductsToProducts(gqlRes.products);
}

export async function getProductById(productId: string) {
	const gqlRes = await executeGraphQL({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
	});
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
		averageRating: p.averageRating,
		regularEdition: p.regularEdition,
		deluxeEdition: p.deluxeEdition,
		formats: p.formats,
	};
}

export async function getProductsCount() {
	const gqlRes = await executeGraphQL({
		query: ProductsGetCountDocument,
	});

	return gqlRes.productsConnection.aggregate.count;
}

export async function getProductsCountByCategorySlug(slug: string) {
	const gqlRes = await executeGraphQL({
		query: ProductsGetCountByGenreSlugDocument,
		variables: {
			slug,
		},
	});

	return gqlRes.productsConnection.aggregate.count;
}

export async function getProductsCountByCollectionSlug(slug: string) {
	const gqlRes = await executeGraphQL({
		query: ProductsGetCountByCollectionSlugDocument,
		variables: {
			slug,
		},
	});

	return gqlRes.productsConnection.aggregate.count;
}

export async function publishProduct(productId: string) {
	await executeGraphQL({
		query: ProductPublishDocument,
		variables: {
			productId,
		},
	});
}
