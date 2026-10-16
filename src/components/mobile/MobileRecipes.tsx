import { recipeFilters as filters, matchesRecipeFilter } from '../../data/recipeFilters';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { recipes, type Product } from '../../data/catalog';
import MobileRecipesDesign from '../../design/MobileRecipesDesign';
import { SmallCard } from '../SmallCard';
import { MobileRail } from './MobileRail';
const hidden = { style: { display: 'none' } };
export function MobileRecipes({ onOpen }: { onOpen: (p: Product) => void }) {
  const [filter, setFilter] = useState('Усі'),
    [expanded, setExpanded] = useState(false),
    [closing, setClosing] = useState(false);
  const section = useRef<HTMLElement>(null),
    toolbar = useRef<HTMLDivElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousHeight = useRef<number | null>(null);
  useLayoutEffect(() => {
    const node = section.current;
    if (!node || previousHeight.current === null) return;
    const from = previousHeight.current;
    previousHeight.current = null;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animation = node.animate(
      [{ height: from + 'px' }, { height: node.offsetHeight + 'px' }],
      { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)' },
    );
    return () => animation.cancel();
  }, [expanded]);
  const visible = recipes.filter((p) => matchesRecipeFilter(p.category, filter));
  useEffect(() => {
    if (!expanded) {
      toolbar.current?.style.setProperty('--panel-opacity', '0');
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!section.current || !toolbar.current) return;
      const bounds = section.current.getBoundingClientRect(),
        scale = bounds.width / 402;
      toolbar.current.style.setProperty(
        '--panel-opacity',
        String(Math.max(0, Math.min(1, (75 * scale - bounds.top - 275 * scale) / (100 * scale)))),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [expanded]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const toggle = () => {
    if (closing) return;
    if (!expanded) {
      previousHeight.current = section.current?.offsetHeight ?? null;
      setExpanded(true);
      return;
    }
    setClosing(true);
    section.current?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
    timer.current = setTimeout(
      () => {
        previousHeight.current = section.current?.offsetHeight ?? null;
        setExpanded(false);
        setClosing(false);
      },
      matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500,
    );
  };
  return (
    <section
      id="recipes"
      ref={section}
      className={'section m-section m-recipes ' + (expanded ? 'is-expanded' : '')}
      style={{ height: expanded ? 'auto' : 917 }}
    >
      <div className="m-recipes-heading">
        <MobileRecipesDesign
          overrides={{
            '2351:3203': { as: 'h2' },
            '2351:3205': hidden,
            '2351:3221': hidden,
            '2351:3290': hidden,
            '2351:3294': hidden,
          }}
        />
      </div>
      <div ref={toolbar} className="m-filters">
        <div className="m-filter-scroll">
          {filters.map((f) => (
            <button
              key={f}
              className={'filter ' + (filter === f ? 'selected' : '')}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        {expanded && (
          <button className="m-primary" disabled={closing} onClick={toggle}>
            Показати менше
          </button>
        )}
      </div>
      {expanded ? (
        <div className="m-expanded-grid">
          {visible.map((p) => (
            <SmallCard key={p.id} product={p} onOpen={() => onOpen(p)} />
          ))}
        </div>
      ) : (
        <div className="m-recipe-rail">
          <MobileRail key={filter} label="Техкарти">
            {visible.map((p) => (
              <SmallCard key={p.id} product={p} onOpen={() => onOpen(p)} />
            ))}
          </MobileRail>
        </div>
      )}
      {!visible.length && <p className="m-empty">У цій категорії поки немає техкарт.</p>}
      <button className="m-primary m-catalog-toggle" disabled={closing} onClick={toggle}>
        {expanded ? 'Показати менше' : 'Переглянути всі'} <span>→</span>
      </button>
    </section>
  );
}
