import { redirect } from "next/navigation";
import { getCartFromCookies } from "@/api/cart";
import { formatPrice } from "@/lib/utils";
import { RemoveItemButton } from "@/app/cart/RemoveItemButton";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
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
						return (
							<tr key={`${item.product.id}-${id}`}>
								<td>{item.product.name}</td>
								<td>{item.quantity}</td>
								<td>{formatPrice(item.product.price)}</td>
								<td>
									<RemoveItemButton productId={item.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
