import "server-only";

import { NavbarCart } from "@/components/Navbar/NavbarCart";
import { NavbarLayout } from "@/components/Navbar/NavbarLayout";

export async function Navbar() {
	return <NavbarLayout cartNode={<NavbarCart />} />;
}
