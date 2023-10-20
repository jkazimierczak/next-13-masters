import { clsx } from "clsx";
import { type Product } from "./types";
import { ProductListItem } from "./ProductListItem";

type ProductListProps = {
	products: Product[];
	showLess?: boolean;
};

export function ProductList({ products, showLess, ...props }: ProductListProps) {
	return (
		<ul
			className={clsx({
				"grid w-fit gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ": true,
				"2xl:grid-cols-5": !showLess,
			})}
			{...props}
		>
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
}
