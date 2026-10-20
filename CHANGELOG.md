# Version 1.4.0 — compact layouts, personal identity and formatting

- Formatted all editable supported files with two spaces; added matching EditorConfig, VS Code and format-check settings.
- Shortened the SEO career description while preserving dataset structure and all other JSON values.
- Personalized the hero card; hid the large showcase and removed homepage Process and Best fit for.
- Replaced home service pricing cards with compact solution cards; retained full details on Services.
- Removed About Delivery checklist, moved Project fit to Services and added alternate section surfaces.
- Made Services Problems I solve and What you take away single-item rotators.
- Kept skills scrolling on hover; explicit pause and reduced-motion/static fallbacks remain.
- Normalized FAQ spacing and bottom-aligned final card actions across the site.
- Removed project-facing template identity, renamed service-cards component and preserved mandatory licenses.
- Updated integrity checks to distinguish formatted current JSON from original hashes. All 239 assets remain unchanged.

---

# Version 1.3.0 — package updates and homepage/About refinements

- Updated direct packages to latest stable releases, with TypeScript 6.0.3 retained as the latest checker/parser-compatible version instead of unsupported 7.x.
- Migrated import linting to eslint-plugin-import-x for ESLint 10 compatibility; regenerated the lockfile.
- Redesigned hero right side as a portrait, capabilities and results card.
- Stacked homepage headings/supporting copy and added one-at-a-time Best fit / Problems rotators with pause/next and reduced-motion support.
- Replaced About Collaboration with testimonials, moved education beside portrait and normalized visible Resume wording.
- Made Toolbox compact and replaced the tools carousel with a seamless continuous marquee, retaining all 56 tools and adding pause/static fallbacks.
- Added global link hover colors and back-to-top with focus restoration. Portrait/logo proportions are preserved.
- Removed the now-unused tool-slider and dashed-line components; no extra runtime animation packages added.
- All 14 existing data files and original public assets remain unchanged. Source-only bundle excludes public/dist/node_modules.
- No screenshots were received; screenshot-specific review remains pending upload.

---

# Version 1.2.1 — unused-code and package cleanup

- Removed 66 unreachable source files, plus five unused editor/scaffolding/documentation files.
- Removed 44 unused direct packages and consolidated five duplicate dependency declarations (78 declarations → 29).
- Regenerated the lockfile and verified clean installation. Required build, lint, formatting and browser-test tools remain.
- Removed obsolete TypeScript aliases, Next.js lint configuration and a nonexistent stylesheet formatter override.
- Preserved all 14 portfolio data files, original assets, active components, routes and interactions.
- Install this clean source bundle into a new empty folder and copy only the previous `public/` and optional `.env`; do not overlay old source files.

---

# Version 1.2 — requested portfolio refinements

- Restored original Next.js homepage section order, added homepage portrait, limited Selected Work to six.
- Switched FAQs to original portfolio Radix accordion (single-open) and testimonials/tools to original Embla carousel primitives.
- Restored portfolio full-width SVG gradient footer treatment with personal branding; aligned brand lockups.
- Redesigned services with numbered/icon headers, investment bands and hover accents.
- Moved delivery/status badges onto image layers and added accessible project-detail offcanvas dialogs.
- Added alternating case-study section surfaces and hover-scroll screenshot thumbnails.
- Removed requested contact-page blocks/actions; added availability label, field-level errors, server/network feedback and timeout handling.
- Preserved every existing data file and asset. Delivery is a lightweight source-only overlay, without public/dist folders.

---

# Version 1.1 — review and polish

## Original template components

- Connected portfolio Hero, Features, Pricing, FAQ, Testimonials, Background, DashedLine, ThemeToggle and UI primitives directly to the existing portfolio data.
- Replaced the very tall testimonial stack with a keyboard-focusable, scroll-snap rail, manual buttons, boundary states and reduced-motion handling. All 17 reviews remain available; there is no autoplay or React hydration.
- Kept the portfolio typography, gradient shells, navigation shape, card treatment and overall design.

## Fixes

- Fixed nine initial TypeScript errors and removed stale/deprecated icon imports.
- Added intrinsic image dimensions to reduce layout shifts while preserving original assets and missing-image fallbacks.
- Refined 320px/390px layouts, readable metadata, field boundaries, card spacing, service CTA alignment and keyboard focus styling.
- Made mobile navigation a progressive native disclosure with Escape focus restoration, outside-click closing and resize handling. It works without JavaScript.
- Improved system-theme updates, saved-choice validation and storage-failure handling.
- Added URL/history-aware archive pagination, validated filter parameters, better search indexing, result ranges and focus management.
- Hardened contact submission with duplicate-send prevention, timeout recovery, input preservation on error, status focus and accessible live feedback. No actual inbox delivery was tested.
- Corrected canonical trailing slashes, case-study social type, 404 indexing and JSON-LD escaping.
- Used actual service/process array lengths in visible section introductions without editing source JSON.
- Fixed card markup regressions caught during final rendering checks, and added title/asset parity checks to guard against recurrence.
- Upgraded Astro to a patched 7.x version, aligned React/sitemap integrations, removed unused server/MDX/RSS/theme packages and redundant legacy lint dependencies, and updated vulnerable transitive tooling.

## Data contract

All five original JSON files, all 14 files already in `src/data/`, and all 239 original Next.js public assets are byte-for-byte unchanged from the prior delivered migration. No project, tool, case study, service, client, or original data field was removed or renamed. Marketing inconsistencies and three original missing screenshots remain documented rather than invented.
