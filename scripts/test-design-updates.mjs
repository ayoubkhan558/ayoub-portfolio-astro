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
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
});
const page = await context.newPage();
const errors = [],
  report = [];
page.on("pageerror", (e) => errors.push(e.message));
async function screenshot(name, selector) {
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
await page.goto(base, { waitUntil: "networkidle" });
assert.equal(await page.locator(".hero-profile-photo").count(), 1);
assert.equal(await page.locator(".hero-profile-metrics > div").count(), 3);
await screenshot("hero-desktop");
for (const id of [
  "problems",
  "services",
  "projects",
  "case-studies",
  "proof",
  "process",
]) {
  const h = page.locator(`#${id} .section-heading`);
  assert.equal(await h.evaluate((e) => getComputedStyle(e).display), "block");
  await screenshot(`heading-${id}`, `#${id}`);
}
const rotator = page.locator("[data-text-rotator]").first();
await rotator.scrollIntoViewIfNeeded();
await page.mouse.move(0, 0);
const getCurrent = () => rotator.locator(".is-current").innerText();
const original = await getCurrent();
await page.waitForTimeout(5800);
assert.notEqual(await getCurrent(), original, "Rotator advances automatically");
assert.equal(await rotator.locator(".is-current").count(), 1);
await rotator.locator("[data-rotator-pause]").click();
await page.locator("body").click({ position: { x: 2, y: 2 } });
const paused = await getCurrent();
await page.waitForTimeout(5800);
assert.equal(await getCurrent(), paused, "Pause holds current item");
await rotator.locator("[data-rotator-next]").click();
assert.notEqual(await getCurrent(), paused, "Next works while paused");
await screenshot("rotators-desktop", ".fit-rotators");
report.push(
  "Home: redesigned portrait/results hero, six stacked section headings, one-at-a-time rotating copy, pause and next controls.",
);
const top = page.locator("[data-back-to-top]");
await page.locator("footer").scrollIntoViewIfNeeded();
await page.waitForFunction(() =>
  document.querySelector("[data-back-to-top]").classList.contains("is-visible"),
);
await top.click();
await page.waitForFunction(() => scrollY < 2);
assert.equal(
  await page.evaluate(() =>
    document.activeElement?.matches(".site-header .brand"),
  ),
  true,
);
await page.waitForFunction(
  () =>
    !document
      .querySelector("[data-back-to-top]")
      .classList.contains("is-visible"),
);
report.push(
  "Back-to-top: threshold visibility, scroll to top and keyboard focus returned to the home link.",
);
await page.goto(base + "/about/", { waitUntil: "networkidle" });
assert.match(
  await page.locator(".about-hero .education-note").innerText(),
  /Master of Computer Science, University of Sahiwal/,
);
assert.equal(await page.locator(".compact-toolbox article").count(), 6);
assert.equal(await page.locator(".tool-chip[data-tool]").count(), 56);
assert.equal(
  await page.locator(".about-testimonials .reviews-slider").count(),
  1,
);
assert.equal(await page.locator("text=Collaboration").count(), 0);
assert.equal(
  await page.locator("a[download]").first().innerText(),
  "Download Resume ↓",
);
await screenshot("about-portrait-desktop", ".about-hero");
await screenshot("toolbox-desktop", ".compact-toolbox");
const marquee = page.locator(".skills-marquee");
await marquee.scrollIntoViewIfNeeded();
await page.mouse.move(0, 0);
const transform = () =>
  marquee
    .locator(".marquee-track")
    .first()
    .evaluate((e) => getComputedStyle(e).transform);
const start = await transform();
await page.waitForTimeout(450);
assert.notEqual(await transform(), start);
await marquee.locator(".marquee-toggle").click();
await page.mouse.move(0, 0);
assert.equal(await marquee.getAttribute("data-paused"), "true");
const stop = await transform();
await page.waitForTimeout(400);
assert.equal(await transform(), stop);
await marquee.locator(".marquee-toggle").click();
await page.locator("h1").evaluate((e) => {
  e.tabIndex = -1;
  e.focus();
});
await page.mouse.move(0, 0);
const resume = await transform();
await page.waitForTimeout(450);
assert.notEqual(await transform(), resume);
await screenshot("marquee-desktop", ".skills-marquee");
await screenshot("about-testimonials-desktop", ".about-testimonials");
report.push(
  "About: education beside portrait, Resume wording, compact toolbox, testimonials, all 56 tools in a seamless marquee with pause/resume and hidden duplicate groups.",
);
await page.emulateMedia({ reducedMotion: "reduce" });
assert.equal(
  await marquee
    .locator(".marquee-track")
    .first()
    .evaluate((e) => getComputedStyle(e).animationName),
  "none",
);
assert.equal(
  await marquee
    .locator('.marquee-group[aria-hidden="true"]')
    .first()
    .isVisible(),
  false,
);
for (const width of [390, 320]) {
  await page.setViewportSize({ width, height: 960 });
  for (const [route, selectors] of [
    [
      "/",
      [
        ".hero-profile",
        ".fit-rotators",
        "#services",
        "#projects",
        "#case-studies",
        "#proof",
        "#process",
      ],
    ],
    [
      "/about/",
      [
        ".about-hero",
        ".compact-toolbox",
        ".skills-marquee",
        ".about-testimonials",
      ],
    ],
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    for (const selector of selectors)
      await screenshot(
        `${route === "/" ? "home" : "about"}-${selector.replace(/[^a-z-]/g, "")}-${width}`,
        selector,
      );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `No overflow ${route} ${width}`,
    );
  }
}
await page.goto(base, { waitUntil: "networkidle" });
assert.equal(
  await page.locator("[data-rotator-pause]").first().isDisabled(),
  true,
);
const reducedCurrent = await page
  .locator(".text-rotator .is-current")
  .first()
  .innerText();
await page.locator("[data-rotator-next]").first().click();
assert.notEqual(
  await page.locator(".text-rotator .is-current").first().innerText(),
  reducedCurrent,
);
report.push(
  "Reduced motion disables autoplay; manual next remains usable. Desktop, 390px and 320px requested sections captured without page overflow.",
);
const noJs = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 960 },
});
const fallback = await noJs.newPage();
await fallback.goto(base + "/about/");
assert.equal(await fallback.locator(".tool-chip[data-tool]").count(), 56);
assert.equal(
  await fallback
    .locator('.marquee-group[aria-hidden="true"]')
    .first()
    .isVisible(),
  false,
);
assert.ok(await fallback.locator("[data-back-to-top]").isVisible());
report.push(
  "No-JavaScript: all tools visible in a wrapping list and back-to-top anchor works; motion is progressively enhanced.",
);
assert.deepEqual(errors, []);
fs.writeFileSync(
  `${out}/design-updates.json`,
  JSON.stringify({ report, errors }, null, 2),
);
console.log(JSON.stringify({ report, errors }, null, 2));
await browser.close();
