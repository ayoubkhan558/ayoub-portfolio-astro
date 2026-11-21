import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type portfolio from "@/data/portfolio.json";
/** Portfolio FAQ accordion, populated without changing the data schema. */
export function FAQ({ items }: { items: typeof portfolio.faqs }) {
  return (
    <div className="portfolio-faq">
      <div className="faq-introduction">
        <span className="eyebrow">Good questions</span>
        <h2 className="portfolio-faq__title portfolio__heading portfolio__heading--section">
          Before we get started.
        </h2>
        <p className="portfolio-faq__description portfolio__paragraph">
          If you can't find what you're looking for,{" "}
          <a href="/contact/" className="portfolio-faq__link portfolio__link">
            get in touch
          </a>
          .
        </p>
      </div>
      <div>
        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="portfolio-faq__accordion"
        >
          {items.map((item, i) => (
            <AccordionItem key={item.question} value={`faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
