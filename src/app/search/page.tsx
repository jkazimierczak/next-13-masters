import { getProductsBySearch } from "@/api/products";
import { ProductList } from "@/components/ProductList/ProductList";

type SearchPageProps = {
	searchParams: {
		query: string;
	};
};

export default async function SearchPage({ searchParams: { query } }: SearchPageProps) {
	const products = await getProductsBySearch(query);

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="mx-auto w-fit">
				<header className="mb-4 flex items-center gap-4">
					<h1 className="border-b border-secondary text-3xl font-bold">Search results</h1>
					<p className="text-xl">Found: {products.length}</p>
				</header>
				<ProductList products={products} data-testid="products-list" />
			</div>
		</main>
	);
}
