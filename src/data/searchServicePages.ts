import type { ServiceNiche } from "./serviceNiches";

// Each page answers a different buying or hiring question.
export const searchServicePages: ServiceNiche[] = [
  {
    slug: "business-website-design",
    title: "Business Website Design",
    h1: "Business website design for service companies",
    description: "Plan a business website around your services, customer questions, and a clear route to booking or requesting a quote.",
    label: "Business websites",
    highlights: [{ label: "Best for", value: "Service businesses building their first site" }],
    sections: [
      { title: "What your first site needs", paragraphs: ["Start with the services customers already ask for. Give each important service its own page with who it helps, what’s included, and what visitors should do next. The homepage ties those pages together and explains your offer in plain language."], bullets: ["Service pages written around customer questions", "A contact or booking path that works on mobile", "Editable content for opening hours, staff, and service updates"] },
      { title: "What to bring to the brief", paragraphs: ["Send your service list, a few customer questions, any brand files, and the action you want people to take. If you have several offers, choose the one you most want the homepage to lead with."] },
    ],
    relatedCases: [{ href: "/case-studies/pagano-law/", label: "See the Pagano Law website redesign" }],
  },
  {
    slug: "shopify-store-developer",
    title: "Shopify Store Developer",
    h1: "Shopify store developer for catalog and theme work",
    description: "Get help with Shopify theme sections, product templates, collection navigation, and store improvements.",
    label: "Shopify development",
    highlights: [{ label: "Best for", value: "A new theme or an existing Shopify storefront" }],
    sections: [
      { title: "Decide what belongs in the theme", paragraphs: ["Start with a product that has your most complex variants and a collection with enough entries to test browsing. Use those examples to plan product templates, filters, and reusable theme sections. Review a draft theme before publishing changes to a live store."], bullets: ["Product and collection layouts", "Editable theme sections", "Mobile cart and checkout handoff checks"] },
      { title: "What to share for an estimate", paragraphs: ["Share your store URL or draft catalog, your current theme, and the apps you rely on. Include an example of any product that needs special options or a different layout."] },
    ],
    relatedCases: [{ href: "/case-studies/supplementshub/", label: "See the SupplementsHub Shopify project" }],
  },
  {
    slug: "hire-a-website-designer",
    title: "Hire a Website Designer",
    h1: "How to hire a website designer",
    description: "Write a design brief, compare relevant work, and agree on deliverables before hiring a website designer.",
    label: "Hiring guide",
    highlights: [{ label: "Start with", value: "A short brief and two relevant work samples" }],
    sections: [
      { title: "Write a brief you can use to compare proposals", paragraphs: ["Explain what your business sells, who the site is for, and the main task a visitor should finish. List the pages you need and say who will provide text, images, and brand assets. Those details make proposals easier to compare."], bullets: ["Ask for a project with a similar audience or goal", "Request a mobile layout sample", "Confirm whether development, accessibility checks, and editable design files are included"] },
      { title: "Agree on approvals and handoff", paragraphs: ["Decide who signs off on the work and how feedback will be consolidated. Ask which files you’ll receive, how changes are handled after approval, and who will maintain the site."] },
    ],
    relatedCases: [{ href: "/case-studies/", label: "Browse website design case studies" }],
  },
  {
    slug: "website-developer-near-me",
    title: "Website Developer Near Me",
    h1: "Looking for a website developer near you?",
    description: "Compare local and remote website development for your project. See what requires an in-person visit and what you can review online.",
    label: "Local and remote work",
    highlights: [{ label: "Base", value: "Faisalabad, Pakistan" }],
    sections: [
      { title: "When a local developer makes sense", paragraphs: ["Choose someone nearby if the project depends on on-site workshops, location photography, or meetings with a team that works from one office. Ask how many visits are included and who needs to attend."], bullets: ["Confirm the actual meeting location", "Ask for examples of similar work", "Check who owns the domain, hosting, and website accounts"] },
      { title: "When you can work remotely", paragraphs: ["I’m based in Faisalabad. For builds that can run remotely, we can compare layouts and review changes through a staging link. Tell me your city and whether any part of the project needs to happen in person."] },
    ],
    relatedCases: [{ href: "/about/", label: "See my background and work location" }],
  },
  {
    slug: "website-developer-in-lahore",
    title: "Website Developer for Lahore Businesses",
    h1: "Website developer for businesses in Lahore",
    description: "Work remotely with a Faisalabad-based website developer on a redesign, service website, or online store for your Lahore business.",
    label: "Remote work with Lahore teams",
    highlights: [{ label: "Collaboration", value: "Remote, on Pakistan time" }],
    sections: [
      { title: "Plan a site for customers in Lahore", paragraphs: ["For a business that serves customers across Lahore, list the neighbourhoods you actually serve and how customers book, visit, or arrange delivery. Use those details to decide which service, location, or delivery information needs to be visible on mobile."], bullets: ["Current opening hours and contact channels", "Actual service areas or pickup points", "The right booking or inquiry flow for each service"] },
      { title: "Review the work with your team", paragraphs: ["I work from Faisalabad. Share your current site and the team’s preferred review times. We can use a staging link to check the new pages together before launch."] },
    ],
    relatedCases: [{ href: "/projects/", label: "Explore completed website projects" }],
  },
  {
    slug: "website-developer-in-pakistan",
    title: "Website Developer in Pakistan",
    h1: "Website developer in Pakistan",
    description: "Work with Muhammad Ayoub Khan, a Faisalabad-based developer building websites for teams in Pakistan and working remotely with international clients.",
    label: "Pakistan-based development",
    highlights: [{ label: "Based in", value: "Faisalabad, Pakistan" }],
    sections: [
      { title: "Build for where your customers use the site", paragraphs: ["Tell me whether the site serves Pakistan, international customers, or both. That affects language, contact channels, checkout requirements, and what we test on mobile. Decide which market the first release should serve before adding more."], bullets: ["Confirm the languages and currencies you need", "Test how customers will contact you on mobile", "For stores, share your payment, shipping, and returns requirements"] },
      { title: "Agree on launch responsibilities", paragraphs: ["Share the timeline and who manages your domain, hosting, and product or service content. We can agree on which accounts you’ll own and what your team needs to update after handoff."] },
    ],
    relatedCases: [{ href: "/services/", label: "Compare website development services" }],
  },
];
