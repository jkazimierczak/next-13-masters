"use server";

import { itemIdFormDataSchema, itemSetQuantityFormDataSchema } from "@/app/cart/actionsSchema";
import {
	addToCart,
	getOrCreateCart,
	removeProductFromCart,
	setProductQuantityInCart,
} from "@/api/cart";
import { withRevalidateCart } from "@/lib/utils";

export async function addProductToCartAction(formData: FormData) {
	return withRevalidateCart(async () => {
		const parsed = itemIdFormDataSchema.parse({
			itemId: formData.get("itemId"),
		});

		const cart = await getOrCreateCart();
		await addToCart(cart.id, parsed.itemId);
	});
}

export async function removeProductFromCartAction(formData: FormData) {
	return withRevalidateCart(async () => {
		const parsed = itemIdFormDataSchema.parse({
			itemId: formData.get("itemId"),
		});

		await removeProductFromCart(parsed.itemId);
	});
}

export async function setProductQuantityAction(formData: FormData) {
	return withRevalidateCart(async () => {
		const parsed = itemSetQuantityFormDataSchema.parse({
			itemId: formData.get("itemId"),
			quantity: formData.get("itemQuantity"),
		});

		await setProductQuantityInCart(parsed.itemId, parsed.quantity);
	});
}
