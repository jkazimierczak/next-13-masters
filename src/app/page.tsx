import Image from "next/image";
import { ArrowRight, ChevronsRight, Disc3 } from "lucide-react";
import Link from "next/link";
import { ProductList } from "@/components/ProductList/ProductList";
import { getProducts } from "@/api/products";
import { Button } from "@/components/ui/button";

export default async function Homepage() {
	const products = (await getProducts(1)).slice(0, 4);

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
				<Button asChild variant="secondary">
					<Link href={"/products"}>
						Browse all <ArrowRight className="ml-2" />
					</Link>
				</Button>
			</div>
			<Image
				className="-z-10 object-cover"
				src="/landing_background.jpg"
				alt="Landing page background - A record player spinning a record on a turntable."
				fill
			/>
			<div className="mx-24 flex gap-6">
				<ProductList products={products} data-testid="products-list" />
				<Link
					href={"/products/1"}
					className="flex h-72 items-center justify-between rounded bg-background p-4 text-xl font-bold uppercase text-primary [writing-mode:vertical-rl]"
				>
					<div className="flex items-center gap-4">
						<Disc3 />
						Explore more
					</div>
					<ChevronsRight />
				</Link>
			</div>
		</div>
	);
}
