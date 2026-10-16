import { memo } from 'react';
import { reviewImages } from '../../data/reviews';
import { ReviewImage } from '../ReviewImage';
import { courses, lessons, telegram, type Product } from '../../data/catalog';
import { type DesignOverrides } from '../../design/bindDesign';

import MobileAboutDesign from '../../design/MobileAboutDesign';
import MobileCoursesDesign from '../../design/MobileCoursesDesign';
import MobileDividerDesign from '../../design/MobileDividerDesign';
import MobileFooterDesign from '../../design/MobileFooterDesign';
import MobileHeroDesign from '../../design/MobileHeroDesign';
import MobileLessonsDesign from '../../design/MobileLessonsDesign';
import MobilePathsDesign from '../../design/MobilePathsDesign';
import { MobilePayment } from './MobilePayment';
import MobileReviewsDesign from '../../design/MobileReviewsDesign';
import { CourseCard } from '../CourseCard';
import { SmallCard } from '../SmallCard';
import { MobileApproach } from './MobileApproach';
import { MobileConsultation } from './MobileConsultation';
import { MobileFAQ } from './MobileFAQ';
import { MobileRail } from './MobileRail';
import { MobileRecipes } from './MobileRecipes';
import { MobileResults } from './MobileResults';
import { Section } from './MobileSection';
import { MobileSteps } from './MobileSteps';
const hidden = { style: { display: 'none' } };
const link = { as: 'a', href: telegram, target: '_blank', rel: 'noreferrer' };
export const MobileHome = memo(function MobileHome({
  onOpen,
  onPayment,
  navigate,
}: {
  onOpen: (p: Product) => void;
  onPayment: (method: 'payment-card' | 'payment-mono' | 'payment-privat') => void;
  navigate: (id: string) => void;
}) {
  const paths: DesignOverrides = {};
  ['2351:2991', '2351:2992', '2351:2993', '2351:2994'].forEach(
    (id, i) =>
      (paths[id] = {
        as: 'button',
        onClick: () => navigate(['courses', 'lessons', 'recipes', 'consultation'][i]),
      }),
  );
  const footer: DesignOverrides = {};
  ['2351:3531', '2351:3532', '2351:3533', '2351:3535', '2351:3536'].forEach(
    (id, i) =>
      (footer[id] = {
        as: 'button',
        onClick: () => navigate(['courses', 'lessons', 'about', 'reviews', 'faq'][i]),
      }),
  );
  Object.assign(footer, {
    '2351:3542': { as: 'a', href: 'mailto:yaninakitchen@gmail.com', 'aria-label': 'E-mail' },
    '2351:3548': {
      as: 'a',
      href: 'https://www.instagram.com/yaninakorinenko/',
      target: '_blank',
      rel: 'noreferrer',
      'aria-label': 'Instagram',
    },
    '2351:3555': { ...link, 'aria-label': 'Telegram' },
    '2351:3561': { as: 'a', href: 'mailto:yaninakitchen@gmail.com' },
  });
  return (
    <main className="home-page mobile-home">
      <Section id="home" height={1063} className="hero">
        <MobileHeroDesign
          overrides={{
            '2351:2969': { as: 'h1' },
            '2351:2972': { as: 'button', onClick: () => navigate('courses') },
            '2351:2974': { as: 'button', onClick: () => navigate('recipes') },
          }}
        />
      </Section>
      <Section id="learning-paths" height={708}>
        <MobilePathsDesign overrides={{ ...paths, '2351:2989': { as: 'h2' } }} />
        <div className="m-about-divider">
          <MobileDividerDesign />
        </div>
      </Section>
      <Section id="about" height={921} className="m-about">
        <MobileAboutDesign overrides={{ '2351:3004': { as: 'h2' } }} />
      </Section>
      <MobileApproach navigate={navigate} />
      <Section id="courses" height={962} className="m-courses">
        <MobileCoursesDesign
          overrides={{
            '2351:3118': { as: 'h2' },
            '2351:3052': {
              style: { width: 382, height: 616, overflow: 'visible' },
              children: (
                <MobileRail step={342} label="Курси">
                  {courses.map((p) => (
                    <CourseCard
                      key={p.id}
                      course={{
                        ...p,
                        description:
                          p.id === 'kondyter-start'
                            ? 'База кондитерської справи: рецептури, техніки та впевнений старт.'
                            : p.description,
                      }}
                      onOpen={() => onOpen(p)}
                    />
                  ))}
                </MobileRail>
              ),
            },
            '2351:3113': hidden,
          }}
        />
      </Section>
      <Section id="lessons" height={790} className="m-lessons">
        <MobileLessonsDesign
          overrides={{
            '2351:3121': { as: 'h2' },
            '2351:3123': {
              style: { width: 382, overflow: 'visible' },
              children: (
                <MobileRail label="Мінікурси">
                  {lessons.map((p) => (
                    <SmallCard key={p.id} product={p} onOpen={() => onOpen(p)} />
                  ))}
                </MobileRail>
              ),
            },
            '2351:3197': hidden,
          }}
        />
      </Section>
      <MobileRecipes onOpen={onOpen} />
      <MobileConsultation />
      <MobileResults />
      <Section id="reviews" height={866}>
        <MobileReviewsDesign
          overrides={{
            '2351:3323': { as: 'h2' },
            '2351:3326': link,
            '2351:3328': {
              style: { overflow: 'visible' },
              children: (
                <MobileRail step={329} label="Відгуки">
                  {reviewImages.map((src, i) => (
                    <ReviewImage
                      className="m-review"
                      key={`${src}-${i}`}
                      src={src}
                      alt={`Відгук учениці ${i + 1}`}
                    />
                  ))}
                </MobileRail>
              ),
            },
            '2351:3338': hidden,
          }}
        />
      </Section>
      <section id="diplomas" className="section m-section m-certificates">
        <MobileRail step={342} initial={0} label="Сертифікат" dots loop>
          {[
            'certificate-2.jpg',
            'certificate-3.png',
            'certificate-4.png',
            'certificate-5.png',
            'certificate-1.png',
          ].map((src, i) => (
            <img
              loading="lazy"
              decoding="async"
              key={src}
              className="m-certificate"
              src={'/assets/' + src}
              alt={`Сертифікат ${i + 1}`}
            />
          ))}
        </MobileRail>
      </section>
      <MobilePayment onPayment={onPayment} />
      <MobileSteps navigate={navigate} />
      <MobileFAQ />
      <Section id="footer" height={826}>
        <MobileFooterDesign overrides={footer} />
      </Section>
    </main>
  );
});
