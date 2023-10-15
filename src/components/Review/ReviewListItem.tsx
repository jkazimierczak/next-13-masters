import { type ReviewFragment } from "@/gql/graphql";

type ReviewListItemProps = {
	review: ReviewFragment;
};

export function ReviewListItem({ review }: ReviewListItemProps) {
	return (
		<li className="mb-6">
			<p className="flex items-center gap-4">
				<span>{review.rating} ★</span>
				<span className="text-xl font-semibold">{review.headline}</span>
			</p>
			<p className="mb-2 ml-11 text-neutral-500">Added by: {review.name}</p>
			<p>{review.content}</p>
		</li>
	);
}
