import AlgoliaSearch from "algoliasearch";
import { type getProductById } from "@/api/products";

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

const algoliaAppId = process.env.ALGOLIA_APPID;
if (!algoliaAppId) {
	throw TypeError("ALGOLIA_APPID is not defined");
}
const algoliaApiKey = process.env.ALGOLIA_API_KEY;
if (!algoliaApiKey) {
	throw TypeError("ALGOLIA_APPID is not defined");
}

const client = AlgoliaSearch(algoliaAppId, algoliaApiKey);
export const algoliaIndex = client.initIndex("Products");
