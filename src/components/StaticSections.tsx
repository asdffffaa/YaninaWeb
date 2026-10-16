import { telegram } from '../data/catalog';
import { updatedReviewImages } from '../data/reviews';
import AboutDesign from '../design/AboutDesign';
import ApproachDesign from '../design/ApproachDesign';
import type { DesignOverrides } from '../design/bindDesign';
import ConsultationDesign from '../design/ConsultationDesign';
import FooterDesign from '../design/FooterDesign';
import PaymentDesign from '../design/PaymentDesign';
import ReviewsDesign from '../design/ReviewsDesign';
import StepsDesign from '../design/StepsDesign';
import { DiplomaSlider } from './DiplomaSlider';
import { ResultsSlider } from './ResultsSlider';
import { ReviewImage } from './ReviewImage';
const contact = { as: 'a', href: telegram, target: '_blank', rel: 'noreferrer' };
export function About() {
  return (
    <section id="about" className="section about">
      <AboutDesign overrides={{ '2351:2431': { as: 'h2' } }} />
    </section>
  );
}
export function Approach() {
  return (
    <section id="approach" className="section approach">
      <ApproachDesign overrides={{ '2351:2420': { as: 'h2' } }} />
    </section>
  );
}
export function Consultation() {
  return (
    <section id="consultation" className="section consultation">
      <ConsultationDesign
        overrides={{ '2351:2059': { as: 'h2' }, '2351:2089': contact, '2351:2088': contact }}
      />
    </section>
  );
}
export function Results() {
  return <ResultsSlider />;
}
export function Reviews() {
  return (
    <section id="reviews" className="section reviews">
      <ReviewsDesign
        overrides={{
          '2351:2571': { as: 'h2' },
          '2351:2573': contact,
          '2351:2566': {
            style: { width: 194, borderRadius: 10 },
            children: (
              <ReviewImage
                src={updatedReviewImages.inspiredToBake}
                alt="Відгук про натхнення готувати"
              />
            ),
          },
          '2351:2567': {
            style: { top: 187, width: 191, height: 129, borderRadius: 11 },
            children: (
              <ReviewImage
                src={updatedReviewImages.clearExplanations}
                alt="Відгук про зрозумілі пояснення"
              />
            ),
          },
          '2351:2580': {
            style: { width: 191, height: 131, borderRadius: 14 },
            children: (
              <ReviewImage
                src={updatedReviewImages.warmAtmosphere}
                alt="Відгук про теплу атмосферу курсу"
              />
            ),
          },
        }}
      />
    </section>
  );
}
export function Diplomas() {
  return <DiplomaSlider />;
}
export function Payment({
  onOpen,
}: {
  onOpen: (method: 'payment-card' | 'payment-mono' | 'payment-privat') => void;
}) {
  const overrides: DesignOverrides = {};
  ['2351:2627', '2351:2647', '2351:2657'].forEach((id, index) => {
    overrides[id] = {
      as: 'button',
      type: 'button',
      onClick: () => onOpen((['payment-card', 'payment-mono', 'payment-privat'] as const)[index]),
      className: 'd580 payment-details-link',
      style: { backgroundImage: 'none' },
      children: (
        <>
          <span>Переглянути умови</span>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12h16m-6-6 6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      ),
    };
  });
  ['2351:2628', '2351:2650', '2351:2658'].forEach((id) => {
    overrides[id] = { style: { display: 'none' }, 'aria-hidden': true };
  });
  return (
    <section id="payment" className="section payment">
      <PaymentDesign overrides={overrides} />
    </section>
  );
}
export function Steps() {
  return (
    <section id="steps" className="section steps">
      <StepsDesign overrides={{ '2351:2670': { as: 'h2' } }} />
    </section>
  );
}
export function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  const overrides: DesignOverrides = {
    '2351:2806': { as: 'a', href: 'mailto:yaninakitchen@gmail.com' },
    '2351:2800': { ...contact, 'aria-label': 'Telegram' },
    '2351:2802': { as: 'a', href: 'mailto:yaninakitchen@gmail.com', 'aria-label': 'E-mail' },
    '2351:2796': {
      as: 'a',
      href: 'https://www.instagram.com/yaninakorinenko/',
      target: '_blank',
      rel: 'noreferrer',
      'aria-label': 'Instagram',
    },
  };
  [
    ['2351:2783', 'courses'],
    ['2351:2784', 'courses'],
    ['2351:2785', 'about'],
    ['2351:2787', 'reviews'],
    ['2351:2788', 'faq'],
  ].forEach(([id, target]) => {
    overrides[id] = {
      as: 'a',
      href: '#' + target,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        onNavigate(target);
      },
    };
  });
  return (
    <footer id="footer" className="section footer">
      <FooterDesign overrides={overrides} />
    </footer>
  );
}
