"use client";

import { FooterActiveLink } from "@/components/Footer/FooterActiveLink";

export function FooterLinks() {
	return (
		<ul className="mb-1 flex items-center justify-center gap-2">
			<li>
				<FooterActiveLink href="/policies/privacy">Privacy policy</FooterActiveLink>
			</li>
			<li>
				<FooterActiveLink href="/policies/terms">Terms & conditions</FooterActiveLink>
			</li>
		</ul>
	);
}
