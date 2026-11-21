import { ArrowRight, ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type portfolio from "@/data/portfolio.json";

/** Portfolio split hero, wired directly to the existing portfolio schema. */
export function Hero({
  data,
  portrait,
}: {
  data: typeof portfolio;
  portrait: ReactNode;
}) {
  return (
    <section
      className="section-spacing section-spacing--hero"
      aria-labelledby="hero-heading"
  >
      <div className="container hero">
        <div className="hero-copy">
          <span className="availability">
            <i className="availability__dot" aria-hidden="true" />
            {data.profile.availability}
          </span>
          <h1 className="hero__title portfolio__heading portfolio__heading--page" data-hero-title-reveal id="hero-heading">
            {data.hero.headlineLineOne} {data.hero.headlineLineTwo}
          </h1>
          <p className="portfolio__paragraph portfolio__paragraph--lead hero__description">{data.hero.subheadline}</p>
          <div className="hero__actions">
            <Button asChild className="button">
              <a className="portfolio__link" href="/contact/">
                {data.hero.primaryCta}
                <ArrowUpRight className="button__icon" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="button button--outline"
            >
              <a className="portfolio__link" href="/case-studies/">
                {data.hero.secondaryCta}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="hero-badges">
            {data.hero.badges.map((b) => (
              <span className="hero-badges__item" key={b.label}>
                {b.label === "Top Rated on Upwork" && (
                  <BadgeCheck size={16} aria-hidden="true" />
                )}
                {b.label}
              </span>
            ))}
            <span className="hero-badges__item">
              <MapPin size={16} aria-hidden="true" />
              {data.profile.location}
            </span>
          </div>
        </div>
        <aside
          className="hero-right hero-profile"
          data-skill-burst
          aria-label="About your developer"
        >
          <span className="border-beam" aria-hidden="true" />
          <div className="hero-profile-top">
            <span className="eyebrow">Independent web developer</span>
          </div>
          <div className="hero-profile-identity">
            {portrait}
            <div>
              <h2 className="hero-profile-identity__title portfolio__heading portfolio__heading--section">
                {data.profile.name}
              </h2>
              <p className="hero-profile-role hero-profile-identity__description portfolio__paragraph">
                Web Developer & SEO Specialist
              </p>
              <p className="hero-profile-identity__description portfolio__paragraph">
                {data.profile.location}
              </p>
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
                  <small className="hero-profile-metrics__note portfolio__note">
                    {m.unit}
                  </small>
                </strong>
                <span className="hero-profile-metrics__label">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-profile-bottom">
            <a className="text-link portfolio__link" href="/about/">
              Meet Ayoub
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
