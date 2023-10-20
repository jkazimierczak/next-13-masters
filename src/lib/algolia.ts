import AlgoliaSearch from "algoliasearch";
import { type getProductById } from "@/api/products";
import { env } from "@/env.mjs";

export type AlgoliaProductRecord = {
	objectID: string;
	name: string;
	description: string;
	genre: string;
	formats: string[];
};

export function mapProductToAlgoliaRecord(
	product: NonNullable<Awaited<ReturnType<typeof getProductById>>>,
): AlgoliaProductRecord {
	return {
		objectID: product.id,
		name: product.title,
		description: product.description,
		genre: product.genre,
		formats: product.formats.map((format) => format.name),
	};
}

const client = AlgoliaSearch(env.ALGOLIA_APPID, env.ALGOLIA_API_KEY);
export const algoliaIndex = client.initIndex("Products");
