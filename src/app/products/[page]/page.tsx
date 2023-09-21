import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductList } from "@/features/ProductList/ProductList";
import { getProducts, getProductsCount } from "@/api/products";
import { Pagination } from "@/features/Pagination";
import { itemsPerPage, maxSSGPages } from "@/constants";
import { getPagesCount } from "@/features/Pagination/getPageCount";

type ProductsPageProps = {
	params: {
		page: string;
	};
};

export async function generateMetadata({ params: { page } }: ProductsPageProps): Promise<Metadata> {
	return {
		title: `Products - page ${page}`,
	};
}

export async function generateStaticParams() {
	const totalProductCount = await getProductsCount();
	const pages = getPagesCount(totalProductCount, itemsPerPage);

	const ssgPageCount = pages >= maxSSGPages ? maxSSGPages : pages;
	return Array.from({ length: ssgPageCount }, (_, i) => ({ page: String(i) }));
}

export default async function ProductsPage({ params: { page } }: ProductsPageProps) {
	const pageNum = Number(page);

	if (pageNum <= 0 || isNaN(pageNum)) {
		notFound();
	}

	const products = await getProducts(pageNum);
	const totalProductCount = await getProductsCount();

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="mx-auto w-fit">
				<header className="mb-4 flex items-center justify-between">
					<h1 className="border-b border-secondary text-3xl font-bold">Vinyl Records</h1>
					<div className="hidden sm:block">
						<Pagination
							currentPage={pageNum}
							itemsPerPage={itemsPerPage}
							totalItems={totalProductCount}
							link={"/products"}
						/>
					</div>
				</header>
				<ProductList products={products} data-testid="products-list" />
				<div className="mt-4 flex justify-center">
					<Pagination
						currentPage={pageNum}
						itemsPerPage={itemsPerPage}
						totalItems={totalProductCount}
						link={"/products"}
					/>
				</div>
			</div>
		</main>
	);
}
