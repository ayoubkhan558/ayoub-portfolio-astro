import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import portfolio from "./src/data/portfolio.json" with { type: "json" };
export default defineConfig({
  site: process.env.SITE_URL || portfolio.profile.website,
  output: "static",
  integrations: [react(), sitemap()],
  redirects: {
    "/hire-me": "/contact/",
    "/pricing": "/services/",
    "/privacy": "/privacy-policy/",
  },
  vite: { plugins: [tailwindcss()] },
});
