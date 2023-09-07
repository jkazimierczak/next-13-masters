import { type Product } from "./types";
import { ProductImage } from "./ProductImage";

type ProductListItemProps = {
	product: Product;
};

export function ProductListItem({
	product: { name, category, price, image },
}: ProductListItemProps) {
	return (
		<li className="inline-block w-fit sm:w-72">
			<article>
				<div className="overflow-hidden rounded border border-neutral-300">
					<ProductImage src={image.src} alt={image.alt} height={image.height} width={image.width} />
				</div>
				<div className="my-1 flex justify-between">
					<h3 className="text-xl font-bold">{name}</h3>
				</div>
				<p>
					{Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(price / 100)}
				</p>
				<p hidden={true}>{category}</p>
			</article>
		</li>
	);
}
