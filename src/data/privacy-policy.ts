import p from './portfolio.json';
export const sections = [
  {
    title: "Who this policy applies to",
    paragraphs: [
      "This policy applies when you visit this website, contact me about a project, request an estimate, or work with me on web design, custom React.js, HTML/CSS, JavaScript, or Next.js development.",
      "It is written for a small freelance development business. A separate project agreement may add more specific privacy or confidentiality terms.",
    ],
  },
  {
    title: "Information I collect",
    paragraphs: [
      "I only collect information that is useful for replying to you, scoping work, delivering a project, or keeping the website operating properly.",
    ],
    bullets: [
      "Contact details such as your name, email address, phone number, company name, website URL, and social profile links.",
      "Project details such as goals, budgets, timelines, requirements, brand assets, credentials, files, screenshots, and feedback you choose to share.",
      "Communication records from email, calls, messages, forms, project tools, or support conversations.",
      "Basic technical data such as device, browser, pages visited, referral source, and approximate location if analytics or hosting logs are active.",
    ],
  },
  {
    title: "How I use information",
    paragraphs: [
      "I use your information to communicate clearly, estimate and deliver work, maintain project records, and improve the website and service experience.",
    ],
    bullets: [
      "Reply to inquiries and prepare project estimates.",
      "Plan, design, develop, test, launch, and support agreed work.",
      "Manage billing, approvals, project communication, and handoff.",
      "Improve site performance, security, user experience, and content.",
      "Comply with legal, tax, accounting, or dispute-resolution obligations where required.",
    ],
  },
  {
    title: "Cookies and analytics",
    paragraphs: [
      "This website may use basic analytics, hosting logs, or similar tools to understand traffic, diagnose technical issues, and improve performance. These tools may use cookies or similar browser storage.",
      "You can usually disable cookies in your browser settings. Some website features may work differently if cookies are blocked.",
    ],
  },
  {
    title: "Third-party services",
    paragraphs: [
      "Project work may involve third-party services such as hosting providers, email tools, analytics, payment platforms, collaboration tools, WordPress plugins, Git repositories, or deployment services.",
      "Those providers process information under their own terms and privacy policies. I only share information with them when it is reasonably needed for communication, delivery, payment, support, security, or legal compliance.",
    ],
  },
  {
    title: "Data retention",
    paragraphs: [
      "I keep project and communication records only as long as needed for active work, support, business records, legal requirements, or reasonable future reference.",
      "If you ask me to delete information, I will review the request and remove data where practical, unless I need to keep it for legal, accounting, security, or dispute reasons.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "I use reasonable technical and organizational steps to protect project information and communication records. No website, email system, or online service can be guaranteed completely secure.",
      "Please avoid sending unnecessary sensitive information unless it is required for the project. Credentials should be shared through secure methods whenever possible.",
    ],
  },
  {
    title: "Your choices and rights",
    paragraphs: [
      "Depending on your location, you may have rights to request access, correction, deletion, restriction, portability, or objection to certain processing of your personal information.",
      "To make a privacy request, contact me using the email address on this website. I may need to verify the request before acting on it.",
    ],
  },
  {
    title: "Children",
    paragraphs: [
      "This website and service are intended for business and professional inquiries. I do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "Changes and contact",
    paragraphs: [
      "I may update this policy when the website, tools, or workflow changes. The updated date on this page shows the latest version.",
      `For privacy questions or requests, contact ${p.profile.email}.`,
    ],
  },
];

export const highlights = [
          { label: "Data collected", value: "Only what is needed for inquiries, estimates, delivery, and support." },
          { label: "Sharing", value: "Limited to services needed for project work, payment, hosting, or compliance." },
          { label: "Retention", value: "Kept only while useful for work, records, support, or legal needs." },
          { label: "Requests", value: "You can ask for access, correction, or deletion where applicable." },
        ];
