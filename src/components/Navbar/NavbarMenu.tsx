import "server-only";

import { type Route } from "next";
import { ActiveLink } from "@/features/ActiveLink/ActiveLink";

type NavbarMenuProps = {
	links: { href: Route; name: string; exact: boolean }[];
};

export function NavbarMenu({ links }: NavbarMenuProps) {
	return (
		<div>
			<nav className="items-center gap-8">
				<ul className="w-fit" role="navigation">
					{links.map(({ href, name, exact }) => (
						<li key={href} className="mb-3">
							<ActiveLink href={href} exact={exact}>
								{name}
							</ActiveLink>
						</li>
					))}
				</ul>
			</nav>
			<ActiveLink href="/collections/new-in/1" exact={false}>
				New In
			</ActiveLink>
			<hr className="my-4" />
			<ActiveLink href="/cart" exact={true}>
				Cart
			</ActiveLink>
		</div>
	);
}
