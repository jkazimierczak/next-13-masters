import { redirect } from "next/navigation";
import { getCartFromCookies } from "@/api/cart";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	return (
		<>
			<pre>{JSON.stringify(cart, null, 2)}</pre>
		</>
	);
}
