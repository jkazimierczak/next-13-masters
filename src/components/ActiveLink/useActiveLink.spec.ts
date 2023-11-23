import { afterEach, describe, expect, it } from "vitest";
import { isLinkActive } from "./useActiveLink";

const goTo = (path: string) => {
	const origin = window.location.origin;

	Object.defineProperty(window, "location", {
		value: new URL(`${origin}${path}`),
	});
};

describe("ActiveLink", () => {
	const originalWindowLocation = window.location;

	afterEach(() => {
		Object.defineProperty(window, "location", {
			value: originalWindowLocation,
		});
	});

	it("matches regular paths", () => {
		goTo("/");
		expect(isLinkActive({ href: "/", exact: true })).toBeTruthy();
		expect(isLinkActive({ href: "/", exact: false })).toBeTruthy();
	});

	it("matches paths with params", () => {
		goTo("/products");
		expect(isLinkActive({ href: "/products", exact: true })).toBeTruthy();
		expect(isLinkActive({ href: "/products", exact: false })).toBeTruthy();

		goTo("/products/"); // Trailing slash
		expect(isLinkActive({ href: "/products", exact: true })).toBeTruthy();
		expect(isLinkActive({ href: "/products", exact: false })).toBeTruthy();

		goTo("/products/4");
		expect(isLinkActive({ href: "/products", exact: true })).toBeFalsy();
		expect(isLinkActive({ href: "/products", exact: false })).toBeTruthy();
	});

	it("matches paths with with query params", () => {
		goTo("/products?ref=someReferralID");
		expect(isLinkActive({ href: "/products", exact: true })).toBeTruthy();
		expect(isLinkActive({ href: "/products", exact: false })).toBeTruthy();
	});

	it("matches paths with #id", () => {
		goTo("/products#some-id");
		expect(isLinkActive({ href: "/products", exact: true })).toBeTruthy();
		expect(isLinkActive({ href: "/products", exact: false })).toBeTruthy();
	});

	it("matches paths with #id and query params", () => {
		goTo("/products#some-id?key=value");
		expect(isLinkActive({ href: "/products", exact: true })).toBeTruthy();
		expect(isLinkActive({ href: "/products", exact: false })).toBeTruthy();

		goTo("/products/1#some-id?key=value");
		expect(isLinkActive({ href: "/products", exact: true })).toBeFalsy();
		expect(isLinkActive({ href: "/products", exact: false })).toBeTruthy();
	});
});
