import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createStripeInstance } from "@/lib/stripe";

export async function GET(request: NextRequest) {
	const sessionId = request.nextUrl.searchParams.get("sessionId");

	if (!sessionId) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	const stripe = createStripeInstance();
	const session = await stripe.checkout.sessions.retrieve(sessionId);

	const cartId = session.metadata?.cartId;
	if (!cartId) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	cookies().set("cartId", cartId);

	return NextResponse.redirect(new URL("/cart", request.url));
}
