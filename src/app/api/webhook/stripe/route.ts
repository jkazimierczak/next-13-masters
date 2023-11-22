import { type NextRequest } from "next/server";
import { createStripeInstance } from "@/lib/stripe";
import { env } from "@/env.mjs";

export async function POST(request: NextRequest): Promise<Response> {
	const stripe = createStripeInstance();

	const signature = request.headers.get("stripe-signature");
	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		env.STRIPE_WEBHOOK_SECRET,
	);

	switch (event.type) {
		case "checkout.session.completed": {
			console.log("checkout.session.completed::metadata", event.data.object.metadata);
		}
		case "checkout.session.expired": {
		}
	}

	return new Response(null, { status: 204 });
}
