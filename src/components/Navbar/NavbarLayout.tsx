"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Search } from "@/components/Navbar/Search";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/useToggle";
import { ScreenMarginLayout } from "@/components/Layouts/ScreenMarginLayout";

type NavbarLayoutProps = {
	menuNode: React.ReactNode;
	cartNode: React.ReactNode;
};

export function NavbarLayout({ menuNode, cartNode }: NavbarLayoutProps) {
	const { value: isMenuOpen, toggle: toggleMenuOpen } = useToggle(true);

	return (
		<ScreenMarginLayout className="sticky flex w-full items-center justify-between gap-4 bg-background py-4 text-white shadow">
			<Link href="/" className="flex-shrink-0">
				<Image width={36} height={36} src="/logo.svg" alt="Logo" />
			</Link>

			<Search />

			{cartNode}

			<Button onClick={toggleMenuOpen} size="icon" className="flex-shrink-0">
				<Menu />
			</Button>

			{isMenuOpen && (
				<div className="absolute inset-0 h-screen bg-black/80" onClick={toggleMenuOpen}>
					<div className="absolute left-0 top-0 w-full bg-background px-5 py-4">
						<div className="mb-4 flex items-center justify-between gap-4">
							<Link href="/" className="flex-shrink-0">
								<Image width={36} height={36} src="/logo.svg" alt="Logo" />
							</Link>

							<Button size="icon" className="flex-shrink-0">
								<X />
							</Button>
						</div>
						<div>{menuNode}</div>
					</div>
				</div>
			)}
		</ScreenMarginLayout>
	);
}
