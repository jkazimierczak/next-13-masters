import { DecrementProductQuantityButton } from "./DecrementProductQuantityButton";
import { IncrementProductQuantityButton } from "./IncrementProductQuantityButton";
import { RemoveItemButton } from "./RemoveItemButton";
import { type OrderItemFragment } from "@/gql/graphql";
import { removeProductFromCartAction, setProductQuantityAction } from "@/app/cart/actions";
import { formatPrice } from "@/lib/utils";

type CartItemProps = {
	item: OrderItemFragment;
};

export function CartItem({ item }: CartItemProps) {
	return (
		<tr>
			<td>{item.product?.name}</td>
			<td>
				<div className="flex items-center gap-2">
					<form action={setProductQuantityAction}>
						<input type="text" name="itemId" value={item.id} hidden readOnly />
						<input type="text" name="itemQuantity" value={item.quantity - 1} hidden readOnly />
						<DecrementProductQuantityButton />
					</form>
					<span data-testid="quantity">{item.quantity}</span>
					<form action={setProductQuantityAction}>
						<input type="text" name="itemId" value={item.id} hidden readOnly />
						<input type="text" name="itemQuantity" value={item.quantity + 1} hidden readOnly />
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
}
