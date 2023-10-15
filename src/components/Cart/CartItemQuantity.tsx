"use client";

import React, { experimental_useOptimistic as useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { setProductQuantityAction } from "@/app/cart/actions";

type CartItemQuantity = {
	quantity: number;
	itemId: string;
};

export function CartItemQuantity({ quantity, itemId }: CartItemQuantity) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

	return (
		<div className="flex items-center gap-2">
			<form action={setProductQuantityAction}>
				<input type="text" name="itemId" value={itemId} hidden readOnly />
				<input type="text" name="itemQuantity" value={optimisticQuantity - 1} hidden readOnly />
				<Button
					data-testid="decrement"
					formAction={async (formData) => {
						setOptimisticQuantity(optimisticQuantity - 1);
						await setProductQuantityAction(formData);
					}}
				>
					-
				</Button>
			</form>
			<span data-testid="quantity">{optimisticQuantity}</span>
			<form action={setProductQuantityAction}>
				<input type="text" name="itemId" value={itemId} hidden readOnly />
				<input type="text" name="itemQuantity" value={optimisticQuantity + 1} hidden readOnly />
				<Button
					data-testid="increment"
					formAction={async (formData) => {
						setOptimisticQuantity(optimisticQuantity + 1);
						await setProductQuantityAction(formData);
					}}
				>
					+
				</Button>
			</form>
		</div>
	);
}
