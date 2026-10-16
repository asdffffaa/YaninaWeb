import { useEffect, useRef } from 'react';
import HeaderDesign from '../design/HeaderDesign';
const nav = [
  ['home', 'Головна'],
  ['about', 'Про мене'],
  ['courses', 'Курси'],
  ['recipes', 'Техкарти'],
  ['consultation', 'Консультація'],
  ['reviews', 'Відгуки'],
  ['faq', 'FAQ'],
];
export function Header({
  onCart,
  onNavigate,
  cartCount,
  route = '/',
  productKind,
}: {
  onCart: () => void;
  onNavigate: (id: string) => void;
  cartCount: number;
  route?: string;
  productKind?: string;
}) {
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = header.current;
    if (!root) return;
    let frame = 0;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      frame = 0;
      const edge = root.getBoundingClientRect().bottom;
      // A short reading band below the sticky header keeps intermediate sections neutral.
      const bottom = edge + Math.min(200, Math.max(80, (window.innerHeight - edge) * 0.25));
      const height = Math.max(1, bottom - edge);
      const middle = edge + height / 2;
      const sections = [
        ...document.querySelectorAll<HTMLElement>('main .section[id], main .hero[id]'),
      ].map((element) => ({ id: element.id, rect: element.getBoundingClientRect() }));
      for (const [id] of nav) {
        const link = root.querySelector<HTMLAnchorElement>(`a[data-section="${id}"]`);
        if (!link) continue;
        let start = 0,
          end = 0,
          current = false;
        if (route === '/') {
          const sectionIndex = sections.findIndex((section) => section.id === id);
          const section = sections[sectionIndex];
          if (section) {
            const rect = section.rect;
            const sectionBottom = Math.max(
              rect.bottom,
              sections[sectionIndex + 1]?.rect.top ?? rect.bottom,
            );
            const visible = Math.max(0, Math.min(sectionBottom, bottom) - Math.max(rect.top, edge));
            const fraction = Math.min(
              1,
              visible / Math.max(1, Math.min(sectionBottom - rect.top, height)),
            );
            current = rect.top <= middle && sectionBottom > middle;
            // Incoming red grows from the left; outgoing black erases from the left.
            if (motion.matches) end = current ? 100 : 0;
            else if (rect.top < edge) {
              start = (1 - fraction) * 100;
              end = 100;
            } else end = fraction * 100;
          }
        } else if (route.startsWith('/course/')) {
          current = id === (productKind === 'recipe' ? 'recipes' : 'courses');
          end = current ? 100 : 0;
        }
        link.style.setProperty('--nav-red-start', `${start.toFixed(3)}%`);
        link.style.setProperty('--nav-red-end', `${end.toFixed(3)}%`);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Lazy sections, image loading and expanding catalogues change section geometry.
    const resize = new ResizeObserver(schedule);
    const observeSections = () => {
      document
        .querySelectorAll('main, main section[id]')
        .forEach((element) => resize.observe(element));
      schedule();
    };
    const mutations = new MutationObserver(observeSections);
    const canvas = root.parentElement;
    if (canvas) mutations.observe(canvas, { childList: true, subtree: true });
    observeSections();
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
    };
  }, [route, productKind]);
  const overrides: Parameters<typeof HeaderDesign>[0]['overrides'] = {
    '2351:2500': {
      as: 'nav',
      'aria-label': 'Головна навігація',
      children: nav.map(([id, label]) => (
        <a
          key={id}
          href={'#' + id}
          data-section={id}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(id);
          }}
        >
          {label}
        </a>
      )),
    },
    '2352:4613': {
      as: 'button',
      type: 'button',
      onClick: onCart,
      'aria-label': `Кошик: ${cartCount} товари`,
      style: route === '/checkout' ? { display: 'none' } : undefined,
    },
    '2352:4622': { children: <span className="cart-badge">{cartCount}</span> },
    '2351:2497': {
      as: 'a',
      href: '#home',
      onClick: (event: React.MouseEvent) => {
        event.preventDefault();
        onNavigate('home');
      },
    },
    '2351:2507': { as: 'button', type: 'button', onClick: () => onNavigate('courses') },
  };
  return (
    <header className="header" ref={header}>
      <HeaderDesign overrides={overrides} />
    </header>
  );
}
