"use client";

import { type Route } from "next";
import Link from "next/link";
import React from "react";
import { useActiveLink } from "@/components/ActiveLink/useActiveLink";
import { cn } from "@/lib/utils";

export type ActiveLinkProps<T extends string> = {
	children: React.ReactNode;
	href: Route<T>;
	exact: boolean;
	className?: string;
};

export function ActiveLink<T extends string>({
	children,
	href,
	exact,
	className,
}: ActiveLinkProps<T>) {
	const { isActive } = useActiveLink({ href, exact });

	return (
		<Link
			href={href}
			aria-current={isActive ? true : undefined}
			className={cn(
				{
					"min-w-fit transition-colors duration-100 hover:text-primary": true,
					"border-b border-primary text-primary": isActive,
				},
				className,
			)}
		>
			{children}
		</Link>
	);
}
