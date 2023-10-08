import Stripe from "stripe";

export function createStripeInstance() {
	const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

	if (!stripeSecretKey) {
		throw new Error("STRIPE_SECRET_KEY is not defined");
	}

	return new Stripe(stripeSecretKey, {
		apiVersion: "2023-08-16",
		typescript: true,
	});
}
