# Portfolio SEO

Each route below has one primary search target. Similar phrases may appear naturally in copy. Use the primary term to guide the page title, description, and content.

## Keyword map

| Primary search target | Route | Page focus |
| --- | --- | --- |
| Web developer | `/` | Portfolio overview and development work |
| Website developer | `/services/` | Compare website services |
| Website designer | `/case-studies/` | Design portfolio and project decisions |
| Web designer | `/services/website-redesign/` | Redesign an existing site |
| Website developer near me | `/services/website-developer-near-me/` | Decide when a project needs in-person work |
| Website developer in Lahore | `/services/website-developer-in-lahore/` | Remote work with Lahore businesses from Faisalabad |
| Website developer in Pakistan | `/services/website-developer-in-pakistan/` | Websites for Pakistani and international audiences |
| WordPress developer for hire | `/services/wordpress-redesign/` | WordPress redesign and handoff |
| Business website design | `/services/business-website-design/` | Plan a first website for a service business |
| Custom website development | `/services/custom-web-app/` | Build custom workflows and interfaces |
| Ecommerce website developer | `/services/e-commerce-setup/` | Plan an online catalog and checkout |
| Shopify store developer | `/services/shopify-store-developer/` | Shopify themes and product templates |
| Hire a website designer | `/services/hire-a-website-designer/` | Write a brief and compare proposals |
| Hire freelance web developer | `/contact/` | Send a project inquiry |
| Freelance web developer | `/about/` | Professional background and client feedback |

The original “website desinger” query is represented by its correct spelling, “website designer.”

## Deploy and verify

- Set `SITE_URL` on the production host to the domain you want indexed. Astro uses it for canonical URLs and sitemap entries.
- Run `npm run build`. Check that all 15 targets have unique titles and descriptions, a single H1, a canonical URL, and an entry under `/sitemap-index.xml`.
- Verify that the published target URLs return HTTP 200 and that the Services page links to all six new routes.
- Submit `/sitemap-index.xml` in the production domain’s Google Search Console property and track indexing and queries per URL.
- Keep location claims accurate. The Lahore page describes remote collaboration from Faisalabad.

The production build passed locally for all 32 pages. The 15 target routes were checked for indexability, metadata, headings, canonical URLs, sitemap inclusion, and internal links. Live indexing and rankings require verification after deployment.
