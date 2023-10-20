import { type NextRequest } from "next/server";
import { z } from "zod";
import { algoliaIndex, mapProductToAlgoliaRecord } from "@/lib/algolia";
import { getProductById } from "@/api/products";
import { env } from "@/env.mjs";

const addProductSchema = z.object({
	operation: z.string(),
	data: z.object({
		id: z.string(),
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

	const parsed = await addProductSchema.safeParseAsync(body);
	if (parsed.success) {
		const payload = parsed.data;

		const product = await getProductById(payload.data.id);
		if (!product) {
			return new Response(null, { status: 400 });
		}
		const algoliaProduct = mapProductToAlgoliaRecord(product);
		await algoliaIndex.saveObject(algoliaProduct);

		return new Response(null, { status: 204 });
	}

	return new Response(null, { status: 400 });
}
