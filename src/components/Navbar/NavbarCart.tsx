import "server-only";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCartFromCookies } from "@/api/cart";

const defaultCartQuantity = 0;

export async function NavbarCart() {
	const cart = await getCartFromCookies();
	const quantity = cart
		? cart.orderItems.reduce((acc, item) => acc + item.quantity, 0)
		: defaultCartQuantity;

	return (
		<Link href={"/cart"}>
			<div className="flex items-center">
				<span className="h-6 w-6 rounded-full bg-primary text-center text-sm font-semibold">
					{quantity}
				</span>
				<ShoppingCart />
			</div>
		</Link>
	);
}
