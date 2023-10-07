import { cookies } from "next/headers";
import { executeGraphQL } from "@/api/graphql";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	CartRemoveProductDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { isProduction } from "@/constants";

export async function getCartById(cartId: string) {
	return executeGraphQL({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
		next: {
			tags: ["cart"],
		},
	});
}

export async function createCart() {
	return executeGraphQL({
		query: CartCreateDocument,
		next: {
			tags: ["cart"],
		},
	});
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
	const { product } = await executeGraphQL({
		query: ProductGetByIdDocument,
		variables: { id: productId },
		next: {
			tags: ["cart"],
		},
	});
	if (!product) {
		throw new Error("Product not found");
	}
	// TODO: Ignored caveats:
	//	- particular product could be in cart
	//	- quantity doesn't have to === 1
	await executeGraphQL({
		query: CartAddProductDocument,
		variables: {
			productId,
			orderId: cartId,
			total: product.price,
		},
		next: {
			tags: ["cart"],
		},
	});
}

export async function removeProductFromCart(orderItemId: string) {
	await executeGraphQL({
		query: CartRemoveProductDocument,
		variables: {
			itemId: orderItemId,
			quantity: 0,
		},
	});
}
