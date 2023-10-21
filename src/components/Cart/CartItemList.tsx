import { type OrderItemFragment } from "@/gql/graphql";
import { CartItem } from "@/components/Cart/CartItem";

type CartItemListProps = {
	orderItems: OrderItemFragment[];
};

export function CartItemList({ orderItems }: CartItemListProps) {
	return (
		<ul className="divide-y divide-neutral-300">
			{orderItems.map((item) => (
				<li key={item.id} className="py-2">
					<CartItem item={item} />
				</li>
			))}
		</ul>
	);
}
