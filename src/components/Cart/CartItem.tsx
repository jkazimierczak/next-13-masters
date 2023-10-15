import { RemoveItemButton } from "./RemoveItemButton";
import { type OrderItemFragment } from "@/gql/graphql";
import { removeProductFromCartAction } from "@/app/cart/actions";
import { formatPrice } from "@/lib/utils";
import { CartItemQuantity } from "@/components/Cart/CartItemQuantity";

type CartItemProps = {
	item: OrderItemFragment;
};

export function CartItem({ item }: CartItemProps) {
	return (
		<tr>
			<td>{item.product?.name}</td>
			<td>
				<CartItemQuantity quantity={item.quantity} itemId={item.id} />
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
