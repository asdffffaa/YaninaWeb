import { recipeFilters as filters, matchesRecipeFilter } from '../data/recipeFilters';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { recipes, type Product } from '../data/catalog';
import { designAssets } from '../design/assets';
import TechCardsDesign from '../design/TechCardsDesign';
import { Carousel, CarouselProgress } from './Carousel';
import { SmallCard } from './SmallCard';
export function TechCards({ onOpen }: { onOpen: (product: Product) => void }) {
  const [expanded, setExpanded] = useState(false),
    [filter, setFilter] = useState('Усі'),
    [index, setIndex] = useState(0);
  const [scrubbing, setScrubbing] = useState(false),
    [height, setHeight] = useState(792),
    [animating, setAnimating] = useState(false);
  const section = useRef<HTMLElement>(null),
    frame = useRef(0),
    restoreAnchor = useRef<(() => void) | null>(null);
  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      restoreAnchor.current?.();
    },
    [],
  );
  useEffect(() => {
    if (!expanded) return;
    let pending = 0;
    const update = () => {
      pending = 0;
      const boundary = section.current?.querySelector('.catalog-toolbar-boundary');
      const toolbar = section.current?.querySelector('.catalog-toolbar');
      const header = document.querySelector('.header');
      if (!boundary || !toolbar || !header) return;
      const bounds = boundary.getBoundingClientRect(),
        bar = toolbar.getBoundingClientRect(),
        bottom = header.getBoundingClientRect().bottom;
      toolbar.classList.toggle(
        'is-pinned',
        bounds.top <= bottom + 0.5 && bounds.bottom >= bottom + bar.height,
      );
      // Reveal over 120 design pixels after docking; reverse naturally on scroll up.
      const scale = bar.height / 72;
      const progress = Math.max(
        0,
        Math.min(1, (bottom - bounds.top) / (120 * scale), (bounds.bottom - bottom) / bar.height),
      );
      (toolbar as HTMLElement).style.setProperty(
        '--panel-opacity',
        String(progress * progress * (3 - 2 * progress)),
      );
    };
    const schedule = () => {
      if (!pending) pending = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    if (section.current) observer.observe(section.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(pending);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [expanded]);
  const visible = recipes.filter((p) => matchesRecipeFilter(p.category, filter));
  const gridHeight = Math.ceil(visible.length / 4) * 448;
  const animate = (target: number, returnToStart: boolean, done?: () => void) => {
    cancelAnimationFrame(frame.current);
    restoreAnchor.current?.();
    const startHeight = section.current?.offsetHeight ?? height,
      startScroll = window.scrollY;
    const destination = returnToStart
      ? Math.max(
          0,
          startScroll +
            (section.current?.getBoundingClientRect().top ?? 0) -
            (document.querySelector('.header')?.getBoundingClientRect().height ?? 0),
        )
      : startScroll;
    const root = document.documentElement,
      oldAnchor = root.style.overflowAnchor,
      oldBehavior = root.style.scrollBehavior;
    root.style.overflowAnchor = 'none';
    root.style.scrollBehavior = 'auto';
    restoreAnchor.current = () => {
      root.style.overflowAnchor = oldAnchor;
      root.style.scrollBehavior = oldBehavior;
      restoreAnchor.current = null;
    };
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 900;
    const start = performance.now();
    setAnimating(true);
    const tick = (now: number) => {
      const t = duration ? Math.min(1, (now - start) / duration) : 1;
      const eased = t * t * (3 - 2 * t);
      section.current?.style.setProperty(
        '--catalog-height',
        `${startHeight + (target - startHeight) * eased}px`,
      );
      if (returnToStart)
        window.scrollTo({
          top: startScroll + (destination - startScroll) * eased,
          behavior: 'instant',
        });
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else {
        setHeight(target);
        setAnimating(false);
        done?.();
        restoreAnchor.current?.();
      }
    };
    frame.current = requestAnimationFrame(tick);
  };
  const toggle = () => {
    if (animating) return;
    if (expanded)
      animate(792, true, () => {
        setExpanded(false);
        setIndex(0);
      });
    else {
      setExpanded(true);
      setIndex(0);
      animate(Math.max(792, gridHeight + 390), false);
    }
  };
  const selectFilter = (label: string) => {
    if (animating) return;
    setFilter(label);
    setIndex(0);
    setScrubbing(false);
    if (expanded) {
      const count = recipes.filter((p) => matchesRecipeFilter(p.category, label)).length;
      animate(Math.max(792, Math.ceil(count / 4) * 448 + 390), true);
    }
  };
  return (
    <section
      ref={section}
      id="recipes"
      className={
        'section tech-cards ' +
        (expanded ? 'expanded ' : '') +
        (animating ? 'catalog-animating' : '')
      }
      style={
        { height: 'var(--catalog-height)', '--catalog-height': `${height}px` } as CSSProperties
      }
    >
      <TechCardsDesign
        overrides={{
          '2351:2101': { as: 'h2' },
          '2351:2170': { children: null, style: { display: 'none' } },
          '2351:2185': { children: null, style: { display: 'none' } },
          '2351:2103': {
            id: 'tech-card-list',
            children: visible.length ? (
              expanded ? (
                <div className="tech-grid">
                  {visible.map((product) => (
                    <SmallCard key={product.id} product={product} onOpen={() => onOpen(product)} />
                  ))}
                </div>
              ) : (
                <Carousel
                  peek
                  continuous
                  pageStep={1256}
                  scrubbing={scrubbing}
                  key={filter}
                  index={index}
                  arrow={designAssets.TechCardsDesign.imgArrowCircleLeft}
                  onIndexChange={(next) => {
                    setScrubbing(false);
                    setIndex(next);
                  }}
                >
                  {visible.map((product) => (
                    <SmallCard key={product.id} product={product} onOpen={() => onOpen(product)} />
                  ))}
                </Carousel>
              )
            ) : (
              <p className="catalog-empty" role="status">
                У цій категорії поки немає техкарт.
              </p>
            ),
            style: {
              overflow: expanded ? 'clip' : 'visible',
              height: expanded ? 'max(416px, calc(var(--catalog-height) - 390px))' : 416,
            },
          },
          '2351:2189': { style: { display: 'none' } },
          '2351:2193': { style: { display: 'none' } },
          '2351:2096': {
            children: (
              <CarouselProgress
                continuous
                scrubbing={scrubbing}
                onScrubbingChange={setScrubbing}
                index={index}
                count={Math.max(1, Math.ceil(visible.length / 4))}
                onChange={setIndex}
              />
            ),
            style: { overflow: 'visible', display: expanded ? 'none' : undefined },
          },
        }}
      />
      <div className="catalog-toolbar-boundary">
        <div className="catalog-toolbar" key={expanded ? 'expanded' : 'collapsed'}>
          <div className="catalog-filters" role="group" aria-label="Смак техкарти">
            {filters.map((label) => (
              <button
                key={label}
                className={'filter ' + (filter === label ? 'selected' : '')}
                onClick={() => selectFilter(label)}
                disabled={animating}
                aria-pressed={filter === label}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="catalog-toggle"
            type="button"
            onClick={toggle}
            disabled={animating}
            aria-expanded={expanded}
            aria-controls="tech-card-list"
          >
            {expanded ? 'Показати менше' : 'Переглянути всі'}
          </button>
        </div>
      </div>
    </section>
  );
}
