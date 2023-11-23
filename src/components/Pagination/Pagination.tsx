"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Route } from "next";
import { useSearchParams } from "next/navigation";
import { getPagesCount } from "@/components/Pagination/getPageCount";
import { defaultSortOrder } from "@/components/ProductSort/ProductSortSelect";

export type PaginationProps<T extends string> = {
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;
	link: Route<T>;
};

export function Pagination<T extends string>({
	currentPage,
	itemsPerPage,
	totalItems,
	link,
}: PaginationProps<T>) {
	const searchParams = useSearchParams();
	const sortOrder = searchParams.get("sort") ?? defaultSortOrder;

	function addSortOrder(route: string): Route {
		let routeWithSortOrder: Route;
		if (sortOrder === defaultSortOrder) {
			routeWithSortOrder = route as Route;
		} else {
			routeWithSortOrder = `${route}?sort=${encodeURIComponent(sortOrder)}` as Route;
		}
		return routeWithSortOrder;
	}

	const pages = getPagesCount(totalItems, itemsPerPage);

	const isPrevPageLinkDisabled = currentPage === 1;
	const prevPageNum = isPrevPageLinkDisabled ? currentPage : currentPage - 1;
	const prevPageLink = addSortOrder(`${link}/${prevPageNum}`);

	const isNextPageLinkDisabled = currentPage === pages;
	const nextPageNum = isNextPageLinkDisabled ? currentPage : currentPage + 1;
	const nextPageLink = addSortOrder(`${link}/${nextPageNum}`);

	return (
		<nav className="flex gap-4" aria-label="pagination">
			<Link href={prevPageLink} className={clsx(isPrevPageLinkDisabled && "text-neutral-300")}>
				<ArrowLeft />
			</Link>
			<p className="tabular-nums">
				{currentPage} of {pages}
			</p>
			<Link href={nextPageLink} className={clsx(isNextPageLinkDisabled && "text-neutral-300")}>
				<ArrowRight />
			</Link>
		</nav>
	);
}
