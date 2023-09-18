import Link from "next/link";
import { type Product } from "./types";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/utils/formatPrice";

type ProductListItemProps = {
	product: Product;
};

export function ProductListItem({
	product: { id, title, category, price, image, rating },
}: ProductListItemProps) {
	return (
		<li className="inline-block w-fit sm:w-72">
			<Link href={`/product/${id}`}>
				<article>
					<div className="overflow-hidden rounded border border-neutral-300/50">
						<ProductImage src={image} alt={title} height={500} width={500} />
					</div>
					<div className="my-1 flex justify-between">
						<h3 className="text-xl font-bold">{title}</h3>
					</div>
					<div className="flex justify-between">
						<span>{formatPrice(price)}</span>
						<span className="text-neutral-500">{rating.rate.toFixed(1)} ★</span>
					</div>
					<p hidden={true}>{category}</p>
				</article>
			</Link>
		</li>
	);
}
