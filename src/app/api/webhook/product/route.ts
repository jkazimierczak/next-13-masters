import { type NextRequest } from "next/server";
import { z } from "zod";
import { algoliaIndex, mapProductToAlgoliaRecord } from "@/lib/algolia";
import { getProductById } from "@/api/products";

const addProductSchema = z.object({
	operation: z.string(),
	data: z.object({
		id: z.string(),
	}),
});

export async function POST(request: NextRequest): Promise<Response> {
	const webhookSecret = process.env.WEBHOOK_SECRET;
	if (!webhookSecret) {
		throw new Error("WEBHOOK_SECRET is not defined");
	}

	const requestKey = request.headers.get("X-API-KEY");
	if (requestKey !== webhookSecret) {
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
