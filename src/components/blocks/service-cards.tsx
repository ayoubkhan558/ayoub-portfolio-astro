import {
  ArrowUpRight,
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

/** Portfolio Pricing/Card/Button block. Portfolio services are not subscription plans. */
export function ServiceCards({
  services,
  idPrefix = "services",
  compact = false,
}: {
  services: Pick<(typeof portfolio.services)[number], "level" | "slug" | "name" | "description" | "price" | "period" | "timeline" | "featured">[];
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
            <article className="compact-solution" data-card-tilt key={service.level}>
              <div className="compact-solution-top">
                <Icon size={22} aria-hidden="true" />
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="compact-solution__title">{service.name}</h3>
              <p className="compact-solution__description"><strong>What’s included:</strong> {service.description}</p>
              <p className="compact-solution__description"><strong>Pricing:</strong> {service.price}{service.period}</p>
              <a
                className="text-link card-action"
                href={`/services/${service.slug}/`}
              >
                View service details <ArrowUpRight className="button__icon" aria-hidden="true" size={16} />
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
              {s.featured && (
                <Badge variant="outline" className="tag">
                  Featured
                </Badge>
              )}
            </div>
            <h3 className="service-card__title service-grid-v2__title" id={`${idPrefix}-${i}`}>{s.name}</h3>
            <div className="service-card__pricing">
              <div className="service-price">
                {s.price}
                {s.period && <small className="service-price__note portfolio__note">{s.period}</small>}
              </div>
              {s.timeline && <p className="small-note service-card__description service-inner__description">{s.timeline}</p>}
            </div>
            <div className="service-card__inclusions">
              <strong>What’s included</strong>
              <p className="service-card__description service-inner__description">{s.description}</p>
            </div>
            <Button
              asChild
              className="button card-action"
            >
              <a
                href={`/services/${s.slug}/`}
              >
                View service details
                <ArrowUpRight className="button__icon" aria-hidden="true" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
