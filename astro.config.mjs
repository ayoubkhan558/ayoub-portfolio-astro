import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import portfolio from "./src/data/portfolio.json" with { type: "json" };
export default defineConfig({
  site: process.env.SITE_URL || portfolio.profile.website,
  output: "static",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [{
      name: "separate-dev-dependency-cache",
      config(_, { command }) {
        // Keep production React prebundles out of the running dev server.
        if (command === "serve") return { cacheDir: "node_modules/.vite-dev" };
      },
    }],
    optimizeDeps: {
      // Pre-bundle island dependencies even when the first visit is to another page.
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "lucide-react",
        "react-hook-form",
        "@hookform/resolvers/yup",
        "yup",
        "matter-js",
      ],
    },
  },
  redirects: {
    "/hire-me": "/contact/",
    "/pricing": "/services/",
    "/privacy": "/privacy-policy/",
  },
});
