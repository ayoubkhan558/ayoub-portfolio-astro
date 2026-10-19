import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
const root = resolve("dist");
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
const pages = walk(root).filter((p) => p.endsWith(".html"));
const problems = [];
let refs = 0;
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    const path = decodeURIComponent(value.split(/[?#]/)[0]);
    const file = resolve(root, `.${path}`);
    refs++;
    if (
      ![file, join(file, "index.html"), `${file}.html`].some(
        (p) => existsSync(p) && statSync(p).isFile(),
      )
    )
      problems.push(`${page}: missing ${path}`);
  }
  for (const match of html.matchAll(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      JSON.parse(match[1]);
    } catch {
      problems.push(`${page}: invalid JSON-LD`);
    }
  }
  if (/<main\b/.test(html) && !/<h1\b/.test(html))
    problems.push(`${page}: missing H1`);
}
const archive = readFileSync(join(root, "projects/index.html"), "utf8");
const count = (archive.match(/class="project-card"/g) || []).length;
if (count !== 147) problems.push(`Expected 147 archive records, got ${count}`);
const titles = (archive.match(/<h2>/g) || []).length;
if (titles < 147)
  problems.push(`Missing archive project titles: ${titles} H2 elements`);
if (!/noindex/.test(readFileSync(join(root, "404.html"), "utf8")))
  problems.push("404 must be noindex");
const tools = JSON.parse(readFileSync("src/data/toolCatalog.json", "utf8"));
const about = readFileSync(join(root, "about/index.html"), "utf8");
const escaped = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
for (const tool of Object.values(tools))
  if (!about.includes(`<h3>${escaped(tool.name)}</h3>`))
    problems.push(`Missing tool heading: ${tool.name}`);
console.log(
  `${pages.length} HTML files, ${refs} local references, JSON-LD, archive record/title parity and 404 indexing checked. ${problems.length} failures.`,
);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
}
