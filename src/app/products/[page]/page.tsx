import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProducts, getProductsCount } from "@/api/products";
import { itemsPerPage, maxSSGPages } from "@/constants";
import { getPagesCount } from "@/components/Pagination/getPageCount";
import { type ProductOrderByInput } from "@/gql/graphql";
import { ProductPageListing } from "@/components/Layouts/ProductPageListing";

type ProductsPageProps = {
	params: {
		page: string;
	};
	searchParams: {
		sort?: ProductOrderByInput;
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

export default async function ProductsPage({
	params: { page },
	searchParams: { sort },
}: ProductsPageProps) {
	const pageNum = Number(page);
	const totalProductCount = await getProductsCount();
	const pages = getPagesCount(totalProductCount, itemsPerPage);

	if (pageNum <= 0 || isNaN(pageNum) || pageNum > pages) {
		notFound();
	}

	const products = await getProducts(pageNum, sort);

	return (
		<ProductPageListing
			title="Vinyl Records"
			page={pageNum}
			totalProductCount={totalProductCount}
			products={products}
		/>
	);
}
