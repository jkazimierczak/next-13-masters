import { Skeleton } from "@/components/ui/skeleton";

export function ProductSortSkeleton() {
	return (
		<div className="w-48 rounded border border-neutral-200 bg-white px-4 py-2 font-sans">
			<Skeleton className="h-5 w-24" />
		</div>
	);
}
