import { type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@hygraph/utils";
import { env } from "@/env.mjs";
import { InvalidApiRequestError } from "@/lib/error";

export async function getRequestBody(request: NextRequest) {
	const signature = request.headers.get("gcms-signature");
	if (!signature) {
		throw new InvalidApiRequestError("Invalid signature");
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch (err) {
		throw new InvalidApiRequestError("Invalid request body");
	}

	const isValid = verifyWebhookSignature({ body, signature, secret: env.WEBHOOK_SECRET });
	if (!isValid) {
		throw new InvalidApiRequestError("Invalid signature");
	}

	return body;
}
