import { ProductList } from "@/features/ProductList/ProductList";
import { getProducts } from "@/api/products";

type ProductsPageProps = {
	params: {
		page: number;
	};
};

export default async function ProductsPage({ params: { page } }: ProductsPageProps) {
	const products = await getProducts(page);

	return (
		<main className="p-8">
			<div className="mx-auto w-fit">
				<ProductList products={products} data-testid="products-list" />
			</div>
		</main>
	);
}
