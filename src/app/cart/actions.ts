"use server";

import { revalidateTag } from "next/cache";
import { itemIdFormDataSchema, itemSetQuantityFormDataSchema } from "@/app/cart/actionsSchema";
import {
	addToCart,
	getOrCreateCart,
	removeProductFromCart,
	setProductQuantityInCart,
} from "@/api/cart";

export async function addProductToCartAction(formData: FormData) {
	const parsed = itemIdFormDataSchema.parse({
		itemId: formData.get("itemId"),
	});

	const cart = await getOrCreateCart();
	await addToCart(cart.id, parsed.itemId);

	revalidateTag("cart");
}

export async function removeProductFromCartAction(formData: FormData) {
	const parsed = itemIdFormDataSchema.parse({
		itemId: formData.get("itemId"),
	});

	await removeProductFromCart(parsed.itemId);

	revalidateTag("cart");
}

export async function setProductQuantityAction(formData: FormData) {
	const parsed = itemSetQuantityFormDataSchema.parse({
		itemId: formData.get("itemId"),
		quantity: formData.get("itemQuantity"),
	});

	console.log("incrementData:", parsed);

	await setProductQuantityInCart(parsed.itemId, parsed.quantity);

	revalidateTag("cart");
}
