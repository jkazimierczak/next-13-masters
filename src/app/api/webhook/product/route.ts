import { type NextRequest } from "next/server";
import { z } from "zod";
import { verifyWebhookSignature } from "@hygraph/utils";
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
	const signature = request.headers.get("gcms-signature");
	if (!signature) {
		return new Response("Invalid signature", { status: 401 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch (err) {
		return new Response("Invalid request body", { status: 500 });
	}

	const isValid = verifyWebhookSignature({ body, signature, secret: env.WEBHOOK_SECRET });
	if (!isValid) {
		return new Response("Invalid signature", { status: 401 });
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
