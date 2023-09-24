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
	},
	compiler: {
		removeConsole: isProduction
			? {
					exclude: ["error"],
			  }
			: false,
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

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
