import { handlePaymentAction } from "./actions";
import { getCartFromCookies } from "@/api/cart";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/Cart/CartItem";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		return <p>Cart empty</p>;
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>

			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map((item, id) => {
						if (!item.product) {
							return null;
						}
						// TODO: See if key cannot be simplified
						return <CartItem key={`${item.product.id}-${id}`} item={item} />;
					})}
				</tbody>
			</table>

			<form action={handlePaymentAction}>
				<Button>Proceed to pay</Button>
			</form>

			<hr />

			<pre>{JSON.stringify(cart, null, 2)}</pre>
		</div>
	);
}
