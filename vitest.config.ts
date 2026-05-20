import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

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
    include: ["tests/**/*.test.ts"],
    exclude: [
      "tests/logging.test.ts",
      "tests/panic.test.ts",
      "tests/types/UnknownRecord.test.ts",
      "tests/types/unknwonString.test.ts",
      "tests/types/voidcallback.test.ts",
      "tests/types/promises/boolean.test.ts",
      "tests/types/networking/httpVVerbs.test.ts",
      "tests/types/networking/port.test.ts",
      "tests/types/networking/statusCode.test.ts",
      "tests/types/networking/url.test.ts",
      "tests/types/networking/urls/websocket.test.ts",
      "tests/data_structures/group.test.ts",
      "tests/data_structures/functional-patterns/overload/main.test.ts",
    ],
  },
});
