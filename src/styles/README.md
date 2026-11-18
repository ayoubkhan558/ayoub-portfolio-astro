# Portfolio styles

`global.scss` loads Tailwind, fonts, theme tokens, and base layers. `portfolio.scss` loads the site's styles. The shared Astro layout imports both entrypoints.

| Folder | What to edit there |
| --- | --- |
| `foundation/` | Fonts, theme tokens, Tailwind setup, and shared type and colors |
| `layout/` | Header, navigation, footer, page headings, and shared breakpoints |
| `components/` | Buttons, cards, dialogs, FAQ, testimonials, and other reusable UI |
| `sections/` | Styles for specific pages or sections, such as Selected Work and the Toolbox |

Start with the partial named for the area you're changing. Some components have a base partial and a later integration or responsive partial. The entrypoints list them in cascade order. Keep that order unless you intend to change which rules win.

The refactor moved existing rules into partials and kept their original sequence. A header, footer, or component rule may therefore sit in a later integration partial when it needs to win over an earlier rule. The entrypoint comments explain those boundaries. Sass `//` comments document the order without adding anything to the compiled CSS.
