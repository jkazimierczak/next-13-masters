"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { itemIdFormDataSchema, itemSetQuantityFormDataSchema } from "@/app/cart/actionsSchema";
import { addToCart, getCart, removeProductFromCart, setProductQuantityInCart } from "@/api/cart";
import { withRevalidateCart } from "@/lib/utils";
import { createStripeInstance } from "@/lib/stripe";

export async function addProductToCartAction(formData: FormData) {
	return withRevalidateCart(async () => {
		const parsed = itemIdFormDataSchema.parse({
			itemId: formData.get("itemId"),
		});

		await addToCart(parsed.itemId);
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

export async function handlePaymentAction(_formData: FormData) {
	const stripe = createStripeInstance();

	const cart = await getCart();
	if (!cart) {
		return;
	}

	const checkoutSession = await stripe.checkout.sessions.create({
		mode: "payment",
		payment_method_types: ["card", "paypal", "blik"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems.map((item) => ({
			price_data: {
				currency: "pln",
				product_data: {
					name: item.product?.name || "",
				},
				unit_amount: item.product?.price || 0,
			},
			quantity: item.quantity,
		})),
		success_url: "http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "http://localhost:3000/cart/cancel?sessionId={CHECKOUT_SESSION_ID}",
	});

	if (!checkoutSession.url) {
		throw new Error("Something went wrong");
	}

	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}
