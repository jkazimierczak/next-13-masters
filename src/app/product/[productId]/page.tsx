import { notFound } from "next/navigation";
import { type Metadata } from "next";
import Link from "next/link";
import { ProductImage } from "@/features/ProductList/ProductImage";
import { ProductList } from "@/features/ProductList/ProductList";
import { getProductById, getSimilarProducts } from "@/api/products";
import { formatPrice, prepareImageProps } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItemCard } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { queryParamsSchema } from "@/app/product/[productId]/queryParamsSchema";
import { addToCart, getOrCreateCart } from "@/api/cart";
import { AddToCartButton } from "@/app/product/[productId]/AddToCartButton";

type ProductPageProps = {
	params: {
		productId: string;
	};
	searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
	params: { productId },
}: ProductPageProps): Promise<Metadata> => {
	const product = await getProductById(productId);

	return {
		title: product?.title ?? "Product not found",
		description: product?.title,
	};
};

export default async function ProductPage({
	params: { productId },
	searchParams,
}: ProductPageProps) {
	const product = await getProductById(productId);

	if (!product) {
		notFound();
	}

	const sanitizedSearchParams = queryParamsSchema.parse(searchParams);
	const defaultFormatValue = sanitizedSearchParams.format;

	const similarProducts = await getSimilarProducts(product.genre, productId);
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

	async function addProductToCartAction(_formData: FormData) {
		"use server";

		const cart = await getOrCreateCart();
		await addToCart(cart.id, productId);
	}

	return (
		<>
			<div className="mb-10 grid-cols-2 gap-8 md:grid">
				<div className="mb-3 h-fit w-full overflow-hidden">
					<div className="mx-auto w-fit">
						<ProductImage {...prepareImageProps(product.images)} width={500} height={500} />
					</div>
				</div>
				<div>
					<h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">{product.title}</h1>
					<p className="mb-6">{formatPrice(product.price)}</p>
					<form action={addProductToCartAction}>
						<AddToCartButton />
					</form>

					{product.formats.length >= 2 && (
						<div className="mb-5">
							<h2 className="mb-2 text-lg font-medium">Format</h2>
							<RadioGroup defaultValue={defaultFormatValue}>
								<div className="flex w-fit items-center gap-2">
									{product.formats.map((format) => (
										<Link
											key={format.id}
											href={`?format=${encodeURIComponent(format.name)}`}
											scroll={false}
										>
											<RadioGroupItemCard
												value={encodeURIComponent(format.name)}
												id={format.id}
												className="flex w-32 min-w-fit items-center justify-center space-x-2 px-4 py-2"
											>
												<Label htmlFor="vinyl">{format.name}</Label>
											</RadioGroupItemCard>
										</Link>
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

					<p className="mt-6 md:text-justify">{product.description}</p>
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
