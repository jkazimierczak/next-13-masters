import { notFound } from "next/navigation";
import { ProductImage } from "@/features/ProductList/ProductImage";
import { ProductList } from "@/features/ProductList/ProductList";
import { formatPrice } from "@/utils/formatPrice";
import { getProductById } from "@/api/products";

type ProductPageProps = {
	params: {
		productId: string;
	};
};

export default async function ProductPage({ params: { productId } }: ProductPageProps) {
	const product = await getProductById(productId);

	if (!product) {
		notFound();
	}

	return (
		<>
			<div className="mb-10 grid-cols-2 gap-8 md:grid">
				<div className="mb-3 h-fit w-full overflow-hidden border">
					<div className="mx-auto w-fit">
						<ProductImage src={product.image} alt={product.title} width={500} height={500} />
					</div>
				</div>
				<div>
					<h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">{product.title}</h1>
					<p className="mb-6">{formatPrice(product.price)}</p>
					<button className="mb-6 w-full rounded bg-black py-2 text-center font-semibold text-white">
						Add to cart
					</button>
					<p className="md:text-justify">{product.longDescription}</p>
				</div>
			</div>

			<h3 className="mb-5 text-2xl font-bold font-bold sm:text-3xl lg:text-4xl">
				Similar Products
			</h3>
			{/* TODO: Fix width alignment */}
			<div className="mx-auto w-fit">
				<ProductList products={[product, product, product, product]} />
			</div>
		</>
	);
}
