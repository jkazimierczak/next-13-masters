import { type NextRequest } from "next/server";
import { z } from "zod";
import { algoliaIndex, mapProductToAlgoliaRecord } from "@/lib/algolia";
import { getProductById } from "@/api/products";
import { getRequestBody } from "@/lib/hygraph";
import { InvalidApiRequestError } from "@/lib/error";

const addProductSchema = z.object({
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
