"use server";

import { revalidateTag } from "next/cache";
import { addReview, type ReviewFormData } from "@/api/review";
import { FetchTag } from "@/lib/fetchtag";

export async function handleReviewFormAction(formData: ReviewFormData) {
	await addReview(formData);
	revalidateTag(FetchTag.REVIEWS);
}
