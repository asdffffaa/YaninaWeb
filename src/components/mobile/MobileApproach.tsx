import { useState } from 'react';
import { designAssets } from '../../design/assets';
import { mobileAssets as a } from '../../design/mobile-assets';
import MobileApproachDesign from '../../design/MobileApproachDesign';
import { Section } from './MobileSection';
export function MobileApproach({ navigate }: { navigate: (id: string) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const icons = designAssets.ApproachDesign;
  const approachIcons = [
    icons.imgPastryPipingBagIcon1,
    icons.imgGroup,
    '/assets/mobile-approach-cake.svg',
    '/assets/mobile-approach-clock.svg',
    icons.img24Support,
  ];
  const titles = [
    'Чітка технологія',
    'Доступні пояснення',
    'Практичний результат',
    'Навчання у власному темпі',
    'Підтримка',
  ];
  const descriptions = [
    'Покрокові процеси — без води та зайвого, тільки важливе. Ви точно знаєте, що і навіщо робите.',
    'Пояснюю складне просто: від інгредієнтів до готового десерту.',
    'Відпрацьовуйте техніки та створюйте власні стабільні результати.',
    'Повертайтеся до уроків і практикуйте у зручний для вас час.',
    'Формат підтримки зазначено в описі кожної програми.',
  ];
  return (
    <Section id="approach" height={open === null ? 831 : 998}>
      <MobileApproachDesign
        overrides={{
          '2351:3017': { as: 'h2' },
          '2351:3020': {
            style: { overflow: 'visible', height: 'auto' },
            children: (
              <div className="m-approach-list">
                {titles.map((title, i) => (
                  <article key={title} className={'m-approach-card ' + (open === i ? 'open' : '')}>
                    <button
                      aria-expanded={open === i}
                      aria-controls={`approach-panel-${i}`}
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      <span className={`m-approach-icon m-approach-icon-${i}`} aria-hidden="true">
                        <img loading="lazy" decoding="async" src={approachIcons[i]} alt="" />
                      </span>
                      <span>{title}</span>
                      <img
                        loading="lazy"
                        decoding="async"
                        className="m-chevron"
                        src={a.MobileApproachDesign.imgChevronDown1}
                        alt=""
                      />
                    </button>
                    <div className="m-approach-reveal" inert={open !== i} aria-hidden={open !== i}>
                      <div>
                        <p id={`approach-panel-${i}`}>{descriptions[i]}</p>
                        <button className="m-primary" onClick={() => navigate('courses')}>
                          Дивитися програми <span>→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ),
          },
        }}
      />
    </Section>
  );
}
