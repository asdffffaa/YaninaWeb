import { designAssets } from '../design/assets';
import { useLayoutEffect, useRef, useState } from 'react';
export function FAQItem({
  question,
  answer,
  index,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const node = inner.current;
    if (!node) return;
    const measure = () => setHeight(node.scrollHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <article className={'faq-item ' + (open ? 'open' : '')}>
      <button
        type="button"
        id={`faq-question-${index}`}
        className="faq-question"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className="faq-icon" aria-hidden="true" />
      </button>
      <div
        className="faq-reveal"
        aria-hidden={!open}
        inert={!open}
        style={{ height: open ? height : 0 }}
      >
        <div className="faq-reveal-inner" ref={inner}>
          <div
            id={`faq-answer-${index}`}
            className="faq-answer"
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <span className="faq-ornament" aria-hidden="true">
              <img src={designAssets.FAQDesign.imgLine106} alt="" />
              <span className="faq-leaf">
                <img src={designAssets.FAQDesign.imgImage13} alt="" />
              </span>
              <img src={designAssets.FAQDesign.imgLine107} alt="" />
            </span>
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
