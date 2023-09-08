import { type Product } from "@/features/ProductList/types";
import { ProductList } from "@/features/ProductList/ProductList";

const products: Product[] = [
	{
		name: "Backpack",
		category: "Accessory",
		price: 9000,
		image: {
			src: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
			alt: "Backpack",
			width: 300,
			height: 200,
		},
	},
	{
		name: "Jacket",
		category: "Clothing",
		price: 1800,
		image: {
			src: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
			alt: "Jacket",
			width: 300,
			height: 200,
		},
	},
	{
		name: "Dragon Chain Bracelet",
		category: "Accessory",
		price: 1800,
		image: {
			src: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
			alt: "Chain bracelet with dragon",
			width: 300,
			height: 200,
		},
	},
	{
		name: "Slim T-Shirt",
		category: "Clothing",
		price: 2500,
		image: {
			src: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
			alt: "",
			width: 300,
			height: 200,
		},
	},
];

export default function Home() {
	return (
		<main className="p-8">
			<ProductList products={products} data-testid="products-list" />
		</main>
	);
}
