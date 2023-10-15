import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";
import { type ReviewFragment } from "@/gql/graphql";

type ReviewSectionLayoutProps = {
	productId: string;
	reviews: ReviewFragment[];
};

export function ReviewsSectionLayout({ productId, reviews }: ReviewSectionLayoutProps) {
	return (
		<div className="mt-10 flex gap-10">
			<div className="w-1/3">
				<h2 className="mb-4 text-4xl font-bold">Add review</h2>
				<p className="mb-4">
					{"You own the record already? That's cool! Give a word to other users about it:"}
				</p>

				<ReviewForm productId={productId} />
			</div>
			<div className="w-2/3">
				<h2 className="mb-4 text-4xl font-bold">Reviews</h2>
				{reviews.length === 0 && <p>This product has no reviews</p>}

				<div>
					<ReviewList reviews={reviews} />
				</div>
			</div>
		</div>
	);
}
