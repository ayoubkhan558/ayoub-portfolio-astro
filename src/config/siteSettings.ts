const projectsPerPage = Number(import.meta.env.PUBLIC_PROJECTS_PER_PAGE);

export const siteSettings = {
  ctaTrailMode:
    import.meta.env.PUBLIC_CTA_TRAIL_MODE === "emoji" ? "emoji" : "skills",
  showDesktopPageSpeedOnly:
    import.meta.env.PUBLIC_SHOW_DESKTOP_PAGESPEED_ONLY === "true",
  projectsPerPage:
    Number.isSafeInteger(projectsPerPage) && projectsPerPage > 0
      ? projectsPerPage
      : 9,
};
