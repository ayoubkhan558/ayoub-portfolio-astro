import { readFile, access } from "node:fs/promises";
const files = [
  "portfolio",
  "projectsArchive",
  "caseStudyDetails",
  "toolCatalog",
  "projectLinkStatus",
];
const refs = new Set();
const known = new Set([
  "/projects/project-ss-gillieselectric.jpg",
  "/projects/project-ss-goenterprisehr.jpg",
  "/projects/project-ss-techbridgerecruiting.jpg",
]);
function scan(v) {
  if (Array.isArray(v)) v.forEach(scan);
  else if (v && typeof v === "object") Object.values(v).forEach(scan);
  else if (
    typeof v === "string" &&
    v.startsWith("/") &&
    /\.(svg|png|jpe?g|webp|gif|pdf|ico)$/i.test(v)
  )
    refs.add(v);
}
for (const name of files)
  scan(
    JSON.parse(
      await readFile(
        new URL(`../src/data/${name}.json`, import.meta.url),
        "utf8",
      ),
    ),
  );
const missing = [];
for (const ref of refs) {
  try {
    await access(new URL(`../public${ref}`, import.meta.url));
  } catch {
    missing.push(ref);
  }
}
console.log(`${refs.size} distinct local data asset paths checked.`);
for (const ref of missing)
  console.warn(
    `${known.has(ref) ? "KNOWN SOURCE OMISSION (styled fallback)" : "MISSING"}: ${ref}`,
  );
const unexpected = missing.filter((ref) => !known.has(ref));
console.log(`${unexpected.length} unexpected missing assets.`);
if (unexpected.length) process.exitCode = 1;
