# Portfolio SCSS

The shared Astro layout loads `global.scss` for fonts, theme tokens and document defaults, then `portfolio.scss` for site styles. Start with the owner below and keep component states and mobile-first queries in that partial. The shared viewport widths live in `foundation/_breakpoints.scss`.

Native body, heading, paragraph, and link defaults live in the foundation. Component classes override them where needed. Keep each selector in its own rule.

| Partial | Where it is used |
| --- | --- |
| `foundation/site-base` | Base typography and native interaction defaults on every page. |
| `components/ui-controls` | Shared React button, badge, card, accordion and carousel primitives. |
| `layout/footer` | Site footer, footer links and wordmark on every standard page. |
| `layout/header` | Site header, theme switch and mobile navigation on every standard page. |
| `layout/page-intro` | Page introductions on About, Contact, Services, Projects, case studies and policy pages. |
| `layout/section-heading` | Section headings and footer action alignment across the portfolio. |
| `layout/section-shells` | Page and section gutters, maximum widths and vertical spacing. |
| `components/asset-fallback` | Fallback previews used by projects, case studies and logo images. |
| `components/buttons` | Portfolio buttons, links and action rows used across pages. |
| `components/case-study-cards` | Case-study cards on the homepage and case-study index, plus shared card grids. |
| `components/faq` | Homepage, Contact and standalone FAQ accordions. |
| `components/pagespeed` | Performance reports in project drawers and case-study details. |
| `components/pointer-feedback` | Cursor and sound controls available throughout the site. |
| `components/project-copy-dialog` | Bulk link-copy dialog on the Projects archive. |
| `components/project-drawer` | Project details drawer on the homepage and Projects archive. |
| `components/prose` | Prose styling on legal and service pages and structured details in project drawers. |
| `components/services` | Service cards on the homepage and Services page. |
| `components/testimonials` | Homepage testimonial carousel, About review journal and case-study client avatars. |
| `sections/about` | About page portrait, career timeline, experience and statistics. |
| `sections/about-toolbox-and-tools` | About page Toolbox and skills marquee. |
| `sections/call-to-action` | Closing call to action on the homepage and supporting pages. |
| `sections/case-study` | Case-study detail pages, including branding, quotes and screenshots. |
| `sections/contact-and-page-details` | Contact page form and supporting layout, plus legal navigation and page summaries. |
| `sections/home-editorial` | Homepage editorial headings, rotator and page-level presentation variants. |
| `sections/home-hero` | Homepage hero, profile panel and client logo strip. |
| `sections/home-panels` | Homepage About, resources and section alignment. |
| `sections/project-archive` | Projects archive filters, results and project cards. |
| `sections/selected-work` | Homepage Selected Work project list and its compact preview cards. |

## Opt-in effects

Load the corresponding component from `src/components/effects` in the owning section. Mark only the intended target or area. CSS for these effects is in `effects/`.

| Marker or class | Current use |
| --- | --- |
| `data-emoji-trail` with an aria-hidden `.emoji-trail` layer | Homepage CTA, configured by `PUBLIC_CTA_TRAIL_MODE` in the environment or `src/config/siteSettings.ts` |
| `<NameSparkles>` with its `data-name-sparkles` marker | Name in the About page heading |
| `data-card-tilt` | Homepage Solutions cards |
| `data-glare-sweep` | My Toolbox group cards only |
| `.flood-fill-button` | Top navigation CTA |
| `data-grid-spotlight` | My Toolbox group grid |
| `data-skill-burst` | Muhammad Ayoub profile card in the homepage hero |
| `data-logo-reveal` | Homepage client logos |
| `data-project-reveal` | Homepage Selected Work and Case Studies images |
| `data-hero-image-reveal` and `data-hero-title-reveal` | Homepage hero portrait and heading |

### Text highlighter

The shared layout loads the script. Wrap inline text in `data-highlight`. The default is an 800 ms left-to-right reveal on the first viewport entry. Use `data-highlight-once="false"` to replay on later entries. A theme-colored veil keeps custom colors and gradients soft. Reduced motion and pages without JavaScript show the full highlight.

```astro
<span data-highlight>40% faster load times</span>

<span data-highlight data-highlight-direction="rtl" data-highlight-delay="200ms">
  15,000+ monthly visits
</span>

<a href="/services/" data-highlight data-highlight-trigger="hover"
   data-highlight-color="linear-gradient(90deg, #ffd089, #a5e4b6)"
   data-highlight-duration="0.7s">
  Technical SEO and Core Web Vitals
</a>
```
