import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/strategia-demo/" : "/", // 👈 crucial for GitHub Pages
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist", // 👈 align with deploy command (`gh-pages -d dist`)
    emptyOutDir: true,
  },
  plugins: [react(), expressPlugin(mode)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(mode: string): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development
    configureServer(server) {
      if (mode === "development") {
        const app = createServer();
        // Mount Express as middleware only in dev mode
        server.middlewares.use(app);
      }
    },
  };
}
