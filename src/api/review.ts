import { z } from "zod";
import { executeGraphQL } from "@/api/graphql";
import { ReviewsGetByProductIdDocument, ReviewAddDocument } from "@/gql/graphql";

export const reviewFormDataSchema = z.object({
	productId: z.string().min(1),
	headline: z.string().min(1),
	content: z.string().min(1),
	rating: z.coerce.number().int().min(0).max(5),
	name: z.string().min(1),
	email: z.string().email(),
});

type ReviewType = z.infer<typeof reviewFormDataSchema>;

export async function addReview(review: ReviewType) {
	console.log(review);

	return executeGraphQL({
		query: ReviewAddDocument,
		variables: {
			...review,
		},
		next: {
			tags: ["reviews"],
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
			tags: ["reviews"],
		},
	});
	return res.reviews;
}
