/// <reference types="stripe-event-types" />
import { type NextRequest } from "next/server";
import type Stripe from "stripe";
import { createStripeInstance } from "@/lib/stripe";

export async function POST(request: NextRequest): Promise<Response> {
	const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!stripeWebhookSecret) {
		throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
	}

	const stripe = createStripeInstance();

	const signature = request.headers.get("stripe-signature");
	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		stripeWebhookSecret,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case "checkout.session.completed": {
			console.log("checkout.session.completed::metadata", event.data.object.metadata);
		}
		case "checkout.session.expired": {
		}
	}

	return new Response(null, { status: 204 });
}
