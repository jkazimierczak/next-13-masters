import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductList } from "@/features/ProductList/ProductList";
import { getProducts } from "@/api/products";
import { Pagination } from "@/features/Pagination";

const TOTAL_PRODUCT_COUNT = 4205;

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
	return Array.from({ length: 10 }, (_, i) => ({ page: String(i) }));
}

export default async function ProductsPage({ params: { page } }: ProductsPageProps) {
	const pageNum = Number(page);

	if (pageNum <= 0 || isNaN(pageNum)) {
		notFound();
	}

	const products = await getProducts(pageNum);

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="mx-auto w-fit">
				<header className="mb-4 flex items-center justify-between">
					<h1 className="border-b border-secondary text-3xl font-bold">Vinyl Records</h1>
					<div className="hidden sm:block">
						<Pagination
							currentPage={pageNum}
							itemsPerPage={20}
							totalItems={TOTAL_PRODUCT_COUNT}
							link={"/products"}
						/>
					</div>
				</header>
				<ProductList products={products} data-testid="products-list" />
				<div className="mt-4 flex justify-center">
					<Pagination
						currentPage={pageNum}
						itemsPerPage={20}
						totalItems={TOTAL_PRODUCT_COUNT}
						link={"/products"}
					/>
				</div>
			</div>
		</main>
	);
}
