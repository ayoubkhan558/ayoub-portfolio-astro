import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type portfolio from "@/data/portfolio.json";
/** Mainline's original FAQ accordion, populated without changing the data schema. */
export function FAQ({ items }: { items: typeof portfolio.faqs }) {
  return (
    <div className="mainline-faq mx-auto grid gap-16 lg:grid-cols-2">
      <div className="faq-introduction space-y-4">
        <span className="eyebrow">Good questions</span>
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Before we get started.
        </h2>
        <p className="text-muted-foreground max-w-md leading-snug">
          If you can't find what you're looking for,{" "}
          <a href="/contact/" className="underline underline-offset-4">
            get in touch
          </a>
          .
        </p>
      </div>
      <div className="grid gap-6 text-start">
        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="w-full"
        >
          {items.map((item, i) => (
            <AccordionItem key={item.question} value={`faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
