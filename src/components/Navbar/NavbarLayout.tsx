"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { type Route } from "next";
import { Search } from "@/components/Navbar/Search";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/useToggle";
import { ScreenMarginLayout } from "@/components/Layouts/ScreenMarginLayout";
import { cn } from "@/lib/utils";
import { NavbarMenu } from "@/components/Navbar/NavbarMenu";
import { SearchSkeleton } from "@/components/Navbar/SearchSkeleton";

type NavbarLayoutProps = {
	cartNode: React.ReactNode;
};

const links: { href: Route; name: string; exact: boolean }[] = [
	{ href: "/", name: "Home", exact: true },
	{ href: "/products", name: "All", exact: false },
	{ href: "/categories/pop-and-rock/1" as Route, name: "Pop & Rock", exact: false },
	{ href: "/categories/reggae-and-dub/1" as Route, name: "Reggae & Dub", exact: false },
];

export function NavbarLayout({ cartNode }: NavbarLayoutProps) {
	const { value: isMenuOpen, toggle: toggleMenuOpen } = useToggle(false);

	const menuNode = <NavbarMenu links={links} />;

	return (
		<ScreenMarginLayout
			className={cn({
				"sticky w-full bg-background py-4 text-white shadow": true,
			})}
		>
			<div className="flex items-center justify-between gap-3 md:flex-row">
				<div className="flex items-center gap-3">
					<Link href="/" className="flex-shrink-0">
						<Image width={36} height={36} src="/logo.svg" alt="Logo" />
					</Link>
					<div className="hidden md:block">{menuNode}</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex-shrink">
						<Suspense fallback={<SearchSkeleton />}>
							<Search />
						</Suspense>
					</div>
					{cartNode}
					<Button onClick={toggleMenuOpen} size="icon" className="flex-shrink-0 md:hidden">
						{isMenuOpen ? <X /> : <Menu />}
					</Button>
				</div>
			</div>

			{isMenuOpen && <div className="order-3 mt-3 w-full md:hidden">{menuNode}</div>}
		</ScreenMarginLayout>
	);
}
