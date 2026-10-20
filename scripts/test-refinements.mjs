import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";
const base = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const out = process.env.QA_OUTPUT || "qa-results";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
});
const report = [],
  errors = [];
page.on("pageerror", (e) => errors.push(e.message));
async function shot(name, selector) {
  if (selector)
    await page
      .locator(selector)
      .first()
      .evaluate((e) =>
        e.scrollIntoView({ block: "start", behavior: "instant" }),
      );
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map(async (i) => {
        i.loading = "eager";
        await i.decode().catch(() => {});
      }),
    );
  });
  await page.screenshot({ path: `${out}/${name}.png` });
}
async function aligned(cardSelector, actionSelector) {
  const cards = page.locator(cardSelector);
  for (let i = 0; i < (await cards.count()); i++)
    await cards.nth(i).scrollIntoViewIfNeeded();
  const rows = await cards.evaluateAll(
    (cards, selector) =>
      cards.map((card) => ({
        cardY: card.getBoundingClientRect().top + scrollY,
        actionBottom:
          card.querySelector(selector).getBoundingClientRect().bottom + scrollY,
      })),
    actionSelector,
  );
  const groups = [];
  for (const row of rows) {
    const group = groups.find((g) => Math.abs(g[0].cardY - row.cardY) < 3);
    if (group) group.push(row);
    else groups.push([row]);
  }
  for (const group of groups)
    assert.ok(
      Math.max(...group.map((x) => x.actionBottom)) -
        Math.min(...group.map((x) => x.actionBottom)) <
        3,
      `Bottom alignment ${cardSelector}: ${JSON.stringify(group)}`,
    );
}
await page.goto(base, { waitUntil: "networkidle" });
assert.equal(await page.locator("#process").count(), 0);
assert.equal(
  await page
    .locator("#problems .text-rotator h3")
    .allTextContents()
    .then((x) => x.includes("Best fit for")),
  false,
);
assert.equal(await page.locator("#problems .text-rotator").count(), 1);
assert.equal(await page.locator(".hero-showcase").isVisible(), false);
assert.equal(
  await page.locator(".hero-profile h2").innerText(),
  "Muhammad Ayoub",
);
assert.equal(await page.locator("#services .compact-solution").count(), 3);
assert.equal(
  await page
    .locator("#services .investment-band, #services .service-price")
    .count(),
  0,
);
await aligned(".compact-solution", ".card-action");
await aligned(".case-card-shell", ".card-action");
await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
await shot("hero-desktop");
await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
await shot("personal-card-desktop", ".hero-profile");
await shot("compact-solutions-desktop", "#services");
await shot("single-problems-desktop", "#problems");
report.push(
  "Home: personal name card, hidden showcase, no Process or Best fit, compact non-pricing solutions and bottom-aligned actions.",
);
await page.goto(base + "/about/", { waitUntil: "networkidle" });
const aboutText = await page.locator("main").textContent();
assert.ok(
  !aboutText.includes("Delivery checklist") &&
    !aboutText.includes("Project fit"),
);
assert.ok(
  aboutText.includes(
    "Growing search visibility through technical SEO, content, and authority building.",
  ),
);
await page.locator(".skills-marquee").scrollIntoViewIfNeeded();
await page.hover(".marquee-viewport");
const track = page.locator(".marquee-track").first();
assert.equal(
  await track.evaluate((e) => getComputedStyle(e).animationPlayState),
  "running",
);
const before = await track.evaluate((e) => getComputedStyle(e).transform);
await page.waitForTimeout(500);
assert.notEqual(
  await track.evaluate((e) => getComputedStyle(e).transform),
  before,
);
await shot("about-alternate-desktop", ".about-page > section:nth-of-type(2)");
await shot("skills-hover-desktop", ".skills-marquee");
report.push(
  "About: Delivery checklist and Project fit removed, shorter SEO copy, alternate surfaces, continuous marquee remains running on hover.",
);
await page.goto(base + "/services/", { waitUntil: "networkidle" });
assert.ok((await page.locator("main").textContent()).includes("Project fit"));
assert.deepEqual(
  await page.locator(".fit-rotators .text-rotator h3").allTextContents(),
  ["Problems I solve", "What you take away"],
);
assert.equal(await page.locator(".fit-rotators .is-current").count(), 2);
await page.locator(".fit-rotators [data-rotator-next]").last().click();
assert.equal(await page.locator(".fit-rotators .is-current").count(), 2);
await aligned(".service-card", ".card-action");
await aligned(".linked-card", ".card-action");
await shot("service-cards-desktop", ".service-grid-v2");
await shot("services-delivery-desktop", ".fit-rotators");
await shot("services-fit-desktop", ".services-page > section:last-of-type");
report.push(
  "Services: Project fit relocated intact; Problems/Takeaway rotate one item each; full service and specialist card actions align at row bottoms.",
);
await page.goto(base + "/projects/", { waitUntil: "networkidle" });
await aligned(".project-card:visible", ".project-open");
await shot("project-actions-desktop", ".project-grid");
report.push(
  "Archive and case-study actions align consistently across equal-height card rows.",
);
for (const route of ["/", "/faq/", "/contact/"]) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.waitForSelector('.portfolio-faq [data-slot="accordion-trigger"]');
  const triggers = page.locator(
    '.portfolio-faq [data-slot="accordion-trigger"]',
  );
  const padding = await triggers.evaluateAll((es) =>
    es.map((e) => {
      const s = getComputedStyle(e);
      return [
        s.paddingTop,
        s.paddingBottom,
        getComputedStyle(e.parentElement).marginBottom,
      ];
    }),
  );
  assert.ok(
    padding.every(([a, b, m]) => a === "24px" && a === b && m === "0px"),
    `${route} FAQ spacing ${JSON.stringify(padding)}`,
  );
  await triggers.nth(1).click();
  const bottom = await page
    .locator(
      '.portfolio-faq [data-state="open"][data-slot="accordion-content"] > div',
    )
    .evaluate((e) => getComputedStyle(e).paddingBottom);
  assert.equal(bottom, "24px");
  await shot(`faq-${route.replaceAll("/", "") || "home"}`, ".portfolio-faq");
}
report.push(
  "FAQ on Home, FAQ and Contact: equal 24px trigger padding, zero heading margin and consistent 24px answer bottom spacing.",
);
for (const width of [390, 320]) {
  await page.setViewportSize({ width, height: 960 });
  for (const [route, selectors] of [
    ["/", [".hero-profile", "#services", ".portfolio-faq"]],
    ["/about/", [".about-page > section:nth-of-type(2)", ".skills-marquee"]],
    [
      "/services/",
      [
        ".service-grid-v2",
        ".fit-rotators",
        ".services-page > section:last-of-type",
      ],
    ],
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    for (let i = 0; i < selectors.length; i++)
      await shot(
        `${route.replaceAll("/", "") || "home"}-${width}-${i}`,
        selectors[i],
      );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${route} overflow at ${width}`,
    );
  }
}
assert.deepEqual(errors, []);
fs.writeFileSync(
  `${out}/refinements.json`,
  JSON.stringify({ report, errors }, null, 2),
);
console.log(JSON.stringify({ report, errors }, null, 2));
await browser.close();
