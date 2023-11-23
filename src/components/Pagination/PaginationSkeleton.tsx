import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function PaginationSkeleton() {
	return (
		<nav className="flex gap-4" aria-label="pagination">
			<div className="text-neutral-300">
				<ArrowLeft />
			</div>
			<Skeleton className="h-6 tabular-nums text-transparent">1 of 3</Skeleton>
			<div className="text-neutral-300">
				<ArrowRight />
			</div>
		</nav>
	);
}
