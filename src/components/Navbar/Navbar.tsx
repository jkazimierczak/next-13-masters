import Link from "next/link";
import Image from "next/image";
import { type Route } from "next";
import { Search } from "./Search";
import { ActiveLink } from "@/features/ActiveLink/ActiveLink";

const links: { href: Route; name: string; exact: boolean }[] = [
	{ href: "/", name: "Home", exact: true },
	{ href: "/products", name: "All", exact: false },
	{ href: "/categories/pop-and-rock" as Route, name: "Pop & Rock", exact: false },
	{ href: "/categories/reggae-and-dub" as Route, name: "Reggae & Dub", exact: false },
];

export function Navbar() {
	return (
		<nav className="sticky flex w-full items-center justify-between bg-background px-5 py-4 text-white shadow md:px-12 lg:px-24">
			<div className="flex items-center gap-8">
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
			</div>
			<Search />
		</nav>
	);
}
