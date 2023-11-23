import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProductsByCategorySlug, getProductsCountByCategorySlug } from "@/api/products";
import { getCategoryNameBySlug } from "@/api/category";
import { ProductPageListing } from "@/components/Layouts/ProductPageListing";
import { getPagesCount } from "@/components/Pagination/getPageCount";
import { itemsPerPage } from "@/constants";

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
	const totalProductCount = await getProductsCountByCategorySlug(categoryName);
	const pages = getPagesCount(totalProductCount, itemsPerPage);

	if (pageNum <= 0 || isNaN(pageNum) || pageNum > pages) {
		notFound();
	}

	const products = await getProductsByCategorySlug(categoryName, pageNum);
	if (!products) {
		notFound();
	}
	const prettyCategoryName = await getCategoryNameBySlug(categoryName);

	return (
		<ProductPageListing
			title={prettyCategoryName ?? "Vinyl Records"}
			page={pageNum}
			totalProductCount={totalProductCount}
			products={products}
		/>
	);
}
