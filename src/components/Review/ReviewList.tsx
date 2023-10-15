import "server-only";

import { type ReviewFragment } from "@/gql/graphql";
import { ReviewListItem } from "@/components/Review/ReviewListItem";

type ReviewListProps = {
	reviews: ReviewFragment[];
};

export function ReviewList({ reviews }: ReviewListProps) {
	return (
		<ul>
			{reviews.map((review) => (
				<li key={review.id} className="mb-6">
					<ReviewListItem review={review} />
				</li>
			))}
		</ul>
	);
}
