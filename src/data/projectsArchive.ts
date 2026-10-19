import projectsArchiveJson from "./projectsArchive.json";
import projectLinkStatusJson from "./projectLinkStatus.json";

export type ProjectArchiveItem = (typeof projectsArchiveJson.projects)[number];

export const projectsArchive = projectsArchiveJson;
export const projectArchiveItems = projectsArchiveJson.projects as ProjectArchiveItem[];
const verifiedLinks = new Set(projectLinkStatusJson.okLinks);
const priorityProjectNames = ["Resumify", "Mockify"];

export const projectArchiveFilters = [
  { label: "All", value: "all" },
  { label: "HTML/CSS", value: "html-css" },
  { label: "Bricks", value: "bricks" },
  { label: "Elementor", value: "elementor" },
  { label: "React/Next.js", value: "react-nextjs" },
  { label: "Shopify", value: "shopify" },
  { label: "WordPress", value: "wordpress" },
  { label: "Webflow", value: "webflow" },
  { label: "Live", value: "live" },
  { label: "Redesigned", value: "redesigned" },
  { label: "Domain expired", value: "domain-expired" },
] as const;

export type ProjectArchiveFilter = (typeof projectArchiveFilters)[number]["value"];

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

export type ProjectPlatformFilter = (typeof projectPlatformFilters)[number]["value"];

export const projectStatusFilters = [
  { label: "All statuses", value: "all" },
  { label: "Live", value: "live" },
  { label: "Redesigned", value: "redesigned" },
  { label: "Domain expired", value: "domain-expired" },
] as const;

export type ProjectStatusFilter = (typeof projectStatusFilters)[number]["value"];

export function compactUrl(url: string) {
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

export function getProjectType(project: ProjectArchiveItem) {
  const details = `${project.projectType ?? ""} ${project.description ?? ""} ${project.notes ?? ""}`.toLowerCase();
  const stack = (project.platformFrameworkBuilder ?? "").toLowerCase();

  if (/divi/.test(details) && /bricks/.test(details)) {
    return "Divi to Bricks conversion";
  }

  if (/speed optimization|performance optimization/.test(details)) {
    return "Speed optimization";
  }

  if (/redesign/.test(details)) {
    return "Website redesign";
  }

  const usesFigma = /figma/i.test(`${project.figmaLink ?? ""} ${project.description ?? ""}`);
  const implementation = /html|css|bootstrap|jquery/.test(stack)
    ? "HTML/CSS"
    : /elementor/.test(stack)
      ? "Elementor"
      : /bricks/.test(stack)
        ? "Bricks Builder"
        : /shopify/.test(stack)
          ? "Shopify"
          : /react|next/.test(stack)
            ? "React/Next.js"
            : /webflow/.test(stack)
              ? "Webflow"
              : /wordpress|wordperss/.test(stack)
                ? "WordPress"
                : null;

  if (implementation) {
    return usesFigma ? `Figma to ${implementation}` : `${implementation} build`;
  }

  return project.projectType || "Client project";
}

export function getProjectDescription(project: ProjectArchiveItem) {
  return project.description || `${getProjectTitle(project)} is a client project built for a focused web experience.`;
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

export function getProjectInitials(project: ProjectArchiveItem) {
  const title = getProjectTitle(project);
  const words = title.replace(/https?:\/\//, "").split(/[\s.-]+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "P";
}

export function getProjectMeta(project: ProjectArchiveItem) {
  return [
    project.categoryNiche,
  ].filter((item): item is string => Boolean(item && !/^https?:\/\//i.test(item.trim())));
}

export function getProjectCompany(project: ProjectArchiveItem) {
  return "company" in project && typeof project.company === "string" ? project.company : null;
}

export function normalizeProjectFilter(value: string | string[] | undefined): ProjectArchiveFilter {
  const rawValue = Array.isArray(value) ? value[0] : value;

  return projectArchiveFilters.some((filter) => filter.value === rawValue)
    ? (rawValue as ProjectArchiveFilter)
    : "all";
}

export function normalizeProjectPlatformFilter(value: string | string[] | undefined): ProjectPlatformFilter {
  const rawValue = Array.isArray(value) ? value[0] : value;

  return projectPlatformFilters.some((filter) => filter.value === rawValue)
    ? (rawValue as ProjectPlatformFilter)
    : "all";
}

export function normalizeProjectStatusFilter(value: string | string[] | undefined): ProjectStatusFilter {
  const rawValue = Array.isArray(value) ? value[0] : value;

  return projectStatusFilters.some((filter) => filter.value === rawValue)
    ? (rawValue as ProjectStatusFilter)
    : "all";
}

export function projectMatchesFilter(project: ProjectArchiveItem, filter: ProjectArchiveFilter) {
  if (filter === "all") {
    return true;
  }

  if (filter === "live" || filter === "redesigned" || filter === "domain-expired") {
    return projectMatchesStatus(project, filter);
  }

  return projectMatchesPlatform(project, filter);
}

export function projectMatchesPlatform(project: ProjectArchiveItem, filter: ProjectPlatformFilter) {
  if (filter === "all") {
    return true;
  }

  const stack = `${project.platformFrameworkBuilder ?? ""} ${project.projectType ?? ""} ${project.description ?? ""}`.toLowerCase();

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

export function projectMatchesStatus(project: ProjectArchiveItem, filter: ProjectStatusFilter) {
  if (filter === "all") {
    return true;
  }

  if (filter === "live") {
    return project.projectStatus === "Live";
  }

  if (filter === "redesigned") {
    return project.projectStatus === "Redesigned by Client";
  }

  if (filter === "domain-expired") {
    return project.projectStatus === "Offline (Domain Expired)";
  }

  return true;
}

export function sortProjectsByLiveStatus(projects: ProjectArchiveItem[]) {
  return [...projects].sort((a, b) => {
    const aPriority = priorityProjectNames.indexOf(getProjectTitle(a));
    const bPriority = priorityProjectNames.indexOf(getProjectTitle(b));

    if (aPriority !== bPriority) {
      if (aPriority === -1) return 1;
      if (bPriority === -1) return -1;
      return aPriority - bPriority;
    }

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

export function getProjectLinks(project: ProjectArchiveItem) {
  const links = [
    { href: normalizeHttpLink(project.websiteUrl), label: "Open website", kind: "website" as const },
  ];

  return links.filter(
    (link): link is { href: string; label: string; kind: "website" } =>
      Boolean(link.href && verifiedLinks.has(link.href)),
  );
}

export function normalizeHttpLink(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  let trimmed = value.trim();
  // Source archive includes a few bare domains. Normalize only domain-shaped
  // values for the link UI; original JSON remains untouched.
  if (/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?::\d+)?(?:[/?#][^\s]*)?$/i.test(trimmed)) {
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
