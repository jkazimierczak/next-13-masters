"use server";

import { revalidateTag } from "next/cache";
import { addReview, type ReviewFormData } from "@/api/review";

export async function handleReviewFormAction(formData: ReviewFormData) {
	await addReview(formData);
	revalidateTag("reviews");
}
