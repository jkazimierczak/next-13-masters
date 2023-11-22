import { z } from "zod";
import { executeGraphQL } from "@/api/graphql";
import {
	ReviewsGetByProductIdDocument,
	ReviewAddDocument,
	ReviewsGetRatingAndCountByProductIdDocument,
	ReviewsUpdateProductAverageRatingDocument,
} from "@/gql/graphql";
import { FetchTag } from "@/lib/fetchtag";

export const reviewFormDataSchema = z.object({
	productId: z.string().min(1),
	headline: z.string().min(1),
	content: z.string().min(1),
	rating: z.coerce.number().int().min(1).max(5),
	name: z.string().min(1),
	email: z.string().email(),
});

export type ReviewFormData = z.infer<typeof reviewFormDataSchema>;

export async function addReview(review: ReviewFormData) {
	return executeGraphQL({
		query: ReviewAddDocument,
		variables: {
			...review,
		},
		next: {
			tags: [FetchTag.REVIEWS],
		},
	});
}

export async function getReviewsByProductId(productId: string) {
	const res = await executeGraphQL({
		query: ReviewsGetByProductIdDocument,
		variables: {
			productId,
		},
		next: {
			tags: [FetchTag.REVIEWS],
		},
	});
	return res.reviews;
}

export async function calculateAverageProductRatingById(productId: string) {
	const res = await executeGraphQL({
		query: ReviewsGetRatingAndCountByProductIdDocument,
		variables: {
			productId,
		},
		cache: "no-store",
	});
	const totalRating = res.reviews.reduce((acc, review) => acc + (review.rating ?? 0), 0);
	const reviewCount = res.reviewsConnection.aggregate.count;
	return totalRating / reviewCount;
}

export async function updateAverageProductRating(productId: string) {
	const averageRating = await calculateAverageProductRatingById(productId);

	return executeGraphQL({
		query: ReviewsUpdateProductAverageRatingDocument,
		variables: {
			productId,
			averageRating,
		},
	});
}
