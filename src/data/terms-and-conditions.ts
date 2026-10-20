import p from "./portfolio.json";
export const sections = [
  {
    title: "Agreement to these terms",
    paragraphs: [
      "By using this website, contacting me, requesting an estimate, or starting project work, you agree to these general terms unless we sign a separate written agreement.",
      "If a proposal, invoice, statement of work, platform contract, or written agreement conflicts with this page, that specific project agreement controls for that project.",
    ],
  },
  {
    title: "Project scope",
    paragraphs: [
      "Project scope, deliverables, timeline, price, and responsibilities are confirmed before work starts. Work outside the agreed scope may require a revised estimate, added budget, or updated timeline.",
    ],
    bullets: [
      "Scope may include design implementation, WordPress development, WooCommerce work, React or Next.js development, integrations, QA, launch support, or maintenance.",
      "Assumptions, exclusions, revision limits, dependencies, and timelines should be clarified before work begins.",
      "Urgent work, extra pages, new features, plugin conflicts, third-party issues, or major direction changes may be treated as additional work.",
    ],
  },
  {
    title: "Payments and estimates",
    paragraphs: [
      "Pricing and payment terms are agreed per project. Work may require an upfront deposit, milestone payments, platform escrow, or payment before delivery depending on the project size and agreement.",
      "Late payments, missing assets, delayed approvals, or unavailable credentials may pause work and affect timelines.",
    ],
  },
  {
    title: "Client responsibilities",
    paragraphs: [
      "Clients are responsible for providing accurate content, assets, access, feedback, and approvals needed to complete the work.",
    ],
    bullets: [
      "Provide brand assets, copy, images, product data, hosting access, plugin licenses, API keys, and other project materials when needed.",
      "Confirm that supplied content, media, trademarks, plugins, and third-party assets can legally be used.",
      "Review work in a reasonable time and give clear feedback during agreed review rounds.",
    ],
  },
  {
    title: "Timeline and communication",
    paragraphs: [
      "Timelines are based on the agreed scope and the availability of required assets, access, feedback, and approvals. I will communicate progress and raise blockers when they affect delivery.",
      "If a client is unresponsive for an extended period, the project may be paused and rescheduled based on current availability.",
    ],
  },
  {
    title: "Revisions and change requests",
    paragraphs: [
      "Reasonable revisions are included when they fit the agreed scope. Requests that change the structure, add new functionality, introduce new pages, or reverse approved direction may require extra time and cost.",
    ],
  },
  {
    title: "Ownership and licenses",
    paragraphs: [
      "After final payment, the client receives ownership of custom deliverables created specifically for the project, unless a separate agreement says otherwise.",
      "Third-party tools, fonts, stock assets, plugins, themes, libraries, SaaS products, APIs, and platform accounts remain governed by their own licenses and terms. Reusable methods, know-how, snippets, internal tools, and pre-existing code remain mine unless specifically transferred in writing.",
    ],
  },
  {
    title: "Third-party tools and services",
    paragraphs: [
      "Many web projects rely on third-party tools such as WordPress plugins, hosting, payment gateways, analytics, APIs, email platforms, page builders, or deployment services.",
      "I am not responsible for outages, policy changes, pricing changes, bugs, security incidents, or limitations caused by third-party services, but I can help investigate or fix related issues under a separate support agreement.",
    ],
  },
  {
    title: "Launch and support",
    paragraphs: [
      "Launch support covers agreed checks and fixes around the delivered scope. Ongoing maintenance, new features, plugin updates, content updates, security monitoring, hosting support, or third-party troubleshooting are handled under a separate agreement.",
    ],
  },
  {
    title: "Portfolio use",
    paragraphs: [
      "Unless a project is confidential or a separate agreement says otherwise, I may reference completed work in my portfolio, case studies, proposals, social profiles, or sales material.",
      "Confidential material, private credentials, non-public business data, and sensitive project information will not be intentionally published.",
    ],
  },
  {
    title: "Limitation of liability",
    paragraphs: [
      "To the maximum extent allowed by applicable law, I am not liable for indirect, incidental, special, or consequential losses, including lost profit, lost revenue, lost data, search ranking changes, platform downtime, or third-party service failures.",
      "My total liability for a project is limited to the amount paid for the specific work giving rise to the claim, unless a separate written agreement or applicable law requires otherwise.",
    ],
  },
  {
    title: "Termination",
    paragraphs: [
      "Either party may end a project if the other party materially fails to meet agreed responsibilities. Work completed up to termination, non-refundable costs, and committed time may still be billable depending on the project agreement.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      `For questions about these terms, contact ${p.profile.email}.`,
    ],
  },
];

export const highlights = [
  {
    label: "Scope",
    value:
      "Deliverables, price, timeline, and assumptions are confirmed before work starts.",
  },
  {
    label: "Payment",
    value:
      "Work may pause when payments, assets, access, or approvals are delayed.",
  },
  {
    label: "Ownership",
    value:
      "Custom deliverables transfer after final payment unless agreed otherwise.",
  },
  {
    label: "Support",
    value:
      "Launch checks are included when agreed; ongoing maintenance is separate.",
  },
];
