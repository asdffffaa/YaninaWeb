import { useState } from 'react';
import { faqItems } from '../../data/faq';
import MobileFAQDesign from '../../design/MobileFAQDesign';
import { FAQItem } from '../FAQItem';
const hidden = { style: { display: 'none' } };
export function MobileFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="section m-section m-faq">
      <MobileFAQDesign overrides={{ '2351:3470': { as: 'h2' }, '2351:3472': hidden }} />
      <div className="m-faq-list">
        {faqItems.map(([q, answer], i) => (
          <FAQItem
            key={q}
            index={i}
            question={q}
            answer={answer}
            open={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
