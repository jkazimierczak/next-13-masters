import "server-only";

import { type Route } from "next";
import { NavbarCart } from "@/components/Navbar/NavbarCart";
import { NavbarLayout } from "@/components/Navbar/NavbarLayout";
import { NavbarMenu } from "@/components/Navbar/NavbarMenu";

const links: { href: Route; name: string; exact: boolean }[] = [
	{ href: "/", name: "Home", exact: true },
	{ href: "/products", name: "All", exact: false },
	{ href: "/categories/pop-and-rock/1" as Route, name: "Pop & Rock", exact: false },
	{ href: "/categories/reggae-and-dub/1" as Route, name: "Reggae & Dub", exact: false },
];

export async function Navbar() {
	return <NavbarLayout menuNode={<NavbarMenu links={links} />} cartNode={<NavbarCart />} />;
}
