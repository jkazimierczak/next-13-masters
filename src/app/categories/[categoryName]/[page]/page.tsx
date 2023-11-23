import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { Pagination } from "@/components/Pagination";
import { getProductsByCategorySlug, getProductsCountByCategorySlug } from "@/api/products";
import { ProductList } from "@/components/ProductList/ProductList";
import { itemsPerPage } from "@/constants";
import { getCategoryNameBySlug } from "@/api/category";

type CategoryPageParams = {
	params: {
		categoryName: string;
		page: string;
	};
};

export async function generateMetadata({
	params: { page, categoryName },
}: CategoryPageParams): Promise<Metadata> {
	const prettyCategoryName = await getCategoryNameBySlug(categoryName);

	return {
		title: `${prettyCategoryName} - page ${page}`,
	};
}

export default async function CategoryPage({ params: { page, categoryName } }: CategoryPageParams) {
	const pageNum = Number(page);

	if (pageNum <= 0 || isNaN(pageNum)) {
		notFound();
	}

	const prettyCategoryName = await getCategoryNameBySlug(categoryName);
	const products = await getProductsByCategorySlug(categoryName, pageNum);
	if (!products) {
		notFound();
	}

	const totalProductCount = await getProductsCountByCategorySlug(categoryName);

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="mx-auto w-fit">
				<header className="mb-4 flex items-center justify-between">
					<h1 className="border-b border-secondary text-3xl font-bold">{prettyCategoryName}</h1>
					<div className="hidden sm:block">
						<Pagination
							currentPage={pageNum}
							itemsPerPage={itemsPerPage}
							totalItems={totalProductCount}
							link={`/categories/${categoryName}`}
						/>
					</div>
				</header>
				<ProductList products={products} data-testid="products-list" />
				<div className="mt-4 flex justify-center">
					<Pagination
						currentPage={pageNum}
						itemsPerPage={itemsPerPage}
						totalItems={totalProductCount}
						link={`/categories/${categoryName}`}
					/>
				</div>
			</div>
		</main>
	);
}
