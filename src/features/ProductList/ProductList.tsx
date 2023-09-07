import { type Product } from "./types";
import { ProductListItem } from "./ProductListItem";

type ProductListProps = {
	products: Product[];
};

export function ProductList({ products, ...props }: ProductListProps) {
	return (
		<ul
			className="mx-auto grid w-fit gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			{...props}
		>
			{products.map((product) => (
				<ProductListItem key={product.name} product={product} />
			))}
		</ul>
	);
}
