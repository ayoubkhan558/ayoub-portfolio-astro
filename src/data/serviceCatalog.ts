import portfolio from "./portfolio.json";
import { serviceNiches, type ServiceNiche } from "./serviceNiches";

export const serviceDetails: ServiceNiche[] = [
  ...portfolio.services.map((service) => ({
    slug: service.slug,
    title: service.name,
    h1: service.name,
    description: service.description,
    label: "Service",
    price: service.price + service.period,
    highlights: [{ label: "Timeline", value: service.timeline }],
    sections: [
      {
        title: "What’s included",
        paragraphs: [service.whatYouGet],
        bullets: service.features,
      },
    ],
    relatedCases: [],
  })),
  ...serviceNiches,
];

export const serviceCards = [
  ...portfolio.services,
  ...serviceNiches.map((service) => ({
    level: service.slug,
    slug: service.slug,
    name: service.title,
    description: service.description,
    price: service.price ?? "Custom quote",
    period: "",
    timeline: "",
    featured: false,
  })),
];
