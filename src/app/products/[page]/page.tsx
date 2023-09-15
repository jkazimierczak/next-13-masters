import { notFound } from "next/navigation";
import { ProductList } from "@/features/ProductList/ProductList";
import { getProducts } from "@/api/products";

type ProductsPageProps = {
	params: {
		page: string;
	};
};

export default async function ProductsPage({ params: { page } }: ProductsPageProps) {
	const pageNum = Number(page);

	if (pageNum <= 0 || isNaN(pageNum)) {
		notFound();
	}

	const products = await getProducts(pageNum);

	return (
		<main className="p-8">
			<div className="mx-auto w-fit">
				<ProductList products={products} data-testid="products-list" />
			</div>
		</main>
	);
}
