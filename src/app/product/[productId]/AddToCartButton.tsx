"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function AddToCartButton() {
	const formState = useFormStatus();

	return (
		<Button className="mb-6 w-full" disabled={formState.pending} data-testid="add-to-cart-button">
			Add to cart
		</Button>
	);
}
