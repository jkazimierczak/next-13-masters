import { type ComponentType } from "react";
import { notFound } from "next/navigation";

type MdxPageProps = {
	params: {
		filename: string;
	};
};

export default async function MdxPage({ params: { filename } }: MdxPageProps) {
	const Page = await import(`./${filename}.mdx`).then(
		(module: { default: ComponentType }) => module.default,
		() => notFound(),
	);

	return (
		<article className="prose mx-auto my-10">
			<Page />
		</article>
	);
}
