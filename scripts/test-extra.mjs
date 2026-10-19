import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";
const out = process.env.QA_OUTPUT || "qa-results";
fs.mkdirSync(out, { recursive: true });
const base = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
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
await page.goto(base + "/projects/", { waitUntil: "networkidle" });
await page.locator(".project-card:visible .project-open").first().click();
const initial = await page.locator("dialog[open]").getAttribute("id");
await page.keyboard.press("Tab");
assert.equal(
  await page
    .locator("dialog[open]")
    .evaluate((e) => e.contains(document.activeElement)),
  true,
);
await page.screenshot({ path: `${out}/drawer-final-mobile.png` });
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .analyze();
assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations));
await page.keyboard.press("Escape");
assert.ok(initial);
report.push(
  "Open project drawer has zero axe A/AA violations and retains keyboard focus.",
);
await page.goto(base + "/contact/", { waitUntil: "networkidle" });
await page.locator('[name="name"]').fill("Test");
await page.locator('[name="email"]').fill("test@example.com");
await page.locator('[name="_subject"]').fill("Website");
await page.locator('[name="projectType"]').selectOption({ index: 1 });
await page.locator('[name="message"]').fill("Preserve this project");
await page.locator('[name="websiteUrl"]').fill("invalid url");
await page.locator("#send-brief").click();
assert.equal(await page.locator("#error-websiteUrl").isVisible(), true);
await page.locator('[name="websiteUrl"]').fill("https://example.com/");
let requests = 0;
await page.route("https://formspree.io/f/**", async (route) => {
  requests++;
  await new Promise((r) => setTimeout(r, 17000));
  await route.abort().catch(() => {});
});
await page.locator("#send-brief").click();
assert.equal(await page.locator("#send-brief").isDisabled(), true);
await page
  .locator("#contact-form")
  .evaluate((f) =>
    f.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
  );
await page.waitForFunction(
  () =>
    document
      .querySelector("#form-message")
      .textContent.includes("took too long"),
  {},
  { timeout: 18000 },
);
assert.equal(requests, 1);
assert.equal(
  await page.locator('[name="message"]').inputValue(),
  "Preserve this project",
);
await page.screenshot({ path: `${out}/form-timeout.png` });
report.push(
  "Invalid URL, 15-second timeout and duplicate-submit protection pass; details preserved.",
);
const violations = (
  await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze()
).violations;
assert.equal(violations.length, 0);
report.push("Contact error state has zero automated axe A/AA violations.");
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
await page.screenshot({ path: `${out}/footer-final-mobile.png` });
await page.setViewportSize({ width: 1440, height: 960 });
await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
await page.screenshot({ path: `${out}/footer-final-desktop.png` });
await page.emulateMedia({ colorScheme: "dark" });
await page.screenshot({ path: `${out}/footer-final-dark.png` });
const nojs = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 960 },
});
const np = await nojs.newPage();
await np.goto(base + "/projects/");
assert.equal(await np.locator(".project-card:visible").count(), 147);
await np
  .locator(".project-card")
  .first()
  .locator("noscript details summary")
  .click();
assert.equal(
  await np
    .locator(".project-card")
    .first()
    .locator("noscript details")
    .getAttribute("open"),
  "",
);
await np.goto(base + "/faq/");
assert.ok(await np.locator("noscript .faq-list details").count());
await np
  .locator("noscript .faq-list details")
  .nth(0)
  .locator("summary")
  .click();
await np
  .locator("noscript .faq-list details")
  .nth(1)
  .locator("summary")
  .click();
assert.equal(await np.locator("noscript .faq-list details[open]").count(), 1);
await np.goto(base + "/contact/");
assert.equal(
  await np.locator("#contact-form").evaluate((f) => f.noValidate),
  false,
);
report.push(
  "No-JavaScript: all 147 projects + native details, one-open FAQ fallback and native contact validation.",
);
fs.writeFileSync(
  `${out}/extra-checks.json`,
  JSON.stringify({ report }, null, 2),
);
console.log(JSON.stringify({ report }, null, 2));
await browser.close();
