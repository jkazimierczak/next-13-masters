import { executeGraphQL } from "@/api/graphql";
import { CollectionGetNameBySlugDocument } from "@/gql/graphql";

export async function getCollectionNameBySlug(slug: string) {
	const gqlRes = await executeGraphQL({
		query: CollectionGetNameBySlugDocument,
		variables: {
			slug: slug,
		},
	});

	if (!gqlRes.collections[0]) {
		return null;
	}
	return gqlRes.collections[0].name;
}
