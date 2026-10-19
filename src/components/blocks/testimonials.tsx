import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type portfolio from "@/data/portfolio.json";
export function Testimonials({ data }: { data: typeof portfolio }) {
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
  return (
    <Carousel
      opts={{ align: "start", slidesToScroll: 1 }}
      className="reviews-slider"
      aria-label="Client testimonials"
    >
      <div className="review-toolbar">
        <p className="small-note">
          Client feedback · {reviews.length} perspectives
        </p>
        <div className="slider-controls">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
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
                    {t.avatar && (
                      <img
                        src={t.avatar}
                        alt=""
                        className="avatar"
                        width="48"
                        height="48"
                        loading="lazy"
                      />
                    )}
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
    </Carousel>
  );
}
