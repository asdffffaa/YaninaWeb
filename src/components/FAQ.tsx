import { useState } from 'react';
import { faqItems } from '../data/faq';
import FAQDesign from '../design/FAQDesign';
import { FAQItem } from './FAQItem';
export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="section faq">
      <FAQDesign
        overrides={{
          '2351:2721': { as: 'h2' },
          '2351:2723': {
            children: faqItems.map(([question, answer], index) => (
              <FAQItem
                key={question}
                question={question}
                answer={answer}
                index={index}
                open={open === index}
                onToggle={() => setOpen(open === index ? null : index)}
              />
            )),
            style: { overflow: 'visible' },
          },
        }}
      />
    </section>
  );
}
