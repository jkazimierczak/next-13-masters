"use client";

import React, { useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { setProductQuantityAction } from "@/app/cart/actions";

type CartItemQuantity = {
	quantity: number;
	itemId: string;
};

export function CartItemQuantity({ quantity, itemId }: CartItemQuantity) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

	async function incrementQuantity(formData: FormData) {
		setOptimisticQuantity(optimisticQuantity + 1);
		await setProductQuantityAction(formData);
	}

	async function decrementQuantity(formData: FormData) {
		if (optimisticQuantity > 0) {
			setOptimisticQuantity(optimisticQuantity - 1);
		}
		await setProductQuantityAction(formData);
	}

	return (
		<div className="flex items-stretch divide-x divide-neutral-500 border border-neutral-500">
			<form action={setProductQuantityAction}>
				<input type="text" name="itemId" value={itemId} hidden readOnly />
				<input type="text" name="itemQuantity" value={optimisticQuantity - 1} hidden readOnly />
				<Button data-testid="decrement" formAction={decrementQuantity} variant="ghost" size="icon">
					-
				</Button>
			</form>
			<div className="grid w-12 items-center">
				<span className="text-center" data-testid="quantity">
					{optimisticQuantity}
				</span>
			</div>
			<form action={setProductQuantityAction}>
				<input type="text" name="itemId" value={itemId} hidden readOnly />
				<input type="text" name="itemQuantity" value={optimisticQuantity + 1} hidden readOnly />
				<Button data-testid="increment" formAction={incrementQuantity} variant="ghost" size="icon">
					+
				</Button>
			</form>
		</div>
	);
}
