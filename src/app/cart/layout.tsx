import { type Layout } from "@/types/layout";

export default async function CartLayout({ children }: Layout) {
	return <div className="mx-auto max-w-screen-sm px-4 py-6 xl:max-w-screen-lg">{children}</div>;
}