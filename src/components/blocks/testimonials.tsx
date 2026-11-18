import { Quote, UserRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type portfolio from "@/data/portfolio.json";
function ReviewPortrait({ src }: { src: string | null }) {
  return (
    <span className="testimonial__avatar" aria-hidden="true">
      <UserRound size={24} />
      {src && <img src={src} alt="" width="48" height="48" loading="lazy"
        onError={(event) => { event.currentTarget.hidden = true; }} />}
    </span>
  );
}

export function Testimonials({ data, journal }: { data: typeof portfolio; journal?: boolean }) {
  const reviews = [
    ...data.testimonials.map((t, i) => ({
      id: `testimonial-${i}`,
      quote: t.quote,
      name: t.name,
      role: t.role,
      review: "",
      avatar: null as string | null,
    })),
    ...data.clients
      .filter((c) => c.showInTestimonials && c.testimonial)
      .map((c) => ({
        id: c.reviewId,
        quote: c.testimonial,
        name: c.name,
        role: c.role,
        review: c.review,
        avatar: c.avatar as string | null,
      })),
  ];
  if (journal) {
    const featuredIds = ["review-5gstore-01", "review-serveekay-01", "review-carptrac-01"];
    const featured = reviews.filter((review) => featuredIds.includes(review.id));
    const remaining = reviews.filter((review) => !featuredIds.includes(review.id));
    const renderQuote = (review: (typeof reviews)[number]) => (
          <figure className="review-journal__entry" key={review.id} id={review.id}>
            <figcaption className="review-journal__person">
              <ReviewPortrait src={review.avatar} />
              <div><strong>{review.name}</strong><p>{review.role}</p></div>
            </figcaption>
            <blockquote className="review-journal__quote">{review.quote}</blockquote>
          </figure>
    );
    return (
      <div className="review-journal">
        {featured.map(renderQuote)}
        {remaining.length > 0 && (
          <details className="review-journal__more">
            <summary>Read {remaining.length} more testimonials</summary>
            {remaining.map(renderQuote)}
          </details>
        )}
      </div>
    );
  }
  return (
    <Carousel
      opts={{ align: "start", slidesToScroll: 1 }}
      className="reviews-slider"
      aria-label="Client testimonials"
    >
      <CarouselContent>
        {reviews.map((t, i) => (
          <CarouselItem
            key={t.id}
            className="review-slide"
            aria-label={`${i + 1} of ${reviews.length}`}
          >
            <Card className="testimonial-card">
              <CardContent className="review-inner">
                <figure id={t.id}>
                  <Quote
                    className="review-quote-icon"
                    size={28}
                    aria-hidden="true"
                  />
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <ReviewPortrait src={t.avatar} />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </figcaption>
                  {t.review && <p className="review-note">{t.review}</p>}
                </figure>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="slider-controls reviews-slider__controls" role="group" aria-label="Testimonial navigation">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
