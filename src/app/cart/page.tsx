import { type Metadata } from "next";
import Link from "next/link";
import { handlePaymentAction } from "./actions";
import { getCartFromCookies } from "@/api/cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { CartItemList } from "@/components/Cart/CartItemList";

export const metadata: Metadata = {
	title: "Cart page",
};

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart || !cart.orderItems.length) {
		return (
			<div>
				<p className="mb-4">Your cart is empty, but you can change this!</p>
				<Button>
					<Link href={"/products/1"}>Browse all products</Link>
				</Button>
			</div>
		);
	}

	const totalCartValue = cart.orderItems.reduce((acc, orderItem) => acc + orderItem.total, 0);
	const validOrderItems = cart.orderItems.filter((orderItem) => !!orderItem.product);

	return (
		<div className="flex h-full flex-col justify-between xl:flex-row xl:gap-16">
			<div className="mb-10 flex-grow">
				<CartItemList orderItems={validOrderItems} />
			</div>

			<div>
				<p className="mb-2 flex justify-between">
					<span>Total to pay:</span>
					<span className="font-bold">{formatPrice(totalCartValue)}</span>
				</p>
				<form action={handlePaymentAction} className="mb-2">
					<Button className="w-full">Proceed to pay</Button>
				</form>
				<p className="text-center text-sm text-neutral-500">
					Payments are securely processed by Stripe.
				</p>
			</div>
		</div>
	);
}
