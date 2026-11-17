const projectsPerPage = Number(import.meta.env.PUBLIC_PROJECTS_PER_PAGE);

export const siteSettings = {
  showDesktopPageSpeedOnly:
    import.meta.env.PUBLIC_SHOW_DESKTOP_PAGESPEED_ONLY === "true",
  projectsPerPage:
    Number.isSafeInteger(projectsPerPage) && projectsPerPage > 0
      ? projectsPerPage
      : 12,
};
