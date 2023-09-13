/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["naszsklep-api.vercel.app"],
	},
	experimental: {
		typedRoutes: true,
	},
	rewrites: () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
			},
		];
	},
};

module.exports = nextConfig;
