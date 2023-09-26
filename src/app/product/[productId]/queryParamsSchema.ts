import { z } from "zod";

export const vinylRecordURLSafe = encodeURIComponent("Vinyl Record");
export const queryParamsSchema = z.object({
	format: z.enum(["CD", vinylRecordURLSafe]).catch(vinylRecordURLSafe),
});
