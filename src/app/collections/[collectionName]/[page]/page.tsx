import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProductsByCollectionSlug, getProductsCountByCollectionSlug } from "@/api/products";
import { itemsPerPage } from "@/constants";
import { getCollectionNameBySlug } from "@/api/collection";
import { ProductPageListing } from "@/components/Layouts/ProductPageListing";
import { getPagesCount } from "@/components/Pagination/getPageCount";

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
	const totalProductCount = await getProductsCountByCollectionSlug(collectionName);
	const pages = getPagesCount(totalProductCount, itemsPerPage);

	if (pageNum <= 0 || isNaN(pageNum) || pageNum > pages) {
		notFound();
	}

	const products = await getProductsByCollectionSlug(collectionName, pageNum);
	if (!products) {
		notFound();
	}
	const prettyCollectionName = await getCollectionNameBySlug(collectionName);

	return (
		<ProductPageListing
			title={prettyCollectionName ?? "Vinyl Records"}
			page={pageNum}
			totalProductCount={totalProductCount}
			products={products}
		/>
	);
}
