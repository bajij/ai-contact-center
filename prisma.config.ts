// frChargementVariablesEnvironnementDepuisDotenv
// enLoadEnvironmentVariablesFromDotenv
import "dotenv/config";

// frConfigurationPrismaAvecCheminSchema
// enPrismaConfigurationWithSchemaPath
import { defineConfig } from "@prisma/config";

export default defineConfig({
  // frCheminVersFichierSchemaPrisma
  // enPathToPrismaSchemaFile
  schema: "./prisma/schema.prisma",
});
