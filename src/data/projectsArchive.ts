import projectsArchiveJson from "./projectsArchive.json";
import projectLinkStatusJson from "./projectLinkStatus.json";

type ProjectArchiveItem = (typeof projectsArchiveJson.projects)[number];

export const projectsArchive = projectsArchiveJson;
export const projectArchiveItems =
  projectsArchiveJson.projects as ProjectArchiveItem[];
const verifiedLinks = new Set(projectLinkStatusJson.okLinks);

export const projectPlatformFilters = [
  { label: "All platforms", value: "all" },
  { label: "HTML/CSS", value: "html-css" },
  { label: "Bricks", value: "bricks" },
  { label: "Elementor", value: "elementor" },
  { label: "React/Next.js", value: "react-nextjs" },
  { label: "Shopify", value: "shopify" },
  { label: "WordPress", value: "wordpress" },
  { label: "Webflow", value: "webflow" },
] as const;

type ProjectPlatformFilter =
  (typeof projectPlatformFilters)[number]["value"];

export const projectStatusFilters = [
  { label: "All statuses", value: "all" },
  { label: "Live", value: "live" },
  { label: "Redesigned", value: "redesigned" },
  { label: "Domain expired", value: "domain-expired" },
] as const;

function compactUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function getProjectTitle(project: ProjectArchiveItem) {
  if (project.websiteName) {
    return project.websiteName;
  }

  if (project.websiteUrl) {
    return compactUrl(project.websiteUrl);
  }

  if (project.figmaLink) {
    return "Design handoff project";
  }

  return "Untitled project";
}

export function getProjectDescription(project: ProjectArchiveItem) {
  return (
    project.description ||
    `${getProjectTitle(project)} is a client project built for a focused web experience.`
  );
}

export function getProjectThumbnail(project: ProjectArchiveItem) {
  if (project.screenshot) {
    return project.screenshot;
  }

  const href = normalizeHttpLink(project.websiteUrl);

  if (!href || !verifiedLinks.has(href)) {
    return null;
  }

  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(href)}?w=900`;
}

export function getProjectMeta(project: ProjectArchiveItem) {
  return [project.categoryNiche].filter((item): item is string =>
    Boolean(item && !/^https?:\/\//i.test(item.trim())),
  );
}

export function projectMatchesPlatform(
  project: ProjectArchiveItem,
  filter: ProjectPlatformFilter,
) {
  if (filter === "all") {
    return true;
  }

  const stack =
    `${project.platformFrameworkBuilder ?? ""} ${project.projectType ?? ""} ${project.description ?? ""}`.toLowerCase();

  if (filter === "html-css") {
    return /html|css|bootstrap|jquery/.test(stack);
  }

  if (filter === "bricks") {
    return /bricks/.test(stack);
  }

  if (filter === "elementor") {
    return /elementor/.test(stack);
  }

  if (filter === "react-nextjs") {
    return /react|next/.test(stack);
  }

  if (filter === "shopify") {
    return /shopify/.test(stack);
  }

  if (filter === "wordpress") {
    return /wordpress|wordperss/.test(stack);
  }

  if (filter === "webflow") {
    return /webflow/.test(stack);
  }

  return true;
}

export function sortProjectsByLiveStatus(projects: ProjectArchiveItem[]) {
  return [...projects].sort((a, b) => {
    const ratingDifference = (b.rating ?? 0) - (a.rating ?? 0);
    if (ratingDifference !== 0) return ratingDifference;

    const aRank = getProjectAvailabilityRank(a);
    const bRank = getProjectAvailabilityRank(b);

    if (aRank === bRank) {
      return 0;
    }

    return aRank - bRank;
  });
}

function getProjectAvailabilityRank(project: ProjectArchiveItem) {
  const href = normalizeHttpLink(project.websiteUrl);

  if (href && verifiedLinks.has(href)) {
    return 0;
  }

  if (project.screenshot && project.projectStatus === "Live") {
    return 1;
  }

  if (project.projectStatus === "Live") {
    return 2;
  }

  return 3;
}

export function normalizeHttpLink(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  let trimmed = value.trim();
  // Source archive includes a few bare domains. Normalize only domain-shaped
  // values for the link UI; original JSON remains untouched.
  if (
    /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?::\d+)?(?:[/?#][^\s]*)?$/i.test(
      trimmed,
    )
  ) {
    trimmed = `https://${trimmed}`;
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    return null;
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    return null;
  }
}
