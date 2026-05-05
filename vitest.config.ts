import { defineConfig } from "vitest/config";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@better-standard-internal": resolve(currentDir, "src"),
      "@src": resolve(currentDir, "src"),
      "@test": resolve(currentDir, "tests"),
    },
  },
  test: {
    environment: "node",
    include: [
      "tests/option.test.ts",
      "tests/catch.test.ts",
      "tests/oneOf.test.ts",
      "tests/mapObject.test.ts",
      "tests/tryCatch.test.ts",
      "tests/objectEntries.test.ts",
      "tests/types.test.ts",
      "tests/data_structures/functional-patterns/optionable/unit/main.test.ts",
      "tests/data_structures/functional-patterns/optionable/type/main.test.ts",
    ],
  },
});
