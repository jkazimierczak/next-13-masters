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
		removeConsole: {
			exclude: ["error"],
		},
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
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
