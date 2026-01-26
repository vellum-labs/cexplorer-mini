import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { visualizer } from "rollup-plugin-visualizer";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: false,
    }),
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      template: "treemap",
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["@tanstack/react-router"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("/node_modules/@xyflow/")) return "xyflow";

          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "react";
          }

          if (id.includes("/node_modules/@tanstack/")) return "tanstack";

          if (id.includes("/node_modules/@vellumlabs/")) return "cexplorer-sdk";

          if (
            id.includes("/node_modules/zustand/") ||
            id.includes("/node_modules/immer/") ||
            id.includes("/node_modules/date-fns/") ||
            id.includes("/node_modules/lucide-react/") ||
            id.includes("/node_modules/react-helmet/")
          ) {
            return "shared";
          }

          // rest
          return "vendor";
        },
      },
    },
  },
  server: {
    port: 3001,
  },
});
