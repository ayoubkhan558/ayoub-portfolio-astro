# Muhammad Ayoub — Astro Portfolio v1.4.0

**Clean source-only update.** The ZIP excludes `public/`, `dist/`, `node_modules/` and generated screenshots. All 239 original public assets are unchanged. Editable files now use two-space formatting; portfolio data structure is preserved, with only the requested shorter SEO sentence changed.

## Install in a new folder

Do not overlay old source: that would restore files removed during cleanup.

1. Extract this ZIP into a **new, empty folder**.
2. Copy your existing `public/` folder into the new project root. Copy `.env` too if used.
3. Do not copy old `src/`, dependencies, build output, package manifests or lockfiles.
4. Use Node.js **22.22+** (Node 24 recommended), then run:

```sh
npm ci
npm run check:integrity
npm run dev
```

Without the previous `public/` folder, images, fonts and the Resume download will be missing.

## Latest changes

- Two-space formatting throughout editable source, JSON, configuration, scripts and documentation. Included EditorConfig and VS Code settings agree with Prettier.
- Personal homepage card now names Muhammad Ayoub and his role. The large showcase is hidden for now; homepage Process and Best fit for are removed.
- Homepage Solutions use compact cards with no pricing, timelines or expanded details. Full service information remains on Services.
- About removes Delivery checklist and moves Project fit to Services. Several About and Services sections have alternate surfaces.
- Services Problems I solve and What you take away each display one item at a time, with Pause/Next and reduced-motion/no-JavaScript fallbacks.
- Skills marquee continues on hover; explicit Pause/Resume, reduced-motion and no-JavaScript static fallbacks remain.
- FAQ headings and answer padding are consistent across Home, FAQ and Contact, including native fallbacks.
- Final actions in project, case-study, service and specialist cards align at the bottom of their rows.
- Project-facing template branding and identifiers are replaced by personal/generic portfolio identity. Required third-party license notices remain intact.
- SEO description: “Growing search visibility through technical SEO, content, and authority building.”

Existing features remain: education beside portrait, compact Toolbox, testimonials, link hover colors, Resume wording, back-to-top, six home Selected Work cards, all 147 archive drawers, seven case studies and all 56 tools.

## Formatting and checks

```sh
npm run format
npm run format:check
npm run check
npm run lint
npm run check:integrity
npm run check:assets
npm run build
npm run check:build
npm audit
```

`format` covers all supported editable files, including dynamic Astro pages and data. Generated folders, binary public assets and original license files are intentionally excluded. Two spaces are configured in `.prettierrc`, `.editorconfig` and `.vscode/settings.json`; the Prettier VS Code extension is required for the editor formatter setting.

For browser tests, start `npm run preview`, then in another terminal:

```sh
npx playwright install chromium
npm run test:browser
npm run test:interactions
npm run test:extra
npm run test:design
npm run test:refinements
```

Alternatively set `CHROMIUM_PATH` to installed Chromium. `QA_BASE_URL` defaults to `http://127.0.0.1:4321`; `QA_OUTPUT` defaults to `qa-results`. Contact tests intercept submissions; use a local/test site. Automated accessibility checks are not a complete certification.

## Dependencies and cleanup

The prior update upgraded 29 direct packages to latest stable releases, except TypeScript **6.0.3**, the latest compatible version for the current Astro checker and ESLint parser. TypeScript 7 is outside their supported peer ranges. No forced/legacy peer flags are used. Key versions: Astro 7.4.1, React 19.3.1, Tailwind 4.3.3, ESLint 10.13.0 and Prettier 3.9.10. Exact versions and compatibility notes: `qa/dependency-versions.json`.

Earlier cleanup removed 66 unreachable source files, five unused scaffolding/documentation files, 44 unused direct packages and five duplicate declarations. Required build/lint/format/browser tools and all portfolio data exports remain. Full removal record: `qa/cleanup.json`.

## Data and asset preservation

All 14 data files retain their structure and records. Five original JSON datasets still contain all projects, case studies, tools and supporting data. The only semantic edit is the shortened SEO career description; other changes are formatting. Details: `qa/data-changes.json` and current hashes in `qa/source-integrity.json`.

`migration-manifest.json` preserves original hashes alongside current formatted JSON hashes. `check:integrity` validates current source JSON and the original 239 public assets after you copy `public/`.

## Contact configuration

Copy `.env.example` to `.env` only if changing settings:

```dotenv
SITE_URL=https://your-domain.com
PUBLIC_FORMSPREE_ID=mgojyyqd
```

The canonical domain defaults to `profile.website`. Set `SITE_URL` to the production domain and rebuild. Confirm the existing Formspree ID's ownership, activation and allowed domain before launch.

**No real submission was sent; inbox delivery is unverified.** Provider validation, success, server/network failure, timeout, input preservation and duplicate-submit protection are tested with intercepted requests. Direct email/phone links and query-string form prefills remain.

## Build and deployment

```sh
npm run build
npm run preview
```

Deploy `dist/` to static hosting. Netlify, Cloudflare Pages or Vercel: Astro/static preset, build `npm run build`, output `dist`. Use the domain root and directory-style routes, with `404.html` as the error page. No Next.js commands, server adapter or new backend are needed. Preview through a web server, not by double-clicking HTML.

## Main files

- `src/pages/index.astro` — homepage section selection.
- `src/pages/about.astro`, `src/pages/services.astro` — About and Services layouts.
- `src/components/blocks/service-cards.tsx` — compact/full service variants.
- `src/components/blocks/faq.tsx`, `testimonials.tsx` — shared FAQ/testimonials.
- `src/components/portfolio/SkillsMarquee.astro`, `TextRotator.astro`, `BackToTop.astro` — native interactions.
- `src/components/portfolio/ProjectCard.astro` — archive cards/dialogs.
- `src/styles/portfolio.css` — responsive surfaces, spacing and alignment.

## Source caveats and licenses

- The source `projectCount` says 143; the actual array has 147 records, and the UI uses its length.
- Three screenshots were absent from the original assets: Gillies Electric, GoEnterpriseHR and TechBridge Recruiting. Intentional preview fallbacks remain.
- Source marketing claims, reviews, prices, historical statuses and external links are preserved, not independently verified.
- Required original notices remain in `LICENSE` and `reference/NEXTJS-LICENSE`.

See `QA-REPORT.md`, `CHANGELOG.md` and `qa/` for verification records.
