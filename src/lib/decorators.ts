import { type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { getRequestBody } from "@/lib/hygraph";
import { InvalidApiRequestError } from "@/lib/error";
import { FetchTag } from "@/lib/fetchtag";

export function withSignatureValidation(
	handler: (request: NextRequest, body: unknown) => Promise<Response>,
) {
	return async (request: NextRequest): Promise<Response> => {
		let body: unknown;
		try {
			body = await getRequestBody(request);
		} catch (err) {
			if (err instanceof InvalidApiRequestError) {
				return new Response(err.message, { status: 400 });
			}
			console.error(err);
			return new Response("Invalid request", { status: 400 });
		}

		return handler(request, body);
	};
}

type AsyncFunction = () => Promise<void>;

export async function withRevalidate<T extends AsyncFunction>(func: T, tag: string) {
	await func();

	revalidateTag(tag);
}

export async function withRevalidateCart<T extends AsyncFunction>(func: T) {
	return withRevalidate(func, FetchTag.CART);
}
