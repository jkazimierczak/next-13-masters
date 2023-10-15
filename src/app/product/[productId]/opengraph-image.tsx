import { ImageResponse } from "next/server";
import { type ProductPageProps } from "@/app/product/[productId]/page";
import { getProductById } from "@/api/products";

export const runtime = "edge";

export const contentType = "image/png";
export const size = {
	width: 1200,
	height: 630,
};

export default async function OGImage({ params: { productId } }: Pick<ProductPageProps, "params">) {
	const product = await getProductById(productId);

	if (!product) {
		return;
	}

	return new ImageResponse(
		(
			<div tw="flex flex-row w-full h-full items-center justify-center bg-white">
				<div tw="h-48 w-48 flex mr-10">
					<img tw="rounded" src={product.images[0]?.src} alt={product.images[0]?.alt ?? ""} />
				</div>
				<div tw="flex flex-col">
					<span tw="flex flex-col font-bold text-3xl text-gray-900">{product.title}</span>
					<span tw="text-gray-500">{product.genre}</span>
				</div>
			</div>
		),
	);
}
