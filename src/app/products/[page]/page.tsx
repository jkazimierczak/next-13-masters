import { notFound } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductList } from "@/features/ProductList/ProductList";
import { getProducts } from "@/api/products";

const TOTAL_PRODUCT_COUNT = 4205;
const PAGES = Math.ceil(TOTAL_PRODUCT_COUNT / 20);

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

	const isPrevPageLinkDisabled = pageNum === 1;
	const prevPageNum = isPrevPageLinkDisabled ? pageNum : pageNum - 1;
	const prevPageLink = `/products/${prevPageNum}` as const;

	const isNextPageLinkDisabled = pageNum === PAGES;
	const nextPageNum = isNextPageLinkDisabled ? pageNum : pageNum + 1;
	const nextPageLink = `/products/${nextPageNum}` as const;

	return (
		<main className="mx-auto max-w-screen-2xl p-8">
			<div className="mx-auto w-fit">
				<nav className="flex gap-4" aria-label="pagination">
					<Link href={prevPageLink} className={clsx(isPrevPageLinkDisabled && "text-neutral-300")}>
						<ArrowLeft />
					</Link>
					<p>
						{page} of {PAGES}
					</p>
					<Link href={nextPageLink} className={clsx(isNextPageLinkDisabled && "text-neutral-300")}>
						<ArrowRight />
					</Link>
				</nav>
				<ProductList products={products} data-testid="products-list" />
			</div>
		</main>
	);
}
