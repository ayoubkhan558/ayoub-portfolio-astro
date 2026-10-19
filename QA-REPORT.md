# Portfolio QA — version 1.3.0

## Preservation

- All 14 existing data files unchanged; five original JSON files byte-for-byte identical.
- 239 original assets unchanged. Assets remain in the previous project's `public/` folder and are intentionally not resent in this source-only ZIP.
- All 147 projects, seven case studies, six services, six process stages, 15 clients, 17 displayed reviews and 56 tools retained.
- Homepage section sequence matches the original Next.js `PortfolioLanding` sequence. Exactly six Selected Work cards are displayed; all archive records remain accessible.

## Build and static validation

- Astro/TypeScript: zero errors, warnings or hints.
- Production static build: 20 content/error pages plus three redirects.
- Built HTML local links, JSON-LD, all archive titles, all 56 tool headings and 404 noindex: pass.
- Original JSON/asset hash verification: 244 checked, zero differences.
- Dependency audit: zero known vulnerabilities at verification time; not a security guarantee.
- Three already-missing source screenshots use the existing intentional fallbacks.

## Browser audit

- 20 routes × 1440/390/320px × light/dark = 120 checks.
- Zero runtime errors, horizontal page overflows, broken rendered images or missing image dimensions.
- Automated WCAG 2 A/AA and 2.1 A/AA scans at 390px on every route in both themes: zero detected violations.
- Open modal drawer and contact error state were additionally scanned: zero detected A/AA violations.
- Automated scans are not a complete accessibility certification.

## Requested interaction checks

- Mainline FAQ: one question open at a time; collapsible; native single-open fallback without JavaScript.
- Mainline Embla testimonial carousels on Home/About: arrows move slides, all records retained, responsive widths and no autoplay.
- Native skills marquee: all 56 tools retained, seamless duplicated tracks, Pause/Resume and static reduced-motion/no-JavaScript fallbacks.
- Archive: 147 unique native modal drawers; card/button opening, close, Escape, focus retention and return focus. Search/filter empty-state reset and 12-card pagination still pass.
- Case screenshots: hover translates the full image through its thumbnail window; reduced motion disables panning; direct full-image links retained.
- Contact: removed requested copy/actions; explicit availability label; required fields, invalid email/URL, provider field errors, network failure, 15-second timeout, duplicate submission protection, success/reset and failure/input preservation pass.
- No-JavaScript: all 147 archive records/details, single-open FAQ fallback and native contact validation remain usable.
- Visual inspection covered desktop/mobile homepage, portrait, brand alignment, service redesign, FAQ, both sliders, modal drawers, separated case sections, hover gallery, visible form error states and full-width footer in both themes.

## Delivery

The ZIP is a clean source-only bundle: no `public/`, `dist/`, `node_modules/`, generated screenshots or duplicate image bundle. Extract into a new empty folder and copy `public/` (and `.env`, if used) from the previous project; do not merge the old source or dependencies. Build locally to regenerate `dist/`. Installation instructions are at the top of README.

No real Formspree submission was sent; inbox delivery is not verified. Original external links, statistics, prices and source claims were not independently reverified. Machine-readable reports are in `qa/`.

## Cleanup validation — v1.2.1

- Removed 66 unreachable source files and five unused editor/scaffolding/documentation files.
- Removed 44 unused unique direct packages and five duplicate declarations: 78 declarations reduced to 29.
- Retained tooling required for builds, linting, formatting and browser/accessibility tests.
- Fresh install from the regenerated lockfile succeeded.
- All 14 data files and all 239 original assets unchanged.
- Removal manifest: `qa/cleanup.json`.

## v1.3 package and design checks

- Latest stable direct-package versions verified against npm registry; TypeScript 6.0.3 is the only compatibility hold (upstream Astro checker/parser do not support TypeScript 7 yet). Version list and peer-range explanation: `qa/dependency-versions.json`.
- ESLint import plugin migrated to `eslint-plugin-import-x` for ESLint 10 support; no forced peer resolution flags used.
- Home: portrait/results hero, stacked section headings, one-at-a-time copy with pause/next, reduced-motion handling and back-to-top focus restoration tested.
- About: education beside portrait, Resume labels, compact Toolbox, testimonial carousel and two-row continuous tools marquee tested.
- 1440px desktop, 390px mobile and 320px narrow layouts captured for all requested sections.
- Global hover colors and image proportions reviewed; automated route/accessibility regression checks passed.
- No screenshots were attached to the request; no screenshot-specific issue is claimed as fixed.
- New behavior report: `qa/design-updates.json`.

- Fresh `npm ci` succeeded without peer-resolution override flags. Final Astro check: zero errors, warnings or hints. Dependency audit: zero reported known vulnerabilities (not a security guarantee).
