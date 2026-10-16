import { useRef, useState } from 'react';
import DiplomasDesign from '../design/DiplomasDesign';
const images = [
  '/assets/optimized-90c30710d85e7870cc59.webp',
  '/assets/certificate-2.jpg',
  '/assets/certificate-3.png',
  '/assets/certificate-4.png',
  '/assets/certificate-5.png',
];
const titles = [
  'Диплом — Заруба 1.0',
  'Сертифікат — Домашній кондитер',
  'Сертифікат кондитерського курсу',
  'Сертифікат — Мистецтво фудфотографії',
  'Сертифікат — Gift sweet boxes',
];
export function DiplomaSlider() {
  const lastMove = useRef(-Infinity);
  const [active, setActive] = useState(1);
  const move = (next: number) => {
    if (performance.now() - lastMove.current < 1100) return;
    lastMove.current = performance.now();
    setActive((next + images.length) % images.length);
  };
  const items = (
    <div className="diploma-stage certificate-stage" data-active-diploma={active}>
      {images.map((src, i) => {
        const offset = ((i - active + images.length + 2) % images.length) - 2;
        const role =
          offset === 0
            ? 'active'
            : offset === -1
              ? 'left'
              : offset === 1
                ? 'right'
                : offset < 0
                  ? 'off-left'
                  : 'off-right';
        return (
          <figure key={src} className={`diploma-slide ${role}`} aria-hidden={Math.abs(offset) > 1}>
            <div className="diploma-crop">
              <img loading="lazy" decoding="async" src={src} alt={titles[i]} />
            </div>
          </figure>
        );
      })}
    </div>
  );
  return (
    <section id="diplomas" className="section diplomas">
      <DiplomasDesign
        overrides={{
          '2351:2591': { style: { display: 'none' } },
          '2351:2611': { style: { display: 'none' } },
          '2351:2610': { style: { left: 0, top: 0, width: 1920, height: 654 }, children: items },
          '2351:2600': {
            as: 'button',
            type: 'button',
            'aria-label': 'Наступний диплом',
            onClick: () => move(active + 1),
          },
          '2351:2605': {
            as: 'button',
            type: 'button',
            'aria-label': 'Попередній диплом',
            onClick: () => move(active - 1),
          },
          '2351:2593': {
            children: (
              <div className="certificate-dots">
                {images.map((src, i) => (
                  <button
                    key={src}
                    aria-label={`Диплом ${i + 1}`}
                    aria-current={i === active ? 'true' : undefined}
                    onClick={() => move(i)}
                  />
                ))}
              </div>
            ),
          },
        }}
      />
    </section>
  );
}
