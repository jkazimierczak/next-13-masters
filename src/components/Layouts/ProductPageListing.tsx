import "server-only";

import { Suspense } from "react";
import { ProductSortSkeleton } from "@/components/ProductSort/ProductSortSkeleton";
import { ProductSortSelect } from "@/components/ProductSort/ProductSortSelect";
import { ProductList } from "@/components/ProductList/ProductList";
import { PaginationSkeleton } from "@/components/Pagination/PaginationSkeleton";
import { Pagination } from "@/components/Pagination/Pagination";
import { itemsPerPage } from "@/constants";
import { type Product } from "@/components/ProductList/types";

type ProductPageListingProps = {
	title: string;
	page: number;
	totalProductCount: number;
	products: Product[];
};

export async function ProductPageListing({
	title,
	page,
	totalProductCount,
	products,
}: ProductPageListingProps) {
	const pagination = (
		<Suspense fallback={<PaginationSkeleton />}>
			<Pagination
				currentPage={page}
				itemsPerPage={itemsPerPage}
				totalItems={totalProductCount}
				link={"/products"}
			/>
		</Suspense>
	);

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="mx-auto w-fit">
				<header className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row">
					<h1 className="border-b border-secondary text-3xl font-bold">{title}</h1>
					<div className="flex items-center gap-4">
						<Suspense fallback={<ProductSortSkeleton />}>
							<ProductSortSelect />
						</Suspense>
						<div className="hidden sm:block">{pagination}</div>
					</div>
				</header>
				<ProductList products={products} data-testid="products-list" />
				<div className="mt-4 flex justify-center">{pagination}</div>
			</div>
		</main>
	);
}
