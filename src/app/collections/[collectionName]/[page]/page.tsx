import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProductsByCollectionSlug, getProductsCountByCollectionSlug } from "@/api/products";
import { Pagination } from "@/features/Pagination";
import { ProductList } from "@/features/ProductList/ProductList";
import { itemsPerPage } from "@/constants";
import { getCollectionNameBySlug } from "@/api/collection";

type CollectionPageParams = {
	params: {
		collectionName: string;
		page: string;
	};
};

export async function generateMetadata({
	params: { page, collectionName },
}: CollectionPageParams): Promise<Metadata> {
	const prettyCollectionName = await getCollectionNameBySlug(collectionName);

	return {
		title: `${prettyCollectionName} - page ${page}`,
	};
}

export default async function CollectionPage({
	params: { page, collectionName },
}: CollectionPageParams) {
	const pageNum = Number(page);

	if (pageNum <= 0 || isNaN(pageNum)) {
		notFound();
	}

	const prettyCollectionName = await getCollectionNameBySlug(collectionName);
	const products = await getProductsByCollectionSlug(collectionName, pageNum);
	if (!products) {
		notFound();
	}

	const totalProductCount = await getProductsCountByCollectionSlug(collectionName);

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="mx-auto w-fit">
				<header className="mb-4 flex items-center justify-between">
					<h1 className="border-b border-secondary text-3xl font-bold">{prettyCollectionName}</h1>
					<div className="hidden sm:block">
						<Pagination
							currentPage={pageNum}
							itemsPerPage={itemsPerPage}
							totalItems={totalProductCount}
							link={`/categories/${collectionName}`}
						/>
					</div>
				</header>
				<ProductList products={products} data-testid="products-list" />
				<div className="mt-4 flex justify-center">
					<Pagination
						currentPage={pageNum}
						itemsPerPage={itemsPerPage}
						totalItems={totalProductCount}
						link={`/categories/${collectionName}`}
					/>
				</div>
			</div>
		</main>
	);
}
