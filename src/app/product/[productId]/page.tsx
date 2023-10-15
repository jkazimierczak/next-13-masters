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
import { AddToCartButton } from "@/app/product/[productId]/AddToCartButton";
import { addProductToCartAction } from "@/app/cart/actions";
import { handleReviewFormAction } from "@/app/product/[productId]/actions";
import { Input } from "@/components/ui/input";
import { getReviewsByProductId } from "@/api/review";

export type ProductPageProps = {
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
	const productReviews = await getReviewsByProductId(productId);
	console.log("reviews", productReviews);

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
						<input type="text" name="itemId" value={productId} hidden readOnly />
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

			<div className="mt-10 flex gap-10">
				<div className="w-1/3">
					<h2 className="mb-4 text-4xl font-bold">Add review</h2>
					<p className="mb-4">
						{"You own the record already? That's cool! Give a word to other users about it:"}
					</p>
					<form action={handleReviewFormAction} data-testid="add-review-form">
						<input type="text" name="productId" value={productId} readOnly hidden />
						<Label htmlFor="headline" className="text-md mb-1 block">
							Headline
						</Label>
						<Input className="mb-2" type="text" name="headline" id="headline" required />
						<Label htmlFor="content" className="text-md mb-1 block">
							Content
						</Label>
						<Input className="mb-2" type="text" name="content" id="content" required />
						<Label htmlFor="rating" className="text-md mb-1 block">
							Rating
						</Label>
						<Input
							className="mb-2"
							type="number"
							name="rating"
							id="rating"
							min={0}
							max={5}
							required
						/>
						<Label htmlFor="username" className="text-md mb-1 block">
							Username
						</Label>
						<Input className="mb-2" type="text" name="username" id="username" required />
						<Label htmlFor="email" className="text-md mb-1 block">
							Email
						</Label>
						<Input className="mb-2" type="email" name="email" id="email" required />

						<Button className="mt-4 w-full">Add review</Button>
					</form>
				</div>
				<div className="w-2/3">
					<h2 className="mb-4 text-4xl font-bold">Reviews</h2>
					{productReviews.length === 0 && <p>This product has no reviews</p>}

					<div>
						{productReviews.map((review) => (
							<div key={review.id} className="mb-6">
								<p className="flex items-center gap-4">
									<span>{review.rating} ★</span>
									<span className="text-xl font-semibold">{review.headline}</span>
								</p>
								<p className="mb-2 ml-11 text-neutral-500">Added by: {review.name}</p>
								<p>{review.content}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
