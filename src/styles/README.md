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
