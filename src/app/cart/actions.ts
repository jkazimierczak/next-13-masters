"use server";

import { revalidateTag } from "next/cache";
import { executeGraphQL } from "@/api/graphql";
import { CartRemoveProductDocument } from "@/gql/graphql";
import { removeItemFromCartFormDataSchema } from "@/app/cart/actionsSchema";

export async function removeItemFromCart(formData: FormData) {
	const parsed = removeItemFromCartFormDataSchema.parse({
		itemId: formData.get("itemId"),
	});

	await executeGraphQL({
		query: CartRemoveProductDocument,
		variables: {
			itemId: parsed.itemId,
			quantity: 0,
		},
	});

	revalidateTag("cart");
}
