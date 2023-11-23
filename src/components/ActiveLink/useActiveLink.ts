import { type Route } from "next";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type UseActiveLinkParams<T extends string> = {
	href: Route<T>;
	exact: boolean;
};

function createRegExp<T extends string>({ href, exact }: UseActiveLinkParams<T>) {
	if (exact) {
		return new RegExp(`^/href(?:/?|#.*|\\?.*)$`.replace("/href", href));
	} else {
		return new RegExp(`^/href(?:/.*|#.*|\\?.*)?$`.replace("/href", href));
	}
}

export function isLinkActive<T extends string>({ href, exact }: UseActiveLinkParams<T>) {
	const pathname = window.location.href.replace(window.location.origin, "");
	const regex = createRegExp({ href, exact });

	const match = pathname.match(regex);
	return !!match;
}

export function useActiveLink<T extends string>({ href, exact }: UseActiveLinkParams<T>) {
	const [isActive, setIsActive] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsActive(isLinkActive({ href, exact }));
	}, [href, exact, pathname]);

	return {
		isActive,
	};
}
