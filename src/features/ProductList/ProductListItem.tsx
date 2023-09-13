import Link from "next/link";
import { type Product } from "./types";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/utils/formatPrice";

type ProductListItemProps = {
	product: Product;
};

export function ProductListItem({
	product: { id, title, category, price, image },
}: ProductListItemProps) {
	return (
		<li className="inline-block w-fit sm:w-72">
			<Link href={`/product/${id}`}>
				<article>
					<div className="overflow-hidden rounded border border-neutral-300">
						<ProductImage src={image} alt={title} height={500} width={500} />
					</div>
					<div className="my-1 flex justify-between">
						<h3 className="text-xl font-bold">{title}</h3>
					</div>
					<p>{formatPrice(price)}</p>
					<p hidden={true}>{category}</p>
				</article>
			</Link>
		</li>
	);
}
