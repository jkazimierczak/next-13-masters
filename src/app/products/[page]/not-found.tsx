import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "Products page not found",
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
					<h1 className="text-balance mb-4 text-6xl font-bold">
						{"You have reached the page's edge"}
					</h1>
					<p className="mb-8 text-xl">{"None but devils browse past here..."}</p>
					<Link
						href="/products"
						prefetch={true}
						className="rounded bg-black px-4 py-2 text-center font-semibold text-white"
					>
						Fast travel to all products
					</Link>
				</div>
			</div>
		</>
	);
}
