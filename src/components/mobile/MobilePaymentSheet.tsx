import { useEffect, useRef, useState, type ReactNode } from 'react';

export function MobilePaymentSheet({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [offset, setOffset] = useState(0);
  const content = useRef<HTMLDivElement>(null);
  const start = useRef<number | null>(null);
  const dragged = useRef(false);
  useEffect(() => {
    const element = content.current!;
    let y = 0;
    const wheel = (event: WheelEvent) => {
      if (!expanded) {
        event.preventDefault();
        if (event.deltaY > 0) setExpanded(true);
      }
    };
    const touchStart = (event: TouchEvent) => {
      y = event.touches[0].clientY;
    };
    const touchMove = (event: TouchEvent) => {
      const delta = y - event.touches[0].clientY;
      if (!expanded) {
        event.preventDefault();
        if (delta > 8) setExpanded(true);
      } else if (
        (delta < 0 && element.scrollTop <= 0) ||
        (delta > 0 && element.scrollTop + element.clientHeight >= element.scrollHeight - 1)
      )
        event.preventDefault();
      y = event.touches[0].clientY;
    };
    element.addEventListener('wheel', wheel, { passive: false });
    element.addEventListener('touchstart', touchStart, { passive: true });
    element.addEventListener('touchmove', touchMove, { passive: false });
    return () => {
      element.removeEventListener('wheel', wheel);
      element.removeEventListener('touchstart', touchStart);
      element.removeEventListener('touchmove', touchMove);
    };
  }, [expanded]);
  return (
    <article
      className={`m-product-sheet m-payment-sheet ${expanded ? 'is-expanded' : 'is-peek'}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      <button
        className="m-sheet-grip"
        aria-label={expanded ? 'Закрити умови оплати' : 'Розгорнути умови оплати'}
        aria-expanded={expanded}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          start.current = event.clientY;
          dragged.current = false;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (start.current !== null) {
            const delta = event.clientY - start.current;
            if (Math.abs(delta) > 6) dragged.current = true;
            setOffset(Math.max(0, delta));
          }
        }}
        onPointerUp={(event) => {
          if (start.current === null) return;
          const delta = event.clientY - start.current;
          start.current = null;
          if (delta > 60) onClose();
          else {
            setOffset(0);
            if (delta < -30) setExpanded(true);
          }
        }}
        onPointerCancel={() => {
          start.current = null;
          setOffset(0);
        }}
        onClick={() => {
          if (!dragged.current) {
            if (expanded) onClose();
            else setExpanded(true);
          }
        }}
      >
        <span className="m-sheet-handle" />
      </button>
      <div
        className="m-product-scroll m-payment-copy"
        ref={content}
        tabIndex={0}
        aria-label="Умови оплати"
        onKeyDown={(event) => {
          if (!expanded && ['ArrowDown', 'PageDown', ' '].includes(event.key)) {
            event.preventDefault();
            setExpanded(true);
          }
        }}
      >
        {children}
      </div>
      <div className="m-payment-bottom">
        <button className="m-primary" onClick={onClose}>
          Зрозуміло
        </button>
      </div>
    </article>
  );
}
