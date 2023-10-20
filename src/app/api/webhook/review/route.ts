import { type NextRequest } from "next/server";
import { z } from "zod";
import { updateAverageProductRating } from "@/api/review";
import { publishProduct } from "@/api/products";
import { env } from "@/env.mjs";

const revalidateProductSchema = z.object({
	operation: z.string(),
	data: z.object({
		product: z.object({
			id: z.string(),
		}),
	}),
});

export async function POST(request: NextRequest): Promise<Response> {
	const requestKey = request.headers.get("X-API-KEY");
	if (requestKey !== env.WEBHOOK_SECRET) {
		return new Response("Invalid credentials", { status: 401 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch (err) {
		return new Response("Invalid request body", { status: 500 });
	}

	const parsed = await revalidateProductSchema.safeParseAsync(body);
	if (parsed.success) {
		const payload = parsed.data;
		const productId = payload.data.product.id;

		await updateAverageProductRating(productId);
		await publishProduct(productId);

		return new Response(null, { status: 204 });
	}

	return new Response(null, { status: 400 });
}
