import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/features/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#fc5829",
				secondary: "#58c2df",
				accent: "#e1f4f9",
				background: "#0c0c13",
				text: "#ffffff",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-landing-sm":
					"linear-gradient(180deg, rgba(6, 6, 16, 0.00) 0%, rgba(6, 6, 16, 0.34) 30.85%, rgba(6, 6, 16, 0.51) 54.22%, #060610 100%)",
				"gradient-landing-md":
					"linear-gradient(180deg, rgba(6, 6, 16, 0.00) 0%, rgba(6, 6, 16, 0.34) 13.55%, rgba(6, 6, 16, 0.51) 21.35%, #060610 100%)",
				// "background: linear-gradient(180deg, rgba(6, 6, 16, 0.00) 0%, rgba(6, 6, 16, 0.34) 17.25%, rgba(6, 6, 16, 0.51) 27.65%, #060610 100%);"
			},
		},
	},
	plugins: [],
};
export default config;
