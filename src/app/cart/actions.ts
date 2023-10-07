"use server";

import { executeGraphQL } from "@/api/graphql";
import { CartRemoveProductDocument } from "@/gql/graphql";

export async function removeItem(itemId: string) {
	return executeGraphQL({
		query: CartRemoveProductDocument,
		variables: {
			itemId: itemId,
			quantity: 0,
		},
	});
}
