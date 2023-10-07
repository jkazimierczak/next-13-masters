"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function DecrementProductQuantityButton() {
	const formState = useFormStatus();

	return (
		<Button disabled={formState.pending} size="icon">
			-
		</Button>
	);
}
