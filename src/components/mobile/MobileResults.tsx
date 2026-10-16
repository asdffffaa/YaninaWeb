import { useEffect, useRef, useState } from 'react';
import { designAssets } from '../../design/assets';
import { mobileAssets as a } from '../../design/mobile-assets';
import MobileResultsDesign from '../../design/MobileResultsDesign';
import { Section } from './MobileSection';
export function MobileResults() {
  const [split, setSplit] = useState(52);
  const [pair, setPair] = useState(0);
  const comparison = useRef<HTMLDivElement>(null);
  const heldPointer = useRef<number | null>(null);
  const restartTimer = useRef(() => {});
  const release = () => {
    if (heldPointer.current === null) return;
    heldPointer.current = null;
    restartTimer.current();
  };
  const pairs = [
    [a.MobileResultsDesign.imgImage27, a.MobileResultsDesign.imgPhoto1202609280348311],
    [designAssets.ResultsDesign.imgImage28, designAssets.ResultsDesign.imgPhoto11202609280348311],
  ];
  useEffect(() => {
    let visible = false;
    let timer: number | undefined;
    const sync = () => {
      window.clearInterval(timer);
      if (visible && !document.hidden && heldPointer.current === null)
        timer = window.setInterval(() => setPair((current) => (current + 1) % 2), 5000);
    };
    restartTimer.current = sync;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    if (comparison.current) observer.observe(comparison.current);
    document.addEventListener('visibilitychange', sync);
    // Load the second pair before its first turn, so both sides switch together.
    for (const src of pairs[1]) {
      const image = new Image();
      image.src = src;
    }
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      restartTimer.current = () => {};
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  const move = (x: number, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    setSplit(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };
  return (
    <Section id="results" height={657}>
      <MobileResultsDesign
        overrides={{
          '2351:3304': { as: 'h2' },
          '2351:3307': {
            children: (
              <div
                className="m-comparison"
                ref={comparison}
                role="slider"
                tabIndex={0}
                aria-label="Порівняти до і після"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(split)}
                onPointerDown={(e) => {
                  if (e.button !== 0 || heldPointer.current !== null) return;
                  heldPointer.current = e.pointerId;
                  restartTimer.current();
                  e.currentTarget.setPointerCapture(e.pointerId);
                  move(e.clientX, e.currentTarget);
                }}
                onPointerMove={(e) => {
                  if (e.currentTarget.hasPointerCapture(e.pointerId))
                    move(e.clientX, e.currentTarget);
                }}
                onPointerUp={(e) => {
                  if (heldPointer.current === e.pointerId) release();
                  if (e.currentTarget.hasPointerCapture(e.pointerId))
                    e.currentTarget.releasePointerCapture(e.pointerId);
                }}
                onPointerCancel={release}
                onLostPointerCapture={release}
                onKeyDown={(e) => {
                  const delta = e.key === 'ArrowLeft' ? -5 : e.key === 'ArrowRight' ? 5 : 0;
                  if (delta || e.key === 'Home' || e.key === 'End') {
                    e.preventDefault();
                    setSplit((value) =>
                      e.key === 'Home'
                        ? 0
                        : e.key === 'End'
                          ? 100
                          : Math.max(0, Math.min(100, value + delta)),
                    );
                  }
                }}
              >
                {pairs.map(([before, after], index) => (
                  <div
                    key={before}
                    className="m-comparison-pair"
                    style={{ opacity: index === 0 || pair === index ? 1 : 0 }}
                    aria-hidden={pair !== index}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      src={before}
                      alt="До навчання"
                    />
                    <img
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={{ clipPath: `inset(0 0 0 ${split}%)` }}
                      src={after}
                      alt="Після навчання"
                    />
                  </div>
                ))}
                <div
                  className="m-comparison-label"
                  style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
                  aria-hidden="true"
                >
                  <span className="m-before">ДО</span>
                </div>
                <div
                  className="m-comparison-label"
                  style={{ clipPath: `inset(0 0 0 ${split}%)` }}
                  aria-hidden="true"
                >
                  <span className="m-after">ПІСЛЯ</span>
                </div>
                <div className="m-comparison-line" style={{ left: `${split}%` }}>
                  <span className="m-comparison-handle" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            ),
          },
        }}
      />
    </Section>
  );
}
