import Image from "next/image";
import { type ProductImage } from "./types";

type ProductImageProps = ProductImage;

export function ProductImage({ src, alt, width, height, ...props }: ProductImageProps) {
	return (
		<div className="grid aspect-square w-fit justify-center bg-white p-8 transition-transform hover:scale-105">
			<Image
				{...props}
				src={src}
				alt={alt}
				width={width}
				height={height}
				className="aspect-square object-contain"
			/>
		</div>
	);
}