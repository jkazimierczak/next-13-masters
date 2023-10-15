"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function RemoveItemButton() {
	const formState = useFormStatus();

	return (
		<Button disabled={formState.pending} variant="destructive" size="default">
			Remove
		</Button>
	);
}
