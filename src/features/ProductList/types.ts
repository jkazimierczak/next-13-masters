export type Product = {
	id: string;
	title: string;
	price: number;
	description?: string;
	category: string;
	images?: ProductImage[];
};

type ProductImage = {
	src: string;
	alt: string;
};
