import { type Metadata } from "next";
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

	if (!cart) {
		return <p>Cart empty</p>;
	}

	const totalCartValue = cart.orderItems.reduce((acc, orderItem) => acc + orderItem.total, 0);
	const validOrderItems = cart.orderItems.filter((orderItem) => !!orderItem.product);

	return (
		<div className="mx-auto max-w-screen-sm px-4 py-6 xl:max-w-screen-lg">
			<h1 className="mb-4 w-fit border-b border-secondary text-3xl font-bold">Your Cart</h1>
			<div className="flex h-full  flex-col justify-between xl:flex-row xl:gap-16">
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
		</div>
	);
}
