import { type Route } from "next";
import { ActiveLink } from "@/components/ActiveLink/ActiveLink";

type NavbarMenuProps = {
	links: { href: Route; name: string; exact: boolean }[];
};

export function NavbarMenu({ links }: NavbarMenuProps) {
	return (
		<div className="flex flex-col items-start gap-4 md:flex-row">
			<nav className="w-full min-w-fit">
				<ul className="flex w-fit flex-col items-start gap-4 md:flex-row" role="navigation">
					{links.map(({ href, name, exact }) => (
						<li key={href} className="min-w-fit">
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
