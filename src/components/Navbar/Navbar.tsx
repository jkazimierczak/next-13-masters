import Link from "next/link";
import Image from "next/image";
import { type Route } from "next";
import { ShoppingCart } from "lucide-react";
import { Search } from "./Search";
import { ActiveLink } from "@/features/ActiveLink/ActiveLink";
import { getCartFromCookies } from "@/api/cart";

const links: { href: Route; name: string; exact: boolean }[] = [
	{ href: "/", name: "Home", exact: true },
	{ href: "/products", name: "All", exact: false },
	{ href: "/categories/pop-and-rock/1" as Route, name: "Pop & Rock", exact: false },
	{ href: "/categories/reggae-and-dub/1" as Route, name: "Reggae & Dub", exact: false },
];

const defaultCartQuantity = 0;

export async function Navbar() {
	const cart = await getCartFromCookies();
	const quantity = cart
		? cart.orderItems.reduce((acc, item) => acc + item.quantity, 0)
		: defaultCartQuantity;

	return (
		<div className="sticky flex w-full items-center justify-between bg-background px-5 py-4 text-white shadow md:px-12 lg:px-24">
			<nav className="flex items-center gap-8">
				<Link href="/">
					<Image width={36} height={36} src="/logo.svg" alt="Logo" />
				</Link>
				<ul className="flex w-fit gap-6" role="navigation">
					{links.map(({ href, name, exact }) => (
						<li key={href}>
							<ActiveLink href={href} exact={exact}>
								{name}
							</ActiveLink>
						</li>
					))}
				</ul>
			</nav>

			<Search />

			<Link href={"/cart"}>
				<div className="flex items-center gap-2">
					<span className="h-6 w-6 rounded-full bg-primary text-center text-sm font-semibold">
						{quantity}
					</span>
					<ShoppingCart />
				</div>
			</Link>
		</div>
	);
}
