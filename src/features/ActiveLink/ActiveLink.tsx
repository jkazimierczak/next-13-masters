"use client";

import { type Route } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import { useActiveLink } from "@/features/ActiveLink/useActiveLink";

type ActiveLinkProps = { children: React.ReactNode; href: Route; exact: boolean };

export function ActiveLink({ children, href, exact }: ActiveLinkProps) {
	const { isActive } = useActiveLink({ href, exact });

	return (
		<Link
			href={href}
			className={clsx({
				"border-b border-sky-500 text-sky-500": isActive,
			})}
		>
			{children}
		</Link>
	);
}
