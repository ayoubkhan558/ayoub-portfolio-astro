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

/** Mainline's original Pricing/Card/Button block. Portfolio services are not subscription plans. */
export function Pricing({
  services,
  idPrefix = "services",
}: {
  services: typeof portfolio.services;
  idPrefix?: string;
}) {
  const icons = [Code2, LayoutTemplate, PanelsTopLeft, Gauge, Search, Globe];
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
            <Button asChild variant="outline" className="button outline">
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
