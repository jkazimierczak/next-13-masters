import { notFound } from "next/navigation";
import { getProductsByCategorySlug, getProductsCountByCategorySlug } from "@/api/products";
import { Pagination } from "@/features/Pagination";
import { ProductList } from "@/features/ProductList/ProductList";

type CategoryPageParams = {
	params: {
		categoryName: string;
		page: string;
	};
};

export default async function CategoryPage({ params: { page, categoryName } }: CategoryPageParams) {
	const pageNum = Number(page);

	if (pageNum <= 0 || isNaN(pageNum)) {
		notFound();
	}

	const products = await getProductsByCategorySlug(categoryName, pageNum);
	if (!products) {
		notFound();
	}

	const totalProductCount = await getProductsCountByCategorySlug(categoryName);

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="mx-auto w-fit">
				<header className="mb-4 flex items-center justify-between">
					<h1 className="border-b border-secondary text-3xl font-bold">{categoryName}</h1>
					<div className="hidden sm:block">
						<Pagination
							currentPage={pageNum}
							itemsPerPage={20}
							totalItems={totalProductCount}
							link={`/categories/${categoryName}`}
						/>
					</div>
				</header>
				<ProductList products={products} data-testid="products-list" />
				<div className="mt-4 flex justify-center">
					<Pagination
						currentPage={pageNum}
						itemsPerPage={20}
						totalItems={totalProductCount}
						link={`/categories/${categoryName}`}
					/>
				</div>
			</div>
		</main>
	);
}
