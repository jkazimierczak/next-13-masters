import { ProductListItemSkeleton } from "@/components/ProductList/ProductListItemSkeleton";

export function ProductListSkeleton() {
	return (
		<ul className="grid w-fit gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{Array.from({ length: 3 }).map((_, idx) => (
				<ProductListItemSkeleton key={`ProductListItemSkeleton${idx}`} />
			))}
		</ul>
	);
}
