import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type Layout } from "@/types/layout";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: Layout) {
	return (
		<html lang="pl">
			<body className={`${inter.className} flex h-0 min-h-screen flex-col`}>
				<Navbar />
				<div className="flex-grow">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
