import { type Layout } from "@/types/layout";

export default function ProductPageLayout({ children }: Layout) {
	return <article className="mx-auto h-full max-w-screen-2xl p-7">{children}</article>;
}
