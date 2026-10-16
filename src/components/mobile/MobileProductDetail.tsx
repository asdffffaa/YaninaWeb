import { useEffect, useRef, useState, type PointerEvent, type CSSProperties } from 'react';
import { type Product, formatPrice } from '../../data/catalog';
import { mobileAssets } from '../../design/mobile-assets';
const a = mobileAssets.MobileExpandedDesign;
export function MobileProductDetail({
  product,
  onClose,
  onPurchase,
}: {
  product: Product;
  onClose: () => void;
  onPurchase: (p: Product) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentAtTop, setContentAtTop] = useState(true);
  const [dragHeight, setDragHeight] = useState<number | null>(null);
  const gesture = useRef<{ y: number; height: number; moved: boolean } | null>(null);
  const sheet = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const fullyExpanded = useRef(false);
  const expand = () => {
    fullyExpanded.current = true;
    setExpanded(true);
    setDragHeight(null);
  };
  useEffect(() => {
    const element = content.current!;
    let touchY = 0,
      expandingTouch = false;
    const grow = (delta: number) => {
      if (delta <= 0 || fullyExpanded.current) return;
      const maximum = (window.innerHeight * 5) / 6;
      const next = Math.min(maximum, sheet.current!.getBoundingClientRect().height + delta);
      if (next >= maximum - 1) expand();
      else setDragHeight(next);
    };
    const wheel = (event: WheelEvent) => {
      if (fullyExpanded.current) return;
      event.preventDefault();
      grow(
        event.deltaY *
          (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1),
      );
    };
    const start = (event: TouchEvent) => {
      touchY = event.touches[0].clientY;
      expandingTouch = !fullyExpanded.current;
    };
    const move = (event: TouchEvent) => {
      const y = event.touches[0].clientY,
        delta = touchY - y;
      touchY = y;
      if (expandingTouch) {
        event.preventDefault();
        grow(delta);
      } else if (
        (delta < 0 && element.scrollTop <= 0) ||
        (delta > 0 && element.scrollTop + element.clientHeight >= element.scrollHeight - 1)
      ) {
        event.preventDefault();
      }
    };
    const end = () => {
      if (
        expandingTouch &&
        !fullyExpanded.current &&
        sheet.current!.getBoundingClientRect().height > window.innerHeight * 0.56
      )
        expand();
      expandingTouch = false;
    };
    element.addEventListener('wheel', wheel, { passive: false });
    element.addEventListener('touchstart', start, { passive: true });
    element.addEventListener('touchmove', move, { passive: false });
    element.addEventListener('touchend', end);
    element.addEventListener('touchcancel', end);
    return () => {
      element.removeEventListener('wheel', wheel);
      element.removeEventListener('touchstart', start);
      element.removeEventListener('touchmove', move);
      element.removeEventListener('touchend', end);
      element.removeEventListener('touchcancel', end);
    };
  }, []);
  const suppressClick = useRef(false);
  const startDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = {
      y: event.clientY,
      height: sheet.current!.getBoundingClientRect().height,
      moved: false,
    };
  };
  const drag = (event: PointerEvent<HTMLButtonElement>) => {
    const current = gesture.current;
    if (!current) return;
    const delta = current.y - event.clientY;
    if (Math.abs(delta) > 6) current.moved = true;
    if (current.moved)
      setDragHeight(Math.max(48, Math.min((window.innerHeight * 5) / 6, current.height + delta)));
  };
  const finishDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const current = gesture.current;
    if (!current) return;
    const delta = current.y - event.clientY;
    gesture.current = null;
    if (current.moved && delta < -60) {
      suppressClick.current = true;
      onClose();
      return;
    }
    setDragHeight(null);
    if (!current.moved) return;
    if (delta > 40) expand();
    suppressClick.current = true;
  };
  const icons = [a.imgOutcomeSvg1, a.imgOutcomeSvg2, a.imgFrame, a.imgOutcomeSvg4];
  return (
    <article
      ref={sheet}
      className={`m-product-sheet ${expanded ? 'is-expanded' : 'is-peek'} ${dragHeight !== null ? 'is-dragging' : ''}`}
      style={
        dragHeight === null ? undefined : ({ '--sheet-height': `${dragHeight}px` } as CSSProperties)
      }
    >
      <button
        className={`m-sheet-grip ${contentAtTop ? 'has-photo-drag-zone' : ''}`}
        aria-label={expanded ? 'Закрити матеріал' : 'Розгорнути матеріал'}
        aria-expanded={expanded}
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={finishDrag}
        onPointerCancel={() => {
          gesture.current = null;
          setDragHeight(null);
        }}
        onClick={(event) => {
          if (suppressClick.current) {
            suppressClick.current = false;
            return;
          }
          // The photo extension accepts swipes, not taps. Keep keyboard activation on the grip.
          if (
            event.detail > 0 &&
            event.clientY > event.currentTarget.getBoundingClientRect().bottom
          )
            return;
          if (expanded) onClose();
          else expand();
        }}
      >
        <span className="m-sheet-handle" />
      </button>
      <div
        ref={content}
        className="m-product-scroll"
        onScroll={(event) => setContentAtTop(event.currentTarget.scrollTop <= 0)}
        onKeyDown={(event) => {
          if (!expanded && ['ArrowDown', 'PageDown', ' '].includes(event.key)) {
            event.preventDefault();
            expand();
          }
        }}
        tabIndex={0}
        aria-label="Вміст матеріалу"
      >
        <img className="m-product-photo" src={product.image} alt={product.name} />
        <p className="m-product-eyebrow">
          {product.kind === 'recipe'
            ? 'ТЕХКАРТА • PDF'
            : product.kind === 'lesson'
              ? 'ОНЛАЙН • ОКРЕМИЙ УРОК'
              : 'ОНЛАЙН-КУРС • ПОВНА ПРОГРАМА'}
        </p>
        <h2>{product.name}</h2>
        <p className="m-product-intro">{product.description}</p>
        <section className="m-product-audience">
          <img src={a.imgIconUser} alt="" />
          <div>
            <h3>ДЛЯ КОГО ЦЕЙ МАТЕРІАЛ</h3>
            <p>{product.audience}</p>
          </div>
        </section>
        <section className="m-product-program">
          <h3>ЩО БУДЕ У ПРОГРАМІ</h3>
          <ol>
            {product.program.map((text, i) => (
              <li key={i}>
                <span>{i + 1}</span>
                {text}
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h3>ПІСЛЯ НАВЧАННЯ ВИ ЗМОЖЕТЕ</h3>
          <ul className="m-product-outcomes">
            {product.outcomes.map((text, i) => (
              <li key={text}>
                <img src={icons[i % icons.length]} alt="" />
                {text}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>ФОРМАТ НАВЧАННЯ</h3>
          <div className="m-product-format">
            {[
              product.kind === 'recipe' ? 'PDF-рецептура' : 'Онлайн у власному темпі',
              product.kind === 'recipe'
                ? 'Точні пропорції та технологія'
                : `${product.lessons} відеоуроків`,
              'Доступ одразу після оплати',
            ].map((text, i) => (
              <p key={text}>
                <img src={[a.imgFrame1, a.imgFrame2, a.imgFrame3][i]} alt="" />
                {text}
              </p>
            ))}
          </div>
        </section>
      </div>
      <footer className="m-product-buy" inert={!expanded}>
        <div className="m-buy-summary">
          <span>
            Ціна за{' '}
            {product.kind === 'course' ? 'курс' : product.kind === 'recipe' ? 'техкарту' : 'урок'}
          </span>
          <strong>{product.price === null ? 'Уточнюється' : formatPrice(product.price)}</strong>
        </div>
        <button onClick={() => onPurchase(product)} className="m-primary">
          Додати{' '}
          {product.kind === 'course' ? 'курс' : product.kind === 'recipe' ? 'техкарту' : 'урок'} до
          кошика
        </button>
      </footer>
    </article>
  );
}
