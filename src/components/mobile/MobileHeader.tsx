import { useEffect, useState } from 'react';
import { telegram } from '../../data/catalog';
import { mobileAssets as a } from '../../design/mobile-assets';
import { Modal } from '../Modal';
const links = [
  ['Головна', 'home'],
  ['Про мене', 'about'],
  ['Курси', 'courses'],
  ['Мінікурси', 'lessons'],
  ['Техкарти', 'recipes'],
  ['Консультація', 'consultation'],
  ['Відгуки', 'reviews'],
  ['Оплата та доступ', 'payment'],
  ['FAQ', 'faq'],
  ['Контакти', 'footer'],
];
export function MobileHeader({
  navigate,
  onCart,
  count,
  showCart = true,
}: {
  navigate: (id: string) => void;
  onCart: () => void;
  count: number;
  showCart?: boolean;
}) {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState('home');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = 'home';
      for (const [, id] of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const go = (id: string) => {
    setOpen(false);
    navigate(id);
  };
  return (
    <>
      <header className="header m-header">
        <button className="m-logo" aria-label="На головну" onClick={() => go('home')}>
          <span>YANINA</span>
          <span>
            <em>KO</em>RINENKO
          </span>
        </button>
        {showCart && (
          <button className="m-bag" aria-label={`Кошик: ${count} товарів`} onClick={onCart}>
            <img src={a.MobileHeaderDesign.imgVuesaxLinearBag2} alt="" />
            {count > 0 && <span>{count}</span>}
          </button>
        )}
        <button
          className="m-menu-button"
          aria-label="Відкрити меню"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <img src={a.MobileHeaderDesign.imgVuesaxLinearMenu} alt="" />
        </button>
      </header>
      {open && (
        <Modal label="Меню сайту" onClose={() => setOpen(false)}>
          <div className="m-menu">
            <img
              className="m-menu-art"
              src={a.MobileMenuDesign.imgDecorationBotanicalIllustration}
              alt=""
            />
            <button
              className="m-menu-close"
              aria-label="Закрити меню"
              onClick={() => setOpen(false)}
            >
              <img src={a.MobileMenuDesign.imgMenuClose} alt="" />
            </button>
            <nav aria-label="Мобільна навігація">
              {links.map(([label, id]) => (
                <a
                  key={id}
                  href={'#' + id}
                  onClick={(e) => {
                    e.preventDefault();
                    go(id);
                  }}
                  aria-current={active === id ? 'location' : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
            <button className="m-primary" onClick={() => go('courses')}>
              Обрати курс <span>→</span>
            </button>
            <p className="m-menu-motto">
              Створюйте солодкі шедеври
              <br />
              разом зі мною
            </p>
            <a className="m-menu-contact" href={telegram} target="_blank" rel="noreferrer">
              Написати в Telegram →
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
