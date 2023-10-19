export type Product = {
	id: string;
	title: string;
	price: number;
	description?: string;
	genre: string;
	images?: ProductImage[];
	averageRating?: number;
};

type ProductImage = {
	src: string;
	alt: string;
};
