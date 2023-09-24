import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductImage } from "@/features/ProductList/ProductImage";
import { ProductList } from "@/features/ProductList/ProductList";
import { formatPrice } from "@/utils/formatPrice";
import { getProductById, getSimilarProducts } from "@/api/products";

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
					<button className="mb-6 w-full rounded bg-black py-2 text-center font-semibold text-white">
						Add to cart
					</button>
					<p className="md:text-justify">{product.description}</p>
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
