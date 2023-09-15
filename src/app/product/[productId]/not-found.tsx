import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
	// title: "Product not found",  // TODO: https://github.com/vercel/next.js/issues/45620
	robots: {
		index: false,
		follow: true,
	},
};

export default function NotFound() {
	return (
		<>
			<div className="grid h-full items-center">
				<div className="text-center">
					<h1 className="mb-4 text-6xl font-bold">Product not found</h1>
					<p className="mb-8 text-xl">{"It must've been just a dream."}</p>
					<Link
						href="/products"
						prefetch={true}
						className="rounded bg-black px-4 py-2 text-center font-semibold text-white"
					>
						Take me back to all products
					</Link>
				</div>
			</div>
		</>
	);
}
