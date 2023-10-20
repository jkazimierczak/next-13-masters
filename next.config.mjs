import "./src/env.mjs";
import withMDX from "@next/mdx";

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["media.graphassets.com"],
	},
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
		serverActions: true,
	},
	compiler: {
		// removeConsole: isProduction
		// 	? {
		// 			exclude: ["error"],
		// 	  }
		// 	: false,
	},
	rewrites: () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
			},
			{
				source: "/categories/:slug",
				destination: "/categories/:slug/1",
			},
			{
				source: "/collections/:slug",
				destination: "/collections/:slug/1",
			},
		];
	},
};

const configWithMDX = withMDX();
export default configWithMDX(nextConfig);
