import { caseStudyDetails } from "./caseStudyDetails";
import {
  getProjectDescription,
  getProjectThumbnail,
  getProjectTitle,
  normalizeHttpLink,
  projectArchiveItems,
} from "./projectsArchive";

export type CaseStudyCard = {
  tag: string;
  icon: string;
  title: string;
  company?: string;
  description: string;
  result: string;
  achievement: string;
  stack: string[];
  href: string;
  liveUrl?: string;
  image: string;
  imageAlt: string;
};

export const caseStudies = Object.values(caseStudyDetails).map(
  (study) => study.listing,
) as CaseStudyCard[];

export type ProjectCard = {
  icon: string;
  title: string;
  kind?: "free-tool" | "client-site" | string;
  badge?: string;
  deliveryContext?: string;
  description?: string;
  stack: string;
  technologies: string[];
  cta?: string;
  href: string;
  image: string;
  imageAlt: string;
};

const featuredProjectNames = [
  "Resumify",
  "Mockify",
  "Xgrid",
  "Alkira",
  "Chkk",
  "Brickify",
  "PinAuto",
  "Clampy",
  "Markedine",
] as const;

const projectThemeIcons: Record<string, string> = {
  Xgrid: "layers",
  Alkira: "shield",
  Chkk: "rocket",
  Brickify: "layers",
  PinAuto: "gauge",
  Clampy: "gauge",
  Markedine: "sparkles",
  Resumify: "fileText",
  Mockify: "code2",
};

function toProjectCard(project: (typeof projectArchiveItems)[number]): ProjectCard {
  const title = getProjectTitle(project);
  const stack = project.platformFrameworkBuilder || "Custom web build";
  const isFreeTool = /tool|generator|mockup|clamp|convert/i.test(
    `${project.projectType ?? ""} ${project.description ?? ""}`,
  );
  const href = normalizeHttpLink(project.websiteUrl) || project.websiteUrl || "#";
  const image = getProjectThumbnail(project) || `https://s.wordpress.com/mshots/v1/${encodeURIComponent(href)}?w=900`;

  return {
    icon: projectThemeIcons[title] ?? "rocket",
    title,
    kind: isFreeTool ? "free-tool" : "client-site",
    badge: isFreeTool ? "Free web tool" : `${stack} project`,
    deliveryContext:
      typeof project.company === "string" && project.company ? `While working at ${project.company}` : undefined,
    description: getProjectDescription(project),
    stack,
    technologies: [
      ...new Set(
        [
          project.platformFrameworkBuilder,
          project.projectType,
          project.categoryNiche,
          "Custom web experience",
        ].filter((value): value is string => Boolean(value)),
      ),
    ],
    cta: isFreeTool ? "Open tool" : "View Live",
    href,
    image,
    imageAlt: `${title} project preview`,
  };
}

export const projects = featuredProjectNames
  .map((name) => projectArchiveItems.find((project) => getProjectTitle(project) === name))
  .filter((project): project is NonNullable<typeof project> => Boolean(project))
  .map(toProjectCard);
