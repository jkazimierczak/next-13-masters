"use server";

import { addReview, reviewFormDataSchema } from "@/api/review";

export async function handleReviewFormAction(formData: FormData) {
	const parsed = reviewFormDataSchema.parse({
		productId: formData.get("productId"),
		headline: formData.get("headline"),
		content: formData.get("content"),
		rating: formData.get("rating"),
		name: formData.get("username"),
		email: formData.get("email"),
	});

	await addReview(parsed);
}
