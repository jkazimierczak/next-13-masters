export type Product = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image?: {
		src: string;
		alt: string;
	};
};

export interface Rating {
	rate: number;
	count: number;
}
