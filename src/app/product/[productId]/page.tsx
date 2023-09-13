import { ProductImage } from "@/features/ProductList/ProductImage";
import { ProductList } from "@/features/ProductList/ProductList";
import { formatPrice } from "@/utils/formatPrice";

type ProductPageProps = {
	params: {
		productId: string;
	};
};

const product = {
	name: "Dragon Chain Bracelet",
	category: "Accessory",
	price: 1800,
	image: {
		src: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
		alt: "Chain bracelet with dragon",
		width: 300,
		height: 200,
	},
};

export default function ProductPage({ params: { productId } }: ProductPageProps) {
	return (
		<>
			<div className="mb-10 grid-cols-2 gap-8 md:grid">
				<div className="mb-3 h-fit w-full overflow-hidden border">
					<div className="mx-auto w-fit">
						<ProductImage {...product.image} />
					</div>
				</div>
				<div>
					<h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">{product.name}</h1>
					<p className="mb-6">{formatPrice(product.price)}</p>
					<button className="mb-6 w-full rounded bg-black py-2 text-center font-semibold text-white">
						Add to cart
					</button>
					<p className="md:text-justify">
						Lorem ipsum dolor sit amet consectetur. Proin tristique nec mauris pulvinar. Ut molestie
						libero volutpat eget habitant varius viverra urna. Mauris sollicitudin quis quam urna
						rhoncus commodo semper. Morbi phasellus dolor elit ipsum non.
					</p>
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
