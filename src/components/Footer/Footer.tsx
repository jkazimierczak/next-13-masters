import { ScreenMarginLayout } from "@/components/Layouts/ScreenMarginLayout";
import { FooterLinks } from "@/components/Footer/FooterLinks";

export function Footer() {
	return (
		<footer className="w-full bg-background py-4 text-center text-neutral-300">
			<ScreenMarginLayout className="flex justify-between">
				<FooterLinks />
				<p>©2023</p>
			</ScreenMarginLayout>
		</footer>
	);
}
