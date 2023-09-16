import { type Metadata } from "next";
import { type Layout } from "@/types/layout";

export const metadata: Metadata = {
	title: "Products",
};

export default function ProductsLayout({ children }: Layout) {
	return <main className="h-full">{children}</main>;
}
