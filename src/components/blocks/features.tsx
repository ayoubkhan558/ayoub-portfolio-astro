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
              className="case-image-link"
              aria-label={`Read ${s.client} case study${s.listing.company ? ` · Delivered at ${s.listing.company}` : ""}`}
            >
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
            </a>
            <CardContent className="case-body">
              <div className="tags">
                {s.listing.stack.map((tag) => (
                  <Badge variant="outline" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3>
                <a href={s.listing.href}>{s.listing.title}</a>
              </h3>
              <p>{s.listing.description}</p>
              <div className="case-result">{s.listing.result}</div>
              <a className="text-link card-action" href={s.listing.href}>
                Read the case study
                <ArrowRight aria-hidden="true" size={16} />
              </a>
            </CardContent>
          </Card>
        </article>
      ))}
    </div>
  );
}
