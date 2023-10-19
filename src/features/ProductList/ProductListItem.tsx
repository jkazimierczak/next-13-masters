import Link from "next/link";
import { type Product } from "./types";
import { ProductImage } from "./ProductImage";
import { formatPrice, prepareImageProps } from "@/lib/utils";

type ProductListItemProps = {
	product: Product;
};

export function ProductListItem({
	product: { id, title, genre, price, images, averageRating },
}: ProductListItemProps) {
	return (
		<li className="inline-block w-fit sm:w-72">
			<Link href={`/product/${id}`}>
				<article>
					<div className="overflow-hidden rounded transition-shadow hover:shadow">
						<ProductImage {...prepareImageProps(images)} height={500} width={500} />
					</div>
					<div className="my-1 flex justify-between">
						<h3 className="text-xl font-bold">{title}</h3>
					</div>
					<div className="flex justify-between">
						<span data-testid="product-price">{formatPrice(price)}</span>
						<span className="text-neutral-500" data-testid="product-rating">
							{(averageRating ?? 0).toFixed(1)} ★
						</span>
					</div>
					<p hidden={true}>{genre}</p>
				</article>
			</Link>
		</li>
	);
}
