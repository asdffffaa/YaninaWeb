import { useLayoutEffect } from 'react';
/** One entrance per section and route visit; never replays on carousel updates. */
export function usePageReveal(route: string) {
  useLayoutEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const animations = new Set<Animation>();
    const pending = new Map<Element, () => void>();
    const prepare = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, {
        duration: 720,
        easing: 'cubic-bezier(.22,1,.36,1)',
        fill: 'both',
        ...options,
      });
      animation.pause();
      animations.add(animation);
      animation.onfinish = () => {
        animation.cancel();
        animations.delete(animation);
      };
      return animation;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            pending.get(entry.target)?.();
            pending.delete(entry.target);
            observer.unobserve(entry.target);
          }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 },
    );
    const sections = document.querySelectorAll(
      '.home-page .hero,.home-page .section,.checkout-page,.full-course-page',
    );
    sections.forEach((section, index) => {
      const group: Animation[] = [];
      group.push(prepare(section, [{ opacity: 0 }, { opacity: 1 }], { duration: 650 }));
      // Additive transforms preserve the coordinates generated from the design.
      const headings = section.querySelectorAll('h1,h2');
      headings.forEach((heading, i) =>
        group.push(
          prepare(heading, [{ transform: 'translateY(22px)' }, { transform: 'translateY(0)' }], {
            composite: 'add',
            delay: 80 + i * 40,
          }),
        ),
      );
      const cards = section.querySelectorAll(
        '.carousel-page:first-child > article,.carousel-page:first-child > button,.faq-item,.m-rail-viewport > article:nth-child(-n+2),.m-rail-viewport > button:nth-child(-n+2)',
      );
      cards.forEach((card, i) => {
        group.push(
          prepare(card, [{ opacity: 0 }, { opacity: 1 }], { delay: 100 + Math.min(i, 5) * 65 }),
        );
        group.push(
          prepare(card, [{ transform: 'translateY(18px)' }, { transform: 'translateY(0)' }], {
            composite: 'add',
            delay: 100 + Math.min(i, 5) * 65,
          }),
        );
      });
      // Photo-led sections enter from alternating sides; no transforms on sticky containers.
      if (section.matches('.about,.approach,.reviews,.hero')) {
        const art = section.querySelector('img');
        if (art)
          group.push(
            prepare(
              art,
              [
                { transform: `translateX(${index % 2 ? -16 : 16}px)` },
                { transform: 'translateX(0)' },
              ],
              { composite: 'add', duration: 1000, delay: 80 },
            ),
          );
      }
      pending.set(section, () => group.forEach((animation) => animation.play()));
      observer.observe(section);
    });
    // Keyboard navigation and a changed motion preference must expose content immediately.
    const expose = () => {
      observer.disconnect();
      pending.clear();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const section = event.target.closest('.section,.hero,.checkout-page,.full-course-page');
      if (!section) return;
      observer.unobserve(section);
      pending.delete(section);
      section.getAnimations({ subtree: true }).forEach((animation) => {
        if (animations.has(animation)) {
          animation.cancel();
          animations.delete(animation);
        }
      });
    };
    document.addEventListener('focusin', onFocus);
    preference.addEventListener('change', expose);
    return () => {
      expose();
      document.removeEventListener('focusin', onFocus);
      preference.removeEventListener('change', expose);
    };
  }, [route]);
}
