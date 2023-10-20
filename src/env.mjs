import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const requiredString = z.string().min(1);

export const env = createEnv({
	server: {
		GRAPHQL_URL: requiredString,
		WEBHOOK_SECRET: requiredString,
		HYGRAPH_MUTATION_TOKEN: requiredString,
		ALGOLIA_APPID: requiredString,
		ALGOLIA_API_KEY: requiredString,
		STRIPE_SECRET_KEY: requiredString,
		STRIPE_WEBHOOK_SECRET: requiredString,
	},
	experimental__runtimeEnv: {},
});
