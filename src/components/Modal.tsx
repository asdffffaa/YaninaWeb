import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
export function Modal({
  children,
  onClose,
  label,
  variant = 'course',
  closing = false,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  variant?: 'course' | 'cart';
  closing?: boolean;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useLayoutEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const app = document.getElementById('app-shell');
    app?.setAttribute('inert', '');
    const body = document.body;
    const root = document.documentElement;
    const scrollX = window.scrollX,
      scrollY = window.scrollY;
    const initialHash = window.location.hash;
    const saved = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const rootOverflow = root.style.overflow;
    const rootGutter = root.style.scrollbarGutter;
    const lockedWidth = root.clientWidth;
    root.style.scrollbarGutter = 'stable';
    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: `${lockedWidth}px`,
      overflow: 'hidden',
    });
    root.style.overflow = 'hidden';
    const first = dialog.current?.querySelector<HTMLElement>(
      'button:not(:disabled),a[href],input:not(:disabled)',
    );
    (first ?? dialog.current)?.focus({ preventScroll: true });
    const keyboard = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close.current();
      }
      if (e.key === 'Tab') {
        const nodes = Array.from(
          dialog.current?.querySelectorAll<HTMLElement>(
            'button:not(:disabled),a[href],input:not(:disabled),select,[tabindex="0"]',
          ) ?? [],
        ).filter((n) => n.offsetParent !== null && !n.closest('[inert],[hidden]'));
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (!nodes.includes(document.activeElement as HTMLElement)) {
          e.preventDefault();
          (e.shiftKey ? last : first)?.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', keyboard);
    return () => {
      Object.assign(body.style, saved);
      root.style.overflow = rootOverflow;
      root.style.scrollbarGutter = rootGutter;
      window.scrollTo({
        left: window.location.hash === initialHash ? scrollX : 0,
        top: window.location.hash === initialHash ? scrollY : 0,
        behavior: 'instant',
      });
      app?.removeAttribute('inert');
      document.removeEventListener('keydown', keyboard);
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <div
      className={'modal-overlay ' + variant + (closing ? ' is-closing' : '')}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialog}
        className={'modal-dialog ' + variant}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
