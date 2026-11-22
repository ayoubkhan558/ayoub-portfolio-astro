import { searchServicePages } from "./searchServicePages";
import portfolio from "./portfolio.json";
import { serviceNiches, type ServiceNiche } from "./serviceNiches";

const briefs: Record<string, { bestFor: string; send: string }> = {
  "custom-web-app": {
    bestFor:
      "Teams with a prototype, dashboard, or web app to build and a clear idea of what users need to do.",
    send: "Share your designs or sketches, the main user flows, and any APIs or data sources the app needs.",
  },
  "ai-features-automation": {
    bestFor:
      "Teams with a repeated task, such as sorting inquiries or drafting replies, that want to try AI on a small scale.",
    send: "Describe the task, show a few examples of the input and expected output, and tell me who should review the results.",
  },
  "website-redesign": {
    bestFor:
      "Businesses with an established site whose pages are difficult to navigate, use on a phone, or update.",
    send: "Share the current site, the pages you want to improve, and the actions visitors should be able to take.",
  },
  "speed-optimization": {
    bestFor:
      "Site owners who see slow loading, layout shifts, or broken interactions on their most important pages.",
    send: "Send the URLs you want checked, a description of the issue, and any performance reports you already have.",
  },
  "e-commerce-setup": {
    bestFor:
      "Businesses launching a store or rebuilding an existing catalog and checkout.",
    send: "Tell me how many products you have, where you ship, and which payment methods you need.",
  },
  "ongoing-support": {
    bestFor:
      "Teams with a live website that needs regular fixes, content edits, or small improvements.",
    send: "Share your site URL, your platform, and a short list of the changes you would like help with each month.",
  },
};

const nicheBriefs: Record<string, string> = {
  "bricks-builder":
    "Share the current site URL or designs, your existing builder, and any editable content or templates your team needs.",
  "figma-to-code":
    "Share the Figma file, target stack, and the screens, breakpoints, and interactions you want implemented.",
  "wordpress-redesign":
    "Send your current site URL, the pages that need work, and anything your team must be able to edit after launch.",
};

const searchHeadings: Record<string, { title: string; h1: string }> = {
  "custom-web-app": { title: "Custom Website Development", h1: "Custom website development for complex workflows" },
  "website-redesign": { title: "Web Designer for Website Redesigns", h1: "Web designer for a clearer, faster redesign" },
  "e-commerce-setup": { title: "Ecommerce Website Developer", h1: "Ecommerce website developer for stores and catalogs" },
  "wordpress-redesign": { title: "WordPress Developer for Hire", h1: "WordPress developer for hire" },
};

export const serviceDetails: ServiceNiche[] = [
  ...portfolio.services.map((service) => ({
    slug: service.slug,
    title: service.name,
    h1: service.name,
    description: service.description,
    ...searchHeadings[service.slug],
    label: "Service",
    price:
      service.price === "Custom quote"
        ? undefined
        : service.price + service.period,
    cta: service.cta,
    highlights: [{ label: "Timeline", value: service.timeline }],
    sections: [
      {
        title: "What’s included",
        paragraphs: [service.whatYouGet],
        bullets: service.features,
      },
      { title: "Who it’s for", paragraphs: [briefs[service.slug].bestFor] },
      { title: "What to send", paragraphs: [briefs[service.slug].send] },
    ],
    relatedCases: [],
  })),
  ...serviceNiches.map((service) => ({
    ...service,
    ...searchHeadings[service.slug],
    sections: [
      ...service.sections.map((section, index) => ({
        ...section,
        title: index === 0 ? "What’s included" : "Who it’s for",
      })),
      { title: "What to send", paragraphs: [nicheBriefs[service.slug]] },
    ],
  })),
  ...searchServicePages,
];

export const serviceCards = [
  ...portfolio.services.map((service) => ({
    ...service,
    price:
      service.price === "Custom quote"
        ? "Starting price on request"
        : service.price,
  })),
  ...serviceNiches.map((service) => ({
    level: service.slug,
    slug: service.slug,
    name: service.title,
    description: service.description,
    price: service.price ?? "Starting price on request",
    period: "",
    timeline: "",
    featured: false,
  })),
];
