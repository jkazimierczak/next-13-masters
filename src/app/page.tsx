import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Homepage() {
	return (
		<div className="grid h-full items-center bg-gradient-landing-sm text-white">
			<div className="px-5 md:px-12 lg:px-24">
				<h1 className="mb-4 text-4xl font-extrabold">
					Get Yourself <br className="md:hidden" />a Vinyl
				</h1>
				<p className="mb-10">
					Browse and shop the best vinyl records and <br className="hidden md:block" />
					immerse yourself in the true quality of sound.
				</p>
				<Link href={"/products"}>
					<button className="flex rounded bg-primary px-4 py-2 font-bold">
						Browse all <ArrowRight className="ml-2" />
					</button>
				</Link>
			</div>
			<Image
				className="-z-10 object-cover"
				src="/landing_background.jpg"
				alt="Landing page background - A record player spinning a record on a turntable."
				fill
			/>
		</div>
	);
}
