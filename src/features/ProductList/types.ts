export type Product = {
	id: string;
	title: string;
	price: number;
	description?: string;
	category: string;
	images?: {
		src: string;
		alt: string;
	}[];
};

export interface Rating {
	rate: number;
	count: number;
}
