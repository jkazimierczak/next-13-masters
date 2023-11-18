"use client";

import { type Route } from "next";
import Link from "next/link";
import React from "react";
import { useActiveLink } from "@/features/ActiveLink/useActiveLink";
import { cn } from "@/lib/utils";

type ActiveLinkProps<T extends string> = {
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
					"min-w-fit": true,
					"border-b border-primary text-primary": isActive,
				},
				className,
			)}
		>
			{children}
		</Link>
	);
}
