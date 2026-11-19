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
      <section
        className="home-hero-section hero"
        aria-labelledby="hero-heading"
      >
        <div className="hero-copy">
          <span className="availability">
            <i className="availability__dot" aria-hidden="true" />
            {data.profile.availability}
          </span>
          <h1 className="hero__title" id="hero-heading">
            {data.hero.headlineLineOne} {data.hero.headlineLineTwo}
          </h1>
          <p className="lead">{data.hero.subheadline}</p>
          <div className="hero__actions">
            <Button asChild className="button">
              <a href="/contact/">
                {data.hero.primaryCta}
                <ArrowUpRight className="button__icon" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="button button--outline">
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
              <i className="profile-status__dot" aria-hidden="true" />
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
              <h2 className="hero-profile-identity__title">{data.profile.name}</h2>
              <p className="hero-profile-role hero-profile-identity__description">
                Web Developer & SEO Specialist
              </p>
              <p className="hero-profile-identity__description">{data.profile.location}</p>
            </div>
          </div>
          <div className="hero-capabilities">
            <span className="hero-capabilities__label">React & Next.js</span>
            <span className="hero-capabilities__label">WordPress</span>
            <span className="hero-capabilities__label">Full-cycle SEO</span>
          </div>
          <div className="hero-profile-metrics">
            {data.hero.trustMetrics.map((m) => (
              <div className="hero-profile__metric" key={m.label}>
                <strong className="hero-profile-metrics__value">
                  {m.value}
                  <small className="hero-profile-metrics__note portfolio__note">{m.unit}</small>
                </strong>
                <span className="hero-profile-metrics__label">{m.label}</span>
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
      <div className="hero-showcase" hidden>
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dots browser-bar__label">● ● ●</span>
          <span className="browser-bar__label">Selected work · built with care</span>
          <span className="browser-bar__label">{data.profile.brand}</span>
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
            <strong className="showcase-caption__value">{featured.client}</strong>
          </div>
          <a href={featured.listing.href} className="text-link">
            Explore the case study
            <ArrowUpRight className="button__icon" aria-hidden="true" size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
