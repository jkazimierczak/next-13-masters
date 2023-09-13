import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "Products",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
	return <main className="mx-auto max-w-screen-2xl">{children}</main>;
}
