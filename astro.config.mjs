import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import portfolio from "./src/data/portfolio.json" with { type: "json" };
export default defineConfig({
  site: process.env.SITE_URL || portfolio.profile.website,
  output: "static",
  integrations: [react(), sitemap()],
  vite: {
    optimizeDeps: {
      // Pre-bundle dependencies used by the contact form's React island.
      include: ["react-hook-form", "@hookform/resolvers/yup", "yup"],
    },
  },
  redirects: {
    "/hire-me": "/contact/",
    "/pricing": "/services/",
    "/privacy": "/privacy-policy/",
  },
});
