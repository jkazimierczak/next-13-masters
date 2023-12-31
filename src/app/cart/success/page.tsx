import { redirect } from "next/navigation";
import { createStripeInstance } from "@/lib/stripe";

type CartSuccessPageProps = {
	searchParams: {
		sessionId?: string;
	};
};

export default async function CartSuccessPage({ searchParams }: CartSuccessPageProps) {
	if (!searchParams.sessionId) {
		redirect("/");
	}

	const stripe = createStripeInstance();
	const session = await stripe.checkout.sessions.retrieve(searchParams.sessionId);

	return (
		<div>
			<h2 className="mb-4 w-fit border-b border-secondary text-3xl font-bold">Payment status</h2>
			<p>
				{session.payment_status === "paid" &&
					"Well done! We received your payment and will ship the records to you ASAP."}
			</p>
		</div>
	);
}
