import {
  ArrowUpRight,
  Check,
  Code2,
  Workflow,
  PanelsTopLeft,
  Gauge,
  Search,
  Globe,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type portfolio from "@/data/portfolio.json";

const serviceBestFit = [
  "Best when you have an MVP, internal tool, SaaS interface, or product idea that needs a clean user experience.",
  "A good fit if your team spends time sorting requests or drafting similar replies and can review what the AI produces.",
  "Best when your business is good, but the website makes prospects hesitate or compare you unfavorably with competitors.",
  "Best when the website mostly exists, but users hit friction before they inquire, book, buy, or trust the brand.",
  "Best for stores with traffic but weak conversion, confusing product pages, or a checkout flow customers do not trust.",
  "Best when the site is live but still needs steady iteration, technical care, and quick changes without starting a new project every time.",
];

/** Portfolio Pricing/Card/Button block. Portfolio services are not subscription plans. */
export function ServiceCards({
  services,
  idPrefix = "services",
  compact = false,
}: {
  services: typeof portfolio.services;
  idPrefix?: string;
  compact?: boolean;
}) {
  const icons = [Code2, Workflow, PanelsTopLeft, Gauge, Search, Globe];
  if (compact) {
    return (
      <div className="compact-solutions-grid">
        {services.map((service, i) => {
          const Icon = icons[i % icons.length];
          return (
            <article className="compact-solution" key={service.level}>
              <div className="compact-solution-top">
                <Icon size={22} aria-hidden="true" />
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{service.name}</h3>
              <p><strong>What’s included:</strong> {service.description}</p>
              <p><strong>Pricing:</strong> {service.price}{service.period}</p>
              <a
                className="text-link card-action"
                href={`/services/#services-${i}`}
              >
                View service details <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </article>
          );
        })}
      </div>
    );
  }
  return (
    <div className="service-grid service-grid-v2">
      {services.map((s, i) => (
        <Card
          key={s.level}
          role="article"
          aria-labelledby={`${idPrefix}-${i}`}
          className={`service-card ${s.featured ? "featured" : ""}`}
        >
          <CardContent className="service-inner">
            <div className="service-top">
              <div className="service-symbol">
                {(() => {
                  const Icon = icons[i % icons.length];
                  return <Icon aria-hidden="true" size={24} />;
                })()}
              </div>
              <span className="service-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.featured && (
                <Badge variant="outline" className="tag">
                  Featured
                </Badge>
              )}
            </div>
            <h3 id={`${idPrefix}-${i}`}>{s.name}</h3>
            <p><strong>What’s included:</strong> {s.description}</p>
            <div className="investment-band">
              <span className="eyebrow">Pricing</span>
              <div className="service-price">
                {s.price}
                {s.period && <small>{s.period}</small>}
              </div>
              <p className="small-note">{s.timeline}</p>
            </div>
            <ul className="service-features">
              {s.features.map((f) => (
                <li key={f}>
                  <Check size={16} aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <details>
              <summary>Deliverables & project fit</summary>
              <p>{s.whatYouGet}</p>
              <p>{serviceBestFit[i]}</p>
            </details>
            <Button
              asChild
              variant="outline"
              className="button card-action outline"
            >
              <a
                href={s.href.includes("subject=") ? s.href : `${s.href}${s.href.includes("?") ? "&" : "?"}subject=${encodeURIComponent(s.name)}`}
              >
                {s.cta}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
