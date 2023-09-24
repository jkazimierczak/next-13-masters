import { notFound } from "next/navigation";
import { type Metadata } from "next";
import Link from "next/link";
import { ProductImage } from "@/features/ProductList/ProductImage";
import { ProductList } from "@/features/ProductList/ProductList";
import { getProductById, getSimilarProducts } from "@/api/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItemCard } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type ProductPageProps = {
	params: {
		productId: string;
	};
};

export const generateMetadata = async ({
	params: { productId },
}: ProductPageProps): Promise<Metadata> => {
	const product = await getProductById(productId);

	return {
		title: product?.title ?? "Product not found",
	};
};

export default async function ProductPage({ params: { productId } }: ProductPageProps) {
	const product = await getProductById(productId);

	if (!product) {
		notFound();
	}

	const similarProducts = await getSimilarProducts(product.category, productId);
	const hasAlternativeEdition = product.regularEdition || product.deluxeEdition;

	const isRegularEdition = product.regularEdition === null;
	const isDeluxeEdition = product.deluxeEdition === null;
	// console.log("isDeluxe", !!product.regularEdition, "isRegular", !!product.deluxeEdition);
	const deluxeEditionHref = isDeluxeEdition
		? "#"
		: (`/product/${product.deluxeEdition?.id}` as const);
	const regularEditionHref = isRegularEdition
		? "#"
		: (`/product/${product.regularEdition?.id}` as const);

	return (
		<>
			<div className="mb-10 grid-cols-2 gap-8 md:grid">
				<div className="mb-3 h-fit w-full overflow-hidden border">
					<div className="mx-auto w-fit">
						{product.images && product.images[0] && (
							<ProductImage
								src={product.images[0].src}
								alt={product.images[0].alt}
								width={500}
								height={500}
							/>
						)}
					</div>
				</div>
				<div>
					<h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">{product.title}</h1>
					<p className="mb-6">{formatPrice(product.price)}</p>
					<Button className="mb-6 w-full">Add to cart</Button>

					{product.formats.length >= 2 && (
						<div className="mb-5">
							<h2 className="mb-2 text-lg font-medium">Format</h2>
							<RadioGroup defaultValue="Vinyl Record">
								<div className="flex w-fit items-center gap-2">
									{product.formats.map((format) => (
										<RadioGroupItemCard
											key={format.id}
											value={format.name}
											id={format.id}
											className="flex w-32 min-w-fit items-center justify-center space-x-2 px-4 py-2"
										>
											<Label htmlFor="vinyl">{format.name}</Label>
										</RadioGroupItemCard>
									))}
								</div>
							</RadioGroup>
						</div>
					)}

					{hasAlternativeEdition && (
						<div>
							<h2 className="mb-2 text-lg font-medium">Edition</h2>
							<div className="flex gap-2">
								<Button
									asChild
									size="sm"
									variant={!isDeluxeEdition ? "outline" : "default"}
									className="w-32 min-w-fit border-2"
								>
									<Link href={deluxeEditionHref}>Deluxe</Link>
								</Button>
								<Button
									asChild
									size="sm"
									variant={!isRegularEdition ? "outline" : "default"}
									className="w-32 min-w-fit border-2"
								>
									<Link href={regularEditionHref}>Regular</Link>
								</Button>
							</div>
						</div>
					)}

					{/* TODO: Uncomment */}
					{/*<p className="md:text-justify">{product.description}</p>*/}
				</div>
			</div>

			{similarProducts.length > 0 && (
				<>
					<h3 className="mb-5 text-2xl font-bold font-bold sm:text-3xl lg:text-4xl">
						Similar Products
					</h3>
					{/* TODO: Fix width alignment */}
					<div className="mx-auto w-fit">
						<ProductList products={similarProducts} />
					</div>
				</>
			)}
		</>
	);
}
