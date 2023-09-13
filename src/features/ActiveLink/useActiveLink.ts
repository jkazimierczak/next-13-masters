import { type Route } from "next";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type UseActiveLinkParams = {
	href: Route;
	exact: boolean;
};

function createRegExp({ href, exact }: UseActiveLinkParams) {
	if (exact) {
		return new RegExp(`^/href(?:/?|#.*|\\?.*)$`.replace("/href", href));
	} else {
		return new RegExp(`^/href(?:/.*|#.*|\\?.*)?$`.replace("/href", href));
	}
}

export function isLinkActive({ href, exact }: UseActiveLinkParams) {
	const pathname = window.location.href.replace(window.location.origin, "");
	const regex = createRegExp({ href, exact });

	const match = pathname.match(regex);
	return !!match;
}

export function useActiveLink({ href, exact }: UseActiveLinkParams) {
	const [isActive, setIsActive] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsActive(isLinkActive({ href, exact }));
	}, [href, exact, pathname]);

	return {
		isActive,
	};
}
