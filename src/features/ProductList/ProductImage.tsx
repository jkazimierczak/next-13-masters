import Image from "next/image";

type ProductImageProps = {
	width: number;
	height: number;
	src: string;
	alt: string;
};

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
