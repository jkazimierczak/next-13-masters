import { Skeleton } from "@/components/ui/skeleton";

export function ProductListItemSkeleton() {
	return (
		<li className="inline-block w-fit sm:w-72">
			<article>
				<div className="overflow-hidden rounded transition-shadow hover:shadow">
					<Skeleton className="h-[300px] w-[300px]" />
				</div>
				<div className="my-1 flex justify-between">
					<Skeleton className="h-7 w-4/5" />
				</div>
				<div className="flex justify-between">
					<Skeleton className="h-6 w-16" data-testid="product-price w-16" />
					<Skeleton className="h-6 w-10" data-testid="product-rating" />
				</div>
			</article>
		</li>
	);
}
