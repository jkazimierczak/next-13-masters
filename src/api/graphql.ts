import { type GraphQLResponse } from "@/types/GraphQLResponse";
import { type TypedDocumentString } from "@/gql/graphql";
import { env } from "@/env.mjs";

export async function executeGraphQL<TResult, TVariables>({
	query,
	variables,
	cache,
	next,
	headers,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	const res = await fetch(env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		cache,
		next,
		headers: {
			...headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${env.HYGRAPH_MUTATION_TOKEN}`,
		},
	});

	const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		const errorMessage = graphqlResponse.errors[0] ? graphqlResponse.errors[0].message : "";
		throw TypeError(`GraphQL Error: ${errorMessage}`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
}
