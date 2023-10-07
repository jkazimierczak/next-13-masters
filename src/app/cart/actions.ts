"use server";

import { revalidateTag } from "next/cache";
import { itemIdFormDataSchema } from "@/app/cart/actionsSchema";
import { addToCart, getOrCreateCart, removeProductFromCart } from "@/api/cart";

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
