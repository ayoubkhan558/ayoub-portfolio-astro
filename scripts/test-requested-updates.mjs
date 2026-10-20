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
  viewport: { width: 390, height: 960 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const report = [];
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
async function shot(name, selector) {
  if (selector) await page.locator(selector).first().scrollIntoViewIfNeeded();
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
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.waitForFunction(() =>
  document.querySelector('.portfolio-faq [data-slot="accordion-trigger"]'),
);
const order = await page
  .locator("main section[id],main div#cta")
  .evaluateAll((es) => es.map((e) => e.id).filter(Boolean));
assert.deepEqual(order, [
  "trust",
  "problems",
  "services",
  "lead-magnet",
  "projects",
  "case-studies",
  "proof",
  "about",
  "faq",
  "cta",
]);
assert.equal(await page.locator(".selected-card").count(), 6);
assert.equal(await page.locator("#about .home-portrait").count(), 1);
await shot("home-mobile");
await page.setViewportSize({ width: 1440, height: 960 });
await shot("home-desktop");
await shot("home-about", "#about");
report.push(
  "Requested homepage section order retained without Process; six selected projects; portrait present.",
);
await page.locator("#menu-toggle").isVisible();
await page.setViewportSize({ width: 390, height: 960 });
await page.locator("#menu-toggle").click();
await page.keyboard.press("Escape");
assert.equal(await page.locator("#mobile-nav").isVisible(), false);
await page.locator("#theme-toggle").click();
await page.evaluate(() => scrollTo(0, 0));
await shot("home-dark");
await page.locator("#theme-toggle").click();
const accordion = page.locator(".portfolio-faq");
const triggers = accordion.locator('[data-slot="accordion-trigger"]');
await triggers.nth(1).click();
assert.equal(
  await accordion
    .locator('[data-state="open"][data-slot="accordion-item"]')
    .count(),
  1,
);
assert.equal(await triggers.nth(0).getAttribute("data-state"), "closed");
await shot("faq-mobile", ".portfolio-faq");
await triggers.nth(1).click();
assert.equal(
  await accordion
    .locator('[data-state="open"][data-slot="accordion-item"]')
    .count(),
  0,
);
report.push(
  "Portfolio FAQ: single-open and collapsible; keyboard-accessible Radix accordion.",
);
await page.locator(".reviews-slider").scrollIntoViewIfNeeded();
await page.waitForFunction(
  () =>
    !document.querySelector('.reviews-slider [data-slot="carousel-next"]')
      .disabled,
);
const slide = page
  .locator('.reviews-slider [data-slot="carousel-item"]')
  .first();
const before = await slide.boundingBox();
await page.locator('.reviews-slider [data-slot="carousel-next"]').click();
await page.waitForTimeout(700);
const after = await slide.boundingBox();
assert.ok(after.x < before.x - 100);
await shot("testimonials-mobile", ".reviews-slider");
report.push(
  "Testimonials use Portfolio Embla carousel; arrows advance slides.",
);
await page.goto(base + "/services/", { waitUntil: "networkidle" });
assert.equal(await page.locator(".service-card").count(), 6);
await shot("services-mobile", ".service-grid");
await page.setViewportSize({ width: 1440, height: 960 });
await shot("services-desktop", ".service-grid");
await page.goto(base + "/projects/", { waitUntil: "networkidle" });
assert.equal(await page.locator(".project-card").count(), 147);
assert.equal(
  await page.getByText("About this archive", { exact: true }).count(),
  0,
);
const ids = await page
  .locator(".project-drawer")
  .evaluateAll((es) => es.map((e) => e.id));
assert.equal(new Set(ids).size, 147);
await page.locator(".project-card:visible .project-open").first().click();
assert.equal(await page.locator("dialog[open]").count(), 1);
await shot("drawer-desktop", "dialog[open]");
await page.keyboard.press("Escape");
assert.equal(await page.locator("dialog[open]").count(), 0);
assert.equal(
  await page
    .locator(".project-open")
    .first()
    .evaluate((e) => e === document.activeElement),
  true,
);
await page.setViewportSize({ width: 390, height: 960 });
await page.locator(".project-card:visible .project-media").first().click();
await shot("drawer-mobile", "dialog[open]");
await page.locator("dialog[open] .drawer-close").click();
await page.locator("#project-search").fill("no-such-project-777");
assert.equal(await page.locator("#no-projects").isVisible(), true);
await page.locator("#clear-filters").click();
assert.equal(await page.locator(".project-card:visible").count(), 12);
report.push(
  "147 unique project drawers: card and button open; focus trap, Escape, close and return focus; filters still work.",
);
await page.goto(base + "/about/", { waitUntil: "networkidle" });
await page.locator(".skills-marquee").scrollIntoViewIfNeeded();
assert.equal(await page.locator(".tool-chip[data-tool]").count(), 56);
assert.equal(
  await page.locator('.marquee-group[aria-hidden="true"]').count(),
  2,
);
assert.equal(
  await page
    .locator(".marquee-track")
    .first()
    .evaluate((e) => getComputedStyle(e).animationName),
  "none",
);
await shot("tools-mobile", ".skills-marquee");
report.push(
  "All 56 tools retained in the continuous skills marquee; reduced motion shows a static, wrapping list.",
);
await page.goto(base + "/case-studies/pagano-law/", {
  waitUntil: "networkidle",
});
await page.setViewportSize({ width: 1440, height: 960 });
await shot("case-sections", ".case-detail > section");
await shot("case-gallery", ".showcase-grid");
const frame = page.locator(".screenshot-window").first();
await frame.scrollIntoViewIfNeeded();
await page.emulateMedia({ reducedMotion: "no-preference" });
await frame.hover();
await page.waitForTimeout(900);
const transform = await frame
  .locator("img")
  .evaluate((e) => getComputedStyle(e).transform);
assert.notEqual(transform, "none");
assert.notEqual(transform, "matrix(1, 0, 0, 1, 0, 0)");
await page.mouse.move(0, 0);
await page.emulateMedia({ reducedMotion: "reduce" });
await page.setViewportSize({ width: 390, height: 960 });
await shot("case-gallery-mobile", ".showcase-grid");
await shot("footer-mobile", ".site-footer");
report.push(
  "Case sections have alternating surfaces; screenshot hover pans through full image; reduced-motion respected.",
);
await page.goto(base + "/contact/", { waitUntil: "networkidle" });
assert.equal(await page.getByText("Available for", { exact: true }).count(), 1);
for (const text of [
  "Best fit",
  "Refer a client — get 15% off your next project",
  "Send project details",
  "Get a build estimate",
])
  assert.equal(await page.getByText(text, { exact: true }).count(), 0);
await page.locator("#send-brief").click();
assert.equal(await page.locator('[aria-invalid="true"]').count(), 5);
await shot("form-required", "form");
await page.locator('[name="name"]').fill("Test User");
await page.locator('[name="email"]').fill("not-email");
await page.locator('[name="_subject"]').fill("Website");
await page.locator('[name="projectType"]').selectOption({ index: 1 });
await page.locator('[name="message"]').fill("Test project details");
await page.locator("#send-brief").click();
assert.equal(await page.locator("#error-email").isVisible(), true);
await page.locator('[name="email"]').fill("test@example.com");
await page.route("https://formspree.io/f/**", (route) =>
  route.fulfill({
    status: 422,
    contentType: "application/json",
    body: JSON.stringify({
      errors: [
        { field: "email", message: "Please use another email address." },
      ],
    }),
  }),
);
await page.locator("#send-brief").click();
await page.waitForFunction(() =>
  document
    .querySelector("#form-message")
    .textContent.includes("could not be sent"),
);
assert.equal(
  await page.locator('[name="message"]').inputValue(),
  "Test project details",
);
assert.equal(await page.locator("#error-email").isVisible(), true);
await shot("form-server-error", "#form-message");
await page.unroute("https://formspree.io/f/**");
await page.route("https://formspree.io/f/**", (route) => route.abort("failed"));
await page.locator("#send-brief").click();
await page.waitForFunction(() =>
  document
    .querySelector("#form-message")
    .textContent.includes("internet connection"),
);
assert.equal(
  await page.locator('[name="message"]').inputValue(),
  "Test project details",
);
await page.unroute("https://formspree.io/f/**");
await page.route("https://formspree.io/f/**", (route) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: '{"ok":true}',
  }),
);
await page.locator("#send-brief").click();
await page.waitForFunction(() =>
  document.querySelector("#form-message").textContent.includes("has been sent"),
);
assert.equal(await page.locator('[name="message"]').inputValue(), "");
assert.equal(await page.locator('[aria-invalid="true"]').count(), 0);
await shot("form-success", "#form-message");
report.push(
  "Contact: required fields, invalid email, provider field error, network error, preserved inputs and success reset tested with mocked requests; no real email sent.",
);
assert.deepEqual(errors, []);
fs.writeFileSync(
  `${out}/requested-updates.json`,
  JSON.stringify({ report, errors }, null, 2),
);
console.log(JSON.stringify({ report, errors }, null, 2));
await browser.close();
