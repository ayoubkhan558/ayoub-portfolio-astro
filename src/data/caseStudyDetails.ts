import caseStudyDetailsJson from "./caseStudyDetails.json";

type CaseStudyPageShowcase = {
  label: string;
  title: string;
  text: string;
  items: Array<{
    label: string;
    image: string;
    caption?: string;
  }>;
};

export type CaseStudyDetailData = {
  slug: string;
  client: string;
  urlLabel: string;
  liveUrl: string;
  company?: string;
  timeline: string;
  caseType: string;
  listing: {
    tag: string;
    icon: string;
    title: string;
    company?: string;
    description: string;
    result: string;
    achievement: string;
    stack: string[];
    href: string;
    liveUrl: string;
    image: string;
    imageAlt: string;
  };
  pageShowcase?: CaseStudyPageShowcase;
  heroMockup?: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  overview: string;
  facts: Array<{ label: string; value: string }>;
  challenges: Array<{ title: string; text: string }>;
  results: Array<{ title: string; text: string }>;
  tools: string[];
  performanceNote: string;
  pageSpeed?: {
    source: string;
    testedUrl: string;
    measuredAt: string;
    mobile?: CaseStudyPageSpeedResult;
    desktop?: CaseStudyPageSpeedResult;
    mobileError?: string;
    desktopError?: string;
  };
  branding: {
    title: string;
    text: string;
    logoMark: string;
    logoImage?: string;
    clientImage?: string;
    fontName: string;
    fontFamilies?: string[];
    fontMeta: string;
    palette: Array<{ label: string; tone?: "dark" | "gray" | "light" | "accent"; value?: string }>;
  };
  desktopPages: Array<{ name: string; type: string }>;
  responsiveBenefits: string[];
  testimonial: {
    quote: string;
    author: string;
    meta: string;
  };
  cta: {
    heading: string;
    text: string;
    buttonText: string;
  };
};

export type CaseStudyPageSpeedResult = {
  performance: number;
  fcp: string | null;
  lcp: string | null;
  cls: string | null;
  tbt: string | null;
  speedIndex: string | null;
};

export const caseStudyDetails = caseStudyDetailsJson as Record<string, CaseStudyDetailData>;
