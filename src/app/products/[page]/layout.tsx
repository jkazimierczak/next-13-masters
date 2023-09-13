import { type Metadata } from "next";
import { type Layout } from "@/types/layout";

export const metadata: Metadata = {
	title: "Products",
};

export default function ProductsLayout({ children }: Layout) {
	return <main className="mx-auto max-w-screen-2xl">{children}</main>;
}
