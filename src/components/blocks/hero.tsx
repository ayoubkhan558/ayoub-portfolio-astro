import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PortfolioImage } from "@/components/portfolio/PortfolioImage";
import { Button } from "@/components/ui/button";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import type portfolio from "@/data/portfolio.json";

/** Portfolio split hero, wired directly to the existing portfolio schema. */
export function Hero({
  data,
  featured,
}: {
  data: typeof portfolio;
  featured: CaseStudyDetailData;
}) {
  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <span className="availability">
            <i aria-hidden="true" />
            {data.profile.availability}
          </span>
          <h1 id="hero-heading">
            {data.hero.headlineLineOne} {data.hero.headlineLineTwo}
          </h1>
          <p className="lead">{data.hero.subheadline}</p>
          <div className="actions">
            <Button asChild className="button">
              <a href="/contact/">
                {data.hero.primaryCta}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="button outline">
              <a href="/case-studies/">
                {data.hero.secondaryCta}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="hero-badges">
            {data.hero.badges.map((b) => (
              <span key={b.label}>{b.label}</span>
            ))}
            <span>{data.profile.location}</span>
          </div>
        </div>
        <aside
          className="hero-right hero-profile"
          aria-label="About your developer"
        >
          <div className="hero-profile-top">
            <span className="eyebrow">Independent web developer</span>
            <span className="profile-status">
              <i aria-hidden="true" />
              Available
            </span>
          </div>
          <div className="hero-profile-identity">
            <PortfolioImage
              src="/ayoub-about-v4.jpg"
              alt={data.profile.name}
              className="hero-profile-photo"
              eager
            />
            <div>
              <span className="eyebrow">Build. Improve. Grow.</span>
              <h2>{data.profile.name}</h2>
              <p className="hero-profile-role">
                Web Developer & SEO Specialist
              </p>
              <p>{data.profile.location}</p>
            </div>
          </div>
          <div className="hero-capabilities">
            <span>React & Next.js</span>
            <span>WordPress</span>
            <span>Full-cycle SEO</span>
          </div>
          <div className="hero-profile-metrics">
            {data.hero.trustMetrics.map((m) => (
              <div key={m.label}>
                <strong>
                  {m.value}
                  <small>{m.unit}</small>
                </strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-profile-bottom">
            <span>{data.profile.name}</span>
            <a className="text-link" href="/about/">
              Meet Ayoub
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
        </aside>
      </section>
      <div className="hero-showcase wrap" hidden>
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dots">● ● ●</span>
          <span>Selected work · built with care</span>
          <span>{data.profile.brand}</span>
        </div>
        <a
          href={featured.listing.href}
          aria-label={`Explore ${featured.client}`}
        >
          <PortfolioImage
            src={featured.heroMockup || featured.listing.image}
            alt={featured.listing.imageAlt}
            className="hero-project"
            eager
          />
        </a>
        <div className="showcase-caption">
          <div>
            <span className="eyebrow">Featured project / 01</span>
            <strong>{featured.client}</strong>
          </div>
          <a href={featured.listing.href} className="text-link">
            Explore the case study
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
