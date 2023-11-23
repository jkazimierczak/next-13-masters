import { ActiveLink } from "@/components/ActiveLink/ActiveLink";

export function FooterLinks() {
	return (
		<ul className="mb-1 flex items-center justify-center gap-2">
			<li>
				<ActiveLink href="/policies/privacy" exact={true}>
					Privacy policy
				</ActiveLink>
			</li>
			<li>
				<ActiveLink href="/policies/terms" exact={true}>
					Terms & conditions
				</ActiveLink>
			</li>
		</ul>
	);
}
