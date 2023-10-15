import { executeGraphQL } from "@/api/graphql";
import { CategoryGetNameBySlugDocument } from "@/gql/graphql";

export async function getCategoryNameBySlug(slug: string) {
	const gqlRes = await executeGraphQL({
		query: CategoryGetNameBySlugDocument,
		variables: {
			slug: slug,
		},
	});

	if (!gqlRes.genres[0]) {
		return null;
	}
	return gqlRes.genres[0].name;
}
