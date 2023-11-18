import { type Route } from "next";
import { ActiveLink } from "@/features/ActiveLink/ActiveLink";

type NavbarMenuProps = {
	links: { href: Route; name: string; exact: boolean }[];
};

export function NavbarMenu({ links }: NavbarMenuProps) {
	return (
		<div className="flex flex-col items-start gap-4 sm:flex-row">
			<nav className="w-full min-w-fit">
				<ul className="flex w-fit flex-col items-start gap-4 sm:flex-row" role="navigation">
					{links.map(({ href, name, exact }) => (
						<li key={href}>
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
		</div>
	);
}
