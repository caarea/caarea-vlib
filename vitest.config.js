import { fileURLToPath } from "node:url"
import { defineConfig, mergeConfig } from "vitest/config"
import viteConfig from "./vite.config"

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      setupFiles: ["src/tests/extend-expect.js"],
      include: ["src/tests/unit/**/*.spec.js"],
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
  }),
)
