import { ArrowUpRight, ArrowRight } from "lucide-react";

import { PortfolioImage } from "@/components/portfolio/PortfolioImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";

/** Portfolio image/card feature block, adapted to case-study records without reshaping them. */
export function Features({
  studies,
  limit = studies.length,
}: {
  studies: CaseStudyDetailData[];
  limit?: number;
}) {
  return (
    <div className="case-grid">
      {studies.slice(0, limit).map((s) => (
        <article key={s.slug} className="case-card-shell">
          <Card className="case-card">
            <a
              href={s.listing.href}
              className="case-card__link portfolio__link"
              aria-labelledby={`case-title-${s.slug}`}
            >
              <div className="case-image-link">
              <PortfolioImage
                src={s.listing.image}
                alt={s.listing.imageAlt}
                className="case-image"
              />
              {s.listing.company && (
                <span className="delivery-badge">
                  Delivered at {s.listing.company}
                </span>
              )}
              <span className="round-arrow" aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
              </div>
            <CardContent className="case-body">
              <div className="tags">
                {s.listing.stack.map((tag) => (
                  <Badge variant="outline" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="case-body__title portfolio__heading portfolio__heading--subsection" id={`case-title-${s.slug}`}>{s.listing.title}</h3>
              <p className="case-body__description portfolio__paragraph">{s.listing.description}</p>
              <div className="case-result">{s.listing.result}</div>
              <span className="text-link card-action">
                Read the case study
                <ArrowRight aria-hidden="true" size={16} />
              </span>
            </CardContent>
            </a>
          </Card>
        </article>
      ))}
    </div>
  );
}
