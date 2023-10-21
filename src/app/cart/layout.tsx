import { type Layout } from "@/types/layout";

export default async function CartLayout({ children }: Layout) {
	return (
		<div className="mx-auto max-w-screen-sm px-4 py-6 xl:max-w-screen-lg">
			<h1 className="mb-4 w-fit border-b border-secondary text-3xl font-bold">Your Cart</h1>
			{children}
		</div>
	);
}