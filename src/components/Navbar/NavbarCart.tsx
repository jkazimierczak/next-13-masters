import "server-only";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCartFromCookies } from "@/api/cart";

const defaultCartQuantity = 0;

export async function NavbarCart() {
	const cart = await getCartFromCookies();
	const storedQuantity = cart
		? cart.orderItems.reduce((acc, item) => acc + item.quantity, 0)
		: defaultCartQuantity;
	const cartItemsQuantity = storedQuantity < 99 ? storedQuantity : ":)";

	return (
		<Link href={"/cart"} className="relative block">
			<span className="absolute right-[-6px] top-[-6px] flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold">
				{cartItemsQuantity}
			</span>
			<ShoppingCart />
		</Link>
	);
}
