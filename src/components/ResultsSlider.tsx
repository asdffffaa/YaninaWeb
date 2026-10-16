import { useEffect, useRef, useState } from 'react';
import ResultsDesign from '../design/ResultsDesign';
import { designAssets } from '../design/assets';
const a = designAssets.ResultsDesign;
const pairs = [
  { before: a.imgImage27, after: a.imgPhoto1202609280348311 },
  { before: a.imgImage28, after: a.imgPhoto11202609280348311 },
];
function ResultPair({ before, after }: { before: string; after: string }) {
  return (
    <article className="result-pair">
      {[
        [before, 'ДО'],
        [after, 'ПІСЛЯ'],
      ].map(([src, label]) => (
        <div className="result-photo" key={label}>
          <div className="result-label">
            <img loading="lazy" decoding="async" src={a.imgLine103} alt="" />
            <span>{label}</span>
            <img loading="lazy" decoding="async" src={a.imgLine104} alt="" />
          </div>
          <div className="result-image">
            <img
              loading="lazy"
              decoding="async"
              src={src}
              alt={`${label.toLowerCase()} навчання`}
            />
          </div>
        </div>
      ))}
    </article>
  );
}
function ResultsCarousel() {
  const pages = [pairs, [...pairs].reverse()];
  const [slot, setSlot] = useState(1),
    [animate, setAnimate] = useState(false);
  const busy = useRef(false);
  const settle = () => {
    busy.current = false;
    setAnimate(false);
    setSlot((current) =>
      current === 0 ? pages.length : current === pages.length + 1 ? 1 : current,
    );
  };
  useEffect(() => {
    if (!animate) return;
    const timer = setTimeout(settle, 1050);
    return () => clearTimeout(timer);
  }, [slot, animate]);
  const move = (direction: number) => {
    if (busy.current) return;
    busy.current = true;
    setAnimate(true);
    setSlot((current) => current + direction);
  };
  return (
    <div className="carousel results-carousel" aria-roledescription="карусель">
      <button
        className="carousel-arrow prev"
        aria-label="Попередні результати"
        onClick={() => move(-1)}
      >
        <img loading="lazy" decoding="async" src={a.imgArrowCircleLeft} alt="" />
      </button>
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ left: -slot * 1338, transition: animate ? undefined : 'none' }}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget && e.propertyName === 'left') settle();
          }}
          data-slide-index={(slot - 1 + pages.length) % pages.length}
        >
          {[pages[pages.length - 1], ...pages, pages[0]].map((page, i) => (
            <div className="carousel-page" key={i} aria-hidden={i !== slot}>
              {page.map((pair, j) => (
                <ResultPair key={j} {...pair} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel-arrow next"
        aria-label="Наступні результати"
        onClick={() => move(1)}
      >
        <img loading="lazy" decoding="async" src={a.imgArrowCircleLeft} alt="" />
      </button>
    </div>
  );
}
export function ResultsSlider() {
  return (
    <section id="results" className="section results">
      <ResultsDesign
        overrides={{
          '2351:2519': { as: 'h2' },
          '2351:2521': {
            style: { width: 1274, overflow: 'visible' },
            children: <ResultsCarousel />,
          },
          '2351:2534': { style: { display: 'none' } },
          '2351:2548': { style: { display: 'none' } },
          '2351:2552': { style: { display: 'none' } },
        }}
      />
    </section>
  );
}
