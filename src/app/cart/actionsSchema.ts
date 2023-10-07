import { z } from "zod";

export const itemIdFormDataSchema = z.object({
	itemId: z.string(),
});

export const itemSetQuantityFormDataSchema = z.object({
	itemId: z.string(),
	quantity: z.coerce.number(),
});
