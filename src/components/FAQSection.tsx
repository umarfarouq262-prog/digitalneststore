import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I download my purchase?",
    a: "After payment you will receive an email with your download link instantly. You can also access all your purchases from your account dashboard.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards and PayPal.",
  },
  {
    q: "Do you offer refunds?",
    a: "Due to the digital nature of our products we do not offer refunds. However if you have an issue with your purchase contact us and we will help you.",
  },
  {
    q: "Can I use these products for commercial projects?",
    a: "Yes! All our templates and resources are licensed for personal and commercial use.",
  },
  {
    q: "Are the products beginner friendly?",
    a: "Absolutely. All our products are designed to be easy to use whether you are a beginner or a professional.",
  },
];

const FAQSection = () => (
  <section className="bg-primary py-20">
    <div className="container max-w-3xl">
      <h2 className="font-display text-3xl font-bold text-primary-foreground text-center mb-12">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-primary-foreground/10 rounded-lg px-6 bg-primary-foreground/5"
          >
            <AccordionTrigger className="text-sm font-semibold text-primary-foreground hover:text-accent [&[data-state=open]]:text-accent">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-primary-foreground/60 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
