import Link from "next/link";
import { clsx } from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Route } from "next";

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
	const pages = Math.ceil(totalItems / itemsPerPage);

	const isPrevPageLinkDisabled = currentPage === 1;
	const prevPageNum = isPrevPageLinkDisabled ? currentPage : currentPage - 1;
	const prevPageLink = `${link}/${prevPageNum}` as const;

	const isNextPageLinkDisabled = currentPage === pages;
	const nextPageNum = isNextPageLinkDisabled ? currentPage : currentPage + 1;
	const nextPageLink = `${link}/${nextPageNum}` as const;

	return (
		<nav className="flex gap-4" aria-label="pagination">
			<Link
				href={prevPageLink as Route}
				className={clsx(isPrevPageLinkDisabled && "text-neutral-300")}
			>
				<ArrowLeft />
			</Link>
			<p>
				{currentPage} of {pages}
			</p>
			<Link
				href={nextPageLink as Route}
				className={clsx(isNextPageLinkDisabled && "text-neutral-300")}
			>
				<ArrowRight />
			</Link>
		</nav>
	);
}
