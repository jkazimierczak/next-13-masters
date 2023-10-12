import { redirect } from "next/navigation";
import {
	handlePaymentAction,
	removeProductFromCartAction,
	setProductQuantityAction,
} from "./actions";
import { getCart } from "@/api/cart";
import { formatPrice } from "@/lib/utils";
import { RemoveItemButton } from "@/app/cart/RemoveItemButton";
import { IncrementProductQuantityButton } from "@/app/cart/IncrementProductQuantityButton";
import { DecrementProductQuantityButton } from "@/app/cart/DecrementProductQuantityButton";
import { Button } from "@/components/ui/button";

export default async function CartPage() {
	const cart = await getCart();

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
								<td>
									<div className="flex items-center gap-2">
										<form action={setProductQuantityAction}>
											<input type="text" name="itemId" value={item.id} hidden readOnly />
											<input
												type="text"
												name="itemQuantity"
												value={item.quantity - 1}
												hidden
												readOnly
											/>
											<DecrementProductQuantityButton />
										</form>
										{item.quantity}
										<form action={setProductQuantityAction}>
											<input type="text" name="itemId" value={item.id} hidden readOnly />
											<input
												type="text"
												name="itemQuantity"
												value={item.quantity + 1}
												hidden
												readOnly
											/>
											<IncrementProductQuantityButton />
										</form>
									</div>
								</td>
								<td>{formatPrice(item.total)}</td>
								<td>
									<form action={removeProductFromCartAction}>
										<input type="text" name="itemId" value={item.id} hidden readOnly />
										<RemoveItemButton />
									</form>
								</td>
							</tr>
						);
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
