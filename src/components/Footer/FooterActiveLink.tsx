import "client-only";

import { ActiveLink, type ActiveLinkProps } from "@/components/ActiveLink/ActiveLink";

type FooterActiveLinkProps<T extends string> = Pick<ActiveLinkProps<T>, "children" | "href">;

export function FooterActiveLink<T extends string>({ children, href }: FooterActiveLinkProps<T>) {
	return (
		<ActiveLink href={href} exact={true} className="border-transparent">
			{children}
		</ActiveLink>
	);
}
