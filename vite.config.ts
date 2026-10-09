import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import graphqlLoader from "vite-plugin-graphql-loader";

export default defineConfig({
  plugins: [react(), graphqlLoader()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
