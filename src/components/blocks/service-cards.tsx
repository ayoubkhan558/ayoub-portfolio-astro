import {
  ArrowUpRight,
  Check,
  Code2,
  LayoutTemplate,
  PanelsTopLeft,
  Gauge,
  Search,
  Globe,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type portfolio from "@/data/portfolio.json";

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
  const icons = [Code2, LayoutTemplate, PanelsTopLeft, Gauge, Search, Globe];
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
              <p>{service.description}</p>
              <a
                className="text-link card-action"
                href={`/services/#services-${i}`}
              >
                Explore service <ArrowUpRight aria-hidden="true" size={16} />
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
            <p>{s.description}</p>
            <div className="investment-band">
              <span className="eyebrow">Investment</span>
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
              <p>{s.bestFit}</p>
            </details>
            <Button
              asChild
              variant="outline"
              className="button card-action outline"
            >
              <a
                href={`${s.href}${s.href.includes("?") ? "&" : "?"}subject=${encodeURIComponent(s.name)}`}
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
