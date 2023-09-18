import Link from "next/link";
import Image from "next/image";
import { ActiveLink } from "@/features/ActiveLink/ActiveLink";

export function Navbar() {
	return (
		<nav className="bg-background sticky flex w-full items-center justify-between px-5 py-4 text-white shadow md:px-12 lg:px-24">
			<Link href="/">
				<Image width={36} height={36} src="/logo.svg" alt="Logo" />
			</Link>
			<ul className="flex w-fit gap-6" role="navigation">
				<li>
					<ActiveLink href={"/"} exact={true}>
						Home
					</ActiveLink>
				</li>
				<li>
					<ActiveLink href={"/products"} exact={false}>
						All
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
}