# Portfolio QA — version 1.4.0

## Data, assets and formatting

- All 14 data files retained, including all 147 projects, seven case studies, six services and 56 tools.
- Data structure preserved. The only semantic JSON change is the requested shorter SEO career description; all other parsed original JSON values are unchanged. Editable files were reformatted, so they are not byte-identical to earlier releases.
- All 239 original public assets remain byte-identical. They are intentionally excluded from the source-only ZIP.
- Two-space Prettier check passes for all matched editable source, Astro templates, data, configuration, scripts and documentation. EditorConfig and VS Code settings match.
- Current JSON plus asset hash verification: 244 entries, zero differences. Original and current JSON hashes are distinguished in the migration manifest.

## Build and dependency checks

- Astro/TypeScript: 67 checked files; zero errors, warnings or hints.
- ESLint and production build pass.
- 23 built HTML files, 1018 local references, JSON-LD, archive title/record parity, tool headings and 404 indexing checks pass.
- 201 distinct local data asset paths checked; zero unexpected missing assets. Three screenshots were already absent from the supplied source and retain styled fallbacks.
- npm audit reports zero known vulnerabilities at verification time; this is not a security guarantee.
- No dependency changes were needed in this refinement pass. Prior upgrades and the TypeScript 6.0.3 compatibility hold are documented in dependency-versions.json.

## Browser and accessibility regression

- 20 routes × 1440/390/320px × light/dark = 120 route checks.
- Zero runtime errors, horizontal page overflows, rendered-image/dimension failures or automated accessibility failures.
- WCAG 2 A/AA and 2.1 A/AA scans cover every route at 390px in both themes.
- Open drawer and contact error state additionally have zero detected A/AA violations.
- Automated scans are not a complete accessibility certification.

## Latest requested refinements

- Home Process and Best fit for are removed; the large showcase is hidden. Personal hero card names Muhammad Ayoub. Compact solution cards omit pricing and expanded service information.
- About Delivery checklist and Project fit removed; Project fit appears on Services. Alternate About/Services surfaces reviewed at desktop and mobile sizes.
- Services Problems I solve and What you take away show one active item each; manual advancement retains single-item visibility.
- Skills marquee remains running on hover, verified through computed animation state and changing transform. Explicit pause/resume and reduced-motion/no-JavaScript fallbacks still pass.
- Final actions in compact/full services, specialist services, case studies and archive cards align within each equal-height desktop row, verified through measured action bottoms.
- FAQ on Home, FAQ and Contact: 24px top/bottom trigger padding, zero inherited heading margin and consistent 24px answer bottom padding. Native fallback spacing also normalized.
- Project-facing template branding/identifiers removed; obligatory third-party license notices retained.
- Individual screenshots visually inspected for personal hero (desktop/mobile/dark), compact Solutions, About backgrounds/career path, tools marquee, single-item Services panels, full Services at 320px, Project fit, FAQ and aligned archive actions.

## Existing interaction checks

- FAQ single-open/collapsible behavior and native no-JavaScript fallback pass.
- Testimonials on Home/About retain all records and manual arrow navigation.
- 147 unique project drawers: card/button opening, focus trap, close, Escape, focus return and filters pass.
- All 56 tools remain accessible, with static wrapping reduced-motion/no-JavaScript modes.
- Case screenshot panning and reduced-motion behavior pass.
- Back-to-top threshold, scrolling and keyboard-focus restoration pass.
- Contact required fields, invalid email/URL, provider errors, network errors, 15-second timeout, duplicate submission protection, preserved inputs and success reset pass with intercepted requests.
- No real mail was sent; provider ownership, activation and inbox delivery remain unverified.

## Delivery

Clean source-only ZIP includes source, scripts, configs, VS Code settings, documentation, license notices and machine-readable QA reports. It excludes public assets, dependencies, build output, generated types and screenshots.

Extract into a new empty folder, copy your existing public/ and optional .env, then run npm ci. Do not merge old source or dependencies. Source statistics, reviews, historical links and marketing claims were preserved rather than independently verified.
