import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import { chromium } from "playwright";
const output = process.env.QA_OUTPUT || "qa-results";
fs.mkdirSync(output, { recursive: true });
const base = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    headless: true,
    args: ["--no-sandbox"],
  });
  const errors = [],
    rows = [],
    axe = [];
  const routes = [
    "/",
    "/about/",
    "/projects/",
    "/services/",
    "/contact/",
    "/case-studies/",
    "/case-studies/rejuvenated-knives/",
    "/case-studies/pagano-law/",
    "/case-studies/weinberger-aesthetics/",
    "/case-studies/studyly/",
    "/case-studies/kingsre/",
    "/case-studies/serveekay/",
    "/case-studies/supplementshub/",
    "/services/bricks-builder/",
    "/services/figma-to-code/",
    "/services/wordpress-redesign/",
    "/faq/",
    "/privacy-policy/",
    "/terms-and-conditions/",
    "/404/",
  ];
  for (const [width, colorScheme] of [1440, 390, 320].flatMap((width) =>
    ["light", "dark"].map((color) => [width, color]),
  )) {
    const context = await b.newContext({
      viewport: { width, height: 960 },
      colorScheme,
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].map(async (i) => {
            i.loading = "eager";
            await i.decode().catch(() => {});
          }),
        );
      });
      const d = await page.evaluate(() => ({
        h1: document.querySelectorAll("h1").length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        broken: [...document.images]
          .filter((i) => !i.naturalWidth)
          .map((i) => i.getAttribute("src")),
        noDimensions: [...document.images]
          .filter((i) => !i.hasAttribute("width") || !i.hasAttribute("height"))
          .map((i) => i.getAttribute("src")),
      }));
      rows.push({ route, width, colorScheme, ...d });
      if (width !== 320)
        await page.screenshot({
          path: `${output}/${route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replaceAll("/", "-")}-${width}-${colorScheme}.png`,
        });
      if (width === 390) {
        const a = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        if (a.violations.length)
          axe.push({
            route,
            violations: a.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes
                .map((n) => ({ target: n.target, summary: n.failureSummary }))
                .slice(0, 6),
            })),
          });
      }
    }
    await context.close();
  }
  fs.writeFileSync(
    `${output}/audit.json`,
    JSON.stringify({ errors, rows, axe }, null, 2),
  );
  const failures = rows.filter(
    (x) => x.h1 !== 1 || x.overflow || x.broken.length || x.noDimensions.length,
  );
  console.log(
    JSON.stringify(
      {
        runtimeErrors: errors,
        checked: rows.length,
        layoutOrImageFailures: failures.length,
        accessibilityFailures: axe.length,
      },
      null,
      2,
    ),
  );
  if (errors.length || failures.length || axe.length) process.exitCode = 1;
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
