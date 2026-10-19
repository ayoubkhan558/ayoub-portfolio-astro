import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const manifest = JSON.parse(
  await readFile(new URL("migration-manifest.json", root), "utf8"),
);
let checked = 0;
const errors = [];
for (const entry of [
  ...manifest.jsonData.map((e) => ({
    path: `src/data/${e.file}`,
    sha256: e.sha256,
  })),
  ...manifest.assets.map((e) => ({
    path: `public/${e.path}`,
    sha256: e.sha256,
  })),
]) {
  try {
    const hash = createHash("sha256")
      .update(await readFile(new URL(entry.path, root)))
      .digest("hex");
    if (hash !== entry.sha256) errors.push(`Changed: ${entry.path}`);
    checked++;
  } catch {
    errors.push(`Missing: ${entry.path}`);
  }
}
console.log(
  `${checked} original JSON/asset hashes checked. ${errors.length} differences.`,
);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
