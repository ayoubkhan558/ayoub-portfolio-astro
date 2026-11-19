# Portfolio styles

`global.scss` loads fonts, theme tokens, and class-based document defaults. `portfolio.scss` loads the site's styles. The shared Astro layout imports both entrypoints.

| Folder | What to edit there |
| --- | --- |
| `foundation/` | Fonts, theme tokens, document defaults, and shared type and colors |
| `layout/` | Header, navigation, footer, page headings, and section shells |
| `components/` | Buttons, cards, dialogs, FAQ, testimonials, and other reusable UI |
| `sections/` | Styles for specific pages or sections, such as Selected Work and the Toolbox |

Start with the partial named for the area you're changing. Some components have a base partial and a later integration. The entrypoints list them in cascade order. Keep that order unless you intend to change which rules win.

Keep mobile defaults in the owning BEM selector and nest wider layouts there using min-width queries. Use theme tokens for shared colors, typography, and spacing. A header, footer, or component rule may therefore sit in a later integration partial when it needs to win over an earlier rule. The entrypoint comments explain those boundaries. Sass `//` comments document the order without adding anything to the compiled CSS.

Use the four viewport widths in `foundation/_breakpoints.scss` for component media queries.
