import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	schema: process.env.GRAPHQL_URL,
	overwrite: true,
	ignoreNoDocuments: true,
	documents: "src/graphql/**/*.graphql",
	generates: {
		"src/gql/": {
			preset: "client",
			// plugins: [],
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImports: true,
				enumsAsTypes: true,
				defaultScalarType: "unknown",
				// strictScalars: true,  // throw if not all scalars mapping are defined
				skipTypename: true,
				documentMode: "string",
			},
		},
	},
};

export default config;
