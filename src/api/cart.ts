import { cookies } from "next/headers";
import { executeGraphQL } from "@/api/graphql";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { isProduction } from "@/constants";

async function getCartById(cartId: string) {
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

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await getCartById(cartId);
		if (cart.order) {
			return cart.order;
		}
	}
}

async function createCart() {
	return executeGraphQL({
		query: CartCreateDocument,
		next: {
			tags: ["cart"],
		},
	});
}

export async function getCart(): Promise<CartFragment> {
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

export async function addToCart(productId: string) {
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
	//	- quantity doesn't have to === 1

	const cart = await getCart();
	const orderItem = cart.orderItems.find(({ product }) => product?.id === productId);

	if (!orderItem) {
		await addNewProductToCart(productId, cart.id, product.price);
	} else {
		const newQuantity = orderItem.quantity + 1;
		await setProductQuantityInCart(orderItem.id, newQuantity);
	}
}

export async function addNewProductToCart(productId: string, orderId: string, price: number) {
	await executeGraphQL({
		query: CartAddProductDocument,
		variables: {
			productId,
			orderId: orderId,
			total: price,
		},
		next: {
			tags: ["cart"],
		},
	});
}

export async function setProductQuantityInCart(orderItemId: string, quantity: number) {
	if (quantity === 0) {
		await removeProductFromCart(orderItemId);
	} else {
		const cart = await getCart();

		const item = cart.orderItems.find((item) => item.id === orderItemId);
		if (!item) {
			throw new Error("Item not found");
		}

		const newTotalPrice = (item.product?.price ?? 0) * quantity;
		await executeGraphQL({
			query: CartSetProductQuantityDocument,
			variables: {
				itemId: orderItemId,
				total: newTotalPrice,
				quantity,
			},
		});
	}
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
