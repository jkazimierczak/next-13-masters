import { type NextRequest } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getRequestBody } from "@/lib/hygraph";
import { InvalidApiRequestError } from "@/lib/error";

const revalidateProductSchema = z.object({
	operation: z.string(),
	data: z.object({
		id: z.string(),
	}),
});

export async function POST(request: NextRequest): Promise<Response> {
	let body: unknown;
	try {
		body = await getRequestBody(request);
	} catch (err) {
		if (err instanceof InvalidApiRequestError) {
			return new Response(err.message, { status: 400 });
		}
		return new Response("Invalid request", { status: 400 });
	}

	const parsed = await revalidateProductSchema.safeParseAsync(body);
	if (parsed.success) {
		const payload = parsed.data;
		revalidatePath("/products");
		revalidatePath(`/product/${payload.data.id}`);

		return new Response(null, { status: 204 });
	}

	return new Response(null, { status: 400 });
}