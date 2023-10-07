import { z } from "zod";

export const itemIdFormDataSchema = z.object({
	itemId: z.string(),
});
