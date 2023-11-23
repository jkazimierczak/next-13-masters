import { type NextRequest } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { withSignatureValidation } from "@/lib/decorators";

const revalidateProductSchema = z.object({
	operation: z.string(),
	data: z.object({
		id: z.string(),
	}),
});

async function handlePOST(request: NextRequest, body: unknown): Promise<Response> {
	const parsed = await revalidateProductSchema.safeParseAsync(body);
	if (parsed.success) {
		const payload = parsed.data;
		revalidatePath("/products");
		revalidatePath(`/product/${payload.data.id}`);

		return new Response(null, { status: 204 });
	}

	return new Response(null, { status: 400 });
}

export const POST = withSignatureValidation(handlePOST);
