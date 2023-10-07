"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { removeItem } from "@/app/cart/actions";

type RemoveItemButtonProps = {
	productId: string;
};

export function RemoveItemButton({ productId }: RemoveItemButtonProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeItem(productId);
					router.refresh();
				});
			}}
			variant="destructive"
			size="default"
		>
			Remove
		</Button>
	);
}
