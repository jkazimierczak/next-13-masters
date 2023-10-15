"use client";

import React, { experimental_useOptimistic as useOptimistic, useRef } from "react";
import { type ReviewFormData, reviewFormDataSchema } from "@/api/review";
import { handleReviewFormAction } from "@/app/product/[productId]/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReviewListItem } from "@/components/Review/ReviewListItem";

type ReviewSectionLayoutProps = {
	productId: string;
	children: React.ReactNode;
};

function isOptimisticReviewValid(review: ReviewFormData) {
	const parsed = reviewFormDataSchema.safeParse(review);
	return parsed.success;
}

export function ReviewsSectionLayout({
	productId,
	children: reviewListChildren,
}: ReviewSectionLayoutProps) {
	const [optimisticReview, setOptimisticReview] = useOptimistic<ReviewFormData>({
		productId: productId,
		headline: "",
		content: "",
		rating: 0,
		name: "",
		email: "",
	});
	const headlineRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLInputElement>(null);
	const ratingRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	return (
		<div className="mt-10 flex gap-10">
			<div className="w-1/3">
				<h2 className="mb-4 text-4xl font-bold">Add review</h2>
				<p className="mb-4">
					{"You own the record already? That's cool! Give a word to other users about it:"}
				</p>

				<form data-testid="add-review-form">
					<input type="text" name="productId" value={productId} readOnly hidden />
					<Label htmlFor="headline" className="text-md mb-1 block">
						Headline
					</Label>
					<Input
						ref={headlineRef}
						className="mb-2"
						type="text"
						name="headline"
						id="headline"
						required
					/>
					<Label htmlFor="content" className="text-md mb-1 block">
						Content
					</Label>
					<Input
						ref={contentRef}
						className="mb-2"
						type="text"
						name="content"
						id="content"
						required
					/>
					<Label htmlFor="rating" className="text-md mb-1 block">
						Rating
					</Label>
					<Input
						ref={ratingRef}
						className="mb-2"
						type="number"
						name="rating"
						id="rating"
						min={1}
						max={5}
						required
					/>
					<Label htmlFor="name" className="text-md mb-1 block">
						Username
					</Label>
					<Input ref={nameRef} className="mb-2" type="text" name="name" id="name" required />
					<Label htmlFor="email" className="text-md mb-1 block">
						Email
					</Label>
					<Input ref={emailRef} className="mb-2" type="email" name="email" id="email" required />

					<Button
						className="mt-2 w-full"
						formAction={async () => {
							const newReview = {
								productId: productId,
								name: nameRef.current?.value || "",
								headline: headlineRef.current?.value || "",
								content: contentRef.current?.value || "",
								email: emailRef.current?.value || "",
								rating: ratingRef.current?.valueAsNumber || 0,
							};

							const isValid = isOptimisticReviewValid(newReview);
							if (isValid) {
								setOptimisticReview(newReview);
								await handleReviewFormAction(newReview);
							}
						}}
					>
						Add review
					</Button>
				</form>
			</div>
			<div className="w-2/3">
				<h2 className="mb-4 text-4xl font-bold">Reviews</h2>
				{isOptimisticReviewValid(optimisticReview) && (
					<div className="animate-pulse">
						<ReviewListItem review={{ id: "", ...optimisticReview }} />
					</div>
				)}
				{reviewListChildren}
			</div>
		</div>
	);
}
