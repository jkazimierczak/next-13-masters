import React, { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type AddReviewButtonProps = Pick<ComponentProps<"button">, "formAction" | "className">;

export function AddReviewButton({ formAction, className }: AddReviewButtonProps) {
	const formStatus = useFormStatus();

	return (
		<Button className={className} disabled={formStatus.pending} formAction={formAction}>
			Add review
		</Button>
	);
}
