"use client";

import { type Route } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import React from "react";
import { useActiveLink } from "@/features/ActiveLink/useActiveLink";

type ActiveLinkProps<T extends string> = {
	children: React.ReactNode;
	href: Route<T>;
	exact: boolean;
};

export function ActiveLink<T extends string>({ children, href, exact }: ActiveLinkProps<T>) {
	const { isActive } = useActiveLink({ href, exact });

	return (
		<Link
			href={href}
			aria-current={isActive ? true : undefined}
			className={clsx({
				"border-b border-primary text-primary": isActive,
			})}
		>
			{children}
		</Link>
	);
}
