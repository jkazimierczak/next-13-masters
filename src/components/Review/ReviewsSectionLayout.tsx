"use client";

import React, { experimental_useOptimistic as useOptimistic } from "react";
import { type ReviewFormData } from "@/api/review";
import { handleReviewFormAction } from "@/app/product/[productId]/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReviewListItem } from "@/components/Review/ReviewListItem";

type ReviewSectionLayoutProps = {
	productId: string;
	children: React.ReactNode;
};

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
					<Input className="mb-2" type="text" name="headline" id="headline" />
					<Label htmlFor="content" className="text-md mb-1 block">
						Content
					</Label>
					<Input className="mb-2" type="text" name="content" id="content" />
					<Label htmlFor="rating" className="text-md mb-1 block">
						Rating
					</Label>
					<Input className="mb-2" type="number" name="rating" id="rating" min={0} max={5} />
					<Label htmlFor="username" className="text-md mb-1 block">
						Username
					</Label>
					<Input className="mb-2" type="text" name="username" id="username" />
					<Label htmlFor="email" className="text-md mb-1 block">
						Email
					</Label>
					<Input className="mb-2" type="email" name="email" id="email" />

					<Button
						className="mt-2 w-full"
						formAction={async () => {
							const newReview = {
								productId: productId,
								name: "optimist123",
								headline: "Optimistic review",
								content: "Optimistic track, really",
								email: "optimist@example.com",
								rating: 3,
							};
							setOptimisticReview(newReview);
							await handleReviewFormAction(newReview);
						}}
					>
						Add review
					</Button>
				</form>
			</div>
			<div className="w-2/3">
				<h2 className="mb-4 text-4xl font-bold">Reviews</h2>
				{optimisticReview && <ReviewListItem review={{ id: "", ...optimisticReview }} />}
				{reviewListChildren}
			</div>
		</div>
	);
}
