export type ServiceNiche = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  label: string;
  highlights: Array<{ label: string; value: string }>;
  sections: Array<{ title: string; paragraphs: string[]; bullets?: string[] }>;
  relatedCases: Array<{ href: string; label: string }>;
};

/** ponytail: three niche URLs only; add more when a keyword gets GSC demand */
export const serviceNiches: ServiceNiche[] = [
  {
    slug: "bricks-builder",
    title: "Bricks Builder Developer",
    h1: "Hire a Bricks Builder developer",
    description:
      "Custom Bricks Builder WordPress sites with ACF, clean structure, and editable handoff for clinics, firms, agencies, and founders.",
    label: "Service / Bricks",
    highlights: [
      { label: "Best for", value: "New Bricks builds and Divi/Elementor migrations" },
      { label: "Stack", value: "Bricks, WordPress, ACF" },
      { label: "Proof", value: "Pagano Law, Weinberger, Kings RE, SerVeekay" },
    ],
    sections: [
      {
        title: "What you get",
        paragraphs: [
          "I build and migrate WordPress sites in Bricks Builder so editors can update content without fighting the layout.",
        ],
        bullets: [
          "Figma or redesign → Bricks implementation",
          "ACF / dynamic templates where content repeats",
          "Performance-minded structure before plugins pile up",
          "Clear handoff for your team or next developer",
        ],
      },
      {
        title: "Who this is for",
        paragraphs: [
          "Agencies that need reliable Bricks delivery, clinics and professional firms that need editable sites, and owners stuck on Divi or Elementor who want a cleaner stack.",
        ],
      },
      {
        title: "Related work",
        paragraphs: [
          "See Divi to Bricks, Figma to Bricks clinic, Elementor to Bricks real estate, and designer portfolio builds in the case studies.",
        ],
      },
    ],
    relatedCases: [
      { href: "/case-studies/pagano-law", label: "Divi to Bricks — Pagano Law" },
      { href: "/case-studies/weinberger-aesthetics", label: "Figma to Bricks clinic" },
      { href: "/case-studies/kingsre", label: "Elementor to Bricks — Kings RE" },
      { href: "/case-studies/serveekay", label: "Figma to Bricks portfolio" },
    ],
  },
  {
    slug: "figma-to-code",
    title: "Figma to Code Developer",
    h1: "Figma to HTML, React, and Bricks development",
    description:
      "Pixel-accurate Figma handoff into HTML/Tailwind, React, or Bricks Builder WordPress — production-ready front ends without redesign guesswork.",
    label: "Service / Figma",
    highlights: [
      { label: "Best for", value: "Agencies and product teams with finished designs" },
      { label: "Outputs", value: "HTML/Tailwind, React, Bricks" },
      { label: "Proof", value: "Studyly, Weinberger, SerVeekay" },
    ],
    sections: [
      {
        title: "What you get",
        paragraphs: [
          "You send Figma. I ship responsive, maintainable front-end that matches the design and is ready for CMS or product wiring.",
        ],
        bullets: [
          "Figma → HTML + Tailwind / JS",
          "Figma → React / Next.js UI",
          "Figma → Bricks Builder WordPress",
          "Responsive QA and clean component structure",
        ],
      },
      {
        title: "Who this is for",
        paragraphs: [
          "Designers and agencies that need faithful implementation, and founders who already have UI and need a developer who does not reinvent the design.",
        ],
      },
    ],
    relatedCases: [
      { href: "/case-studies/studyly", label: "Figma to HTML/Tailwind — Studyly" },
      { href: "/case-studies/weinberger-aesthetics", label: "Figma to Bricks clinic" },
      { href: "/case-studies/serveekay", label: "Figma to Bricks portfolio" },
    ],
  },
  {
    slug: "wordpress-redesign",
    title: "WordPress Website Redesign",
    h1: "WordPress website redesign and rebuild",
    description:
      "Modernize dated WordPress sites — Divi/Elementor migrations, clearer messaging, faster pages, and an editable Bricks setup when you need one.",
    label: "Service / Redesign",
    highlights: [
      { label: "Best for", value: "Outdated or hard-to-edit WordPress sites" },
      { label: "Outcomes", value: "Clearer offer, better mobile, easier edits" },
      { label: "Proof", value: "Pagano Law, Kings RE" },
    ],
    sections: [
      {
        title: "What you get",
        paragraphs: [
          "A practical redesign or rebuild focused on credibility and conversion — not a theme swap that keeps the same confusion.",
        ],
        bullets: [
          "Homepage and key page restructuring",
          "Divi or Elementor → Bricks when maintainability matters",
          "Hosting/setup cleanup when it is part of the brief",
          "Mobile and performance fixes before launch",
        ],
      },
      {
        title: "Who this is for",
        paragraphs: [
          "Law firms, clinics, real estate, and local businesses whose site looks older than the business, or whose editors cannot update pages safely.",
        ],
      },
    ],
    relatedCases: [
      { href: "/case-studies/pagano-law", label: "Law firm Divi to Bricks rebuild" },
      { href: "/case-studies/kingsre", label: "Real estate Elementor to Bricks" },
    ],
  },
];

export function getServiceNiche(slug: string) {
  return serviceNiches.find((niche) => niche.slug === slug);
}
