"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function AddReviewButton() {
	const formState = useFormStatus();

	return (
		<Button className="mt-2 w-full" disabled={formState.pending} data-testid="add-to-cart-button">
			Add review
		</Button>
	);
}
