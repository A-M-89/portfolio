import { defineConfig } from "vite";

import devServer from "@hono/vite-dev-server";
export default defineConfig({
  server: {
    port: 3999,
  },

  plugins: [
    devServer({
      entry: "./server/index.ts",
      exclude: [
        /.*\.tsx?($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /.*\.(svg|png)($|\?)/,
        /^\/@.+$/,
        /^\/favicon\.ico$/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],
      injectClientScript: false,
    }),
  ],
});