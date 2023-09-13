/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["fakestoreapi.com"],
	},
	experimental: {
		typedRoutes: true,
	},
};

module.exports = nextConfig;
