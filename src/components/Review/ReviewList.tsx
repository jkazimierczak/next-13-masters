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
				<ReviewListItem key={review.id} review={review} />
			))}
		</ul>
	);
}
