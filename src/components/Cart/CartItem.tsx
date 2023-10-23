import Image from "next/image";
import Link from "next/link";
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
		<article>
			<header className="mb-2 flex items-center">
				<div className="flex flex-grow items-center gap-2.5">
					<Link href={`/product/${item.product?.id}`} className="flex-shrink-0">
						<Image
							width={64}
							height={64}
							src={item.product?.images[0]?.url ?? ""}
							alt={`${item.product?.name} album cover.`}
							className="rounded"
						/>
					</Link>
					<Link href={`/product/${item.product?.id}`}>
						<h1 className="font-medium">{item.product?.name}</h1>
					</Link>
				</div>

				<div>
					<form action={removeProductFromCartAction}>
						<input type="text" name="itemId" value={item.id} hidden readOnly />
						<RemoveItemButton />
					</form>
				</div>
			</header>

			<div className="flex items-center justify-between">
				<CartItemQuantity quantity={item.quantity} itemId={item.id} />
				<p className="text-right font-bold">{formatPrice(item.total)}</p>
			</div>
		</article>
	);
}
