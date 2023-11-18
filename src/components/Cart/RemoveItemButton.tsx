"use client";

import { useFormStatus } from "react-dom";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RemoveItemButton() {
	const formState = useFormStatus();

	return (
		<Button disabled={formState.pending} variant="ghost" size="icon">
			<Trash />
		</Button>
	);
}
