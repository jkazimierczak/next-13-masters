import { z } from "zod";

export const removeItemFromCartFormDataSchema = z.object({
	itemId: z.string(),
});
