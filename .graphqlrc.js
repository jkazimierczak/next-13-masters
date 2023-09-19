const nextEnv = require("@next/env");

nextEnv.loadEnvConfig(process.cwd());

/** @type {import('@graphql-codegen/cli').CodegenConfig} */
const config = {
	schema: process.env.GRAPHQL_URL,
	overwrite: true,
	ignoreNoDocuments: true,
	documents: "src/graphql/*.graphql",
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

module.exports = config;
