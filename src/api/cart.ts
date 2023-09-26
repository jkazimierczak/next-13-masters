import { cookies } from "next/headers";
import { executeGraphql } from "@/api/graphql";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { isProduction } from "@/constants";

export async function getCartById(cartId: string) {
	return executeGraphql(CartGetByIdDocument, { id: cartId });
}

export async function createCart() {
	return executeGraphql(CartCreateDocument, {});
}

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await getCartById(cartId);
		if (cart.order) {
			return cart.order;
		}
	}
}

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartFromCookies();
	if (existingCart) {
		return existingCart;
	}

	// TODO: Implement upsert
	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("Failed to create cart");
	}
	cookies().set("cartId", cart.createOrder.id, {
		httpOnly: true,
		sameSite: "lax",
		secure: isProduction,
	});
	return cart.createOrder;
}

export async function addToCart(cartId: string, productId: string) {
	const { product } = await executeGraphql(ProductGetByIdDocument, { id: productId });
	if (!product) {
		throw new Error("Product not found");
	}
	// TODO: Ignored caveats:
	//	- particular product could be in cart
	//	- quantity doesn't have to === 1
	await executeGraphql(CartAddProductDocument, {
		productId,
		orderId: cartId,
		total: product.price,
	});
}
