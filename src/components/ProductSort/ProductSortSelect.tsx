"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";
import { type Route } from "next";

const defaultSortOrder = "none";

export function ProductSortSelect() {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const sortOrder = searchParams.get("sort") ?? defaultSortOrder;

	function handleSortSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const sortOrder = event.target.value;
		let routeWithSortOrder: Route;

		if (sortOrder === defaultSortOrder) {
			routeWithSortOrder = pathname as Route;
		} else {
			routeWithSortOrder = `${pathname}?sort=${encodeURIComponent(sortOrder)}` as Route;
		}

		router.push(routeWithSortOrder);
	}

	return (
		<select name="productOrder" defaultValue={sortOrder} onChange={handleSortSelectChange}>
			<option value="none">Sort by:</option>
			<option value="price_ASC" data-testid="sort-by-price">
				Price: low to high
			</option>
			<option value="price_DESC" data-testid="sort-by-price">
				Price: high to low
			</option>
		</select>
	);
}
