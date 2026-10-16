import { useEffect, useRef, useState } from 'react';
import { designAssets } from '../../design/assets';
import MobileStepsDesign from '../../design/MobileStepsDesign';
import { Section } from './MobileSection';
import { advanceStep, AUTO_STEP_MS, selectStep, stepProgress } from './stepTimeline';
export function MobileSteps({ navigate }: { navigate: (id: string) => void }) {
  const [step, setStep] = useState(0);
  const tabs = useRef<HTMLDivElement>(null),
    progress = useRef<HTMLSpanElement>(null);
  const timer = useRef({ step: 0, elapsed: 0, duration: AUTO_STEP_MS });
  const text = [
    ['Оберіть продукт', 'Курс, урок або техкарту, що відповідає вашій цілі.'],
    ['Оплатіть', 'Повністю або частинами — як вам зручно.'],
    ['Отримайте доступ', 'Матеріали та інструкції надходять одразу.'],
    ['Навчайтеся', 'Проходьте уроки у власному темпі.'],
  ];
  const icons = [
    designAssets.StepsDesign.imgStepIcon,
    designAssets.StepsDesign.imgStepIcon1,
    designAssets.StepsDesign.imgStepIcon2,
    designAssets.StepsDesign.imgStepIcon3,
  ];
  const paint = () => {
    if (progress.current)
      progress.current.style.transform = `scaleX(${stepProgress(timer.current)})`;
  };
  const choose = (index: number) => {
    timer.current = selectStep(index);
    setStep(index);
    paint();
  };
  useEffect(() => {
    let visible = false,
      frame = 0,
      last = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tick = (now: number) => {
      frame = 0;
      const t = timer.current,
        previous = t.step;
      if (last) advanceStep(t, now - last);
      if (t.step !== previous) setStep(t.step);
      paint();
      last = now;
      frame = requestAnimationFrame(tick);
    };
    // No frame loop while offscreen, in a hidden tab, or with reduced motion.
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.8;
        sync();
      },
      { threshold: [0, 0.8] },
    );
    if (tabs.current) observer.observe(tabs.current);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    paint();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);
  return (
    <Section id="steps" height={880}>
      <MobileStepsDesign
        overrides={{
          '2351:3360': { as: 'h2' },
          '2351:3362': {
            style: { overflow: 'visible' },
            children: (
              <div ref={tabs} className="m-step-tabs">
                <span className="m-step-track" aria-hidden="true">
                  <span ref={progress} />
                </span>
                {text.map((_, i) => (
                  <button
                    key={i}
                    className={i <= step ? 'is-complete' : ''}
                    aria-label={`Крок ${i + 1}`}
                    aria-pressed={step === i}
                    onClick={() => choose(i)}
                  >
                    <span className="m-step-number">{`0${i + 1}`}</span>
                  </button>
                ))}
              </div>
            ),
          },
          '2351:3373': {
            children: (
              <div key={step} className="m-step-content">
                <img loading="lazy" decoding="async" src={icons[step]} alt="" />
                <div>
                  <p className="mob318">{text[step][0]}</p>
                  <p className="m-step-description">{text[step][1]}</p>
                </div>
              </div>
            ),
          },
          '2351:3400': { as: 'button', onClick: () => navigate('courses') },
        }}
      />
    </Section>
  );
}
