export type Product = {
	name: string;
	category: string;
	price: number;
	image: ProductImage;
};

export type ProductImage = {
	width: number;
	height: number;
	src: string;
	alt: string;
};
