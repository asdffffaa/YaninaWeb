import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
export function MobileRail({
  children,
  step = 316,
  label = 'Матеріали',
  initial = 0,
  dots = false,
  loop = false,
}: {
  children: ReactNode;
  step?: number;
  label?: string;
  initial?: number;
  dots?: boolean;
  loop?: boolean;
}) {
  const count = Children.count(children);
  const cyclic = loop && count > 1;
  const cycle = count * step;
  const rail = useRef<HTMLDivElement>(null),
    [position, setPosition] = useState(initial * step);
  const frame = useRef(0);
  const settleTimer = useRef(0);
  const dragging = useRef(false);
  const normalize = useCallback(() => {
    const element = rail.current;
    if (!element || !cyclic || dragging.current) return;
    const left = element.scrollLeft;
    if (left >= cycle && left < cycle * 2) return;
    // Rebase only after momentum or smooth scrolling has finished.
    element.scrollTo({ left: cycle + (((left % cycle) + cycle) % cycle), behavior: 'instant' });
  }, [cyclic, cycle]);
  useLayoutEffect(() => {
    if (rail.current) rail.current.scrollLeft = (cyclic ? cycle : 0) + initial * step;
    setPosition(initial * step);
    const element = rail.current;
    element?.addEventListener('scrollend', normalize);
    return () => {
      cancelAnimationFrame(frame.current);
      window.clearTimeout(settleTimer.current);
      element?.removeEventListener('scrollend', normalize);
    };
  }, [initial, step, cyclic, cycle, normalize]);
  const onScroll = useCallback(() => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(normalize, 180);
    if (!frame.current)
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const element = rail.current;
        if (!element) return;
        const left = element.scrollLeft;
        setPosition(cyclic ? ((left % cycle) + cycle) % cycle : left);
      });
  }, [cyclic, cycle, normalize]);
  const max = Math.max(0, (count - 1) * step);
  const move = (value: number) => {
    rail.current?.scrollTo({
      left: cyclic
        ? value + Math.round(((rail.current?.scrollLeft ?? cycle) - value) / cycle) * cycle
        : value,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };
  return (
    <div
      className="m-rail"
      style={{ '--rail-step': `${step}px` } as CSSProperties}
      aria-label={label}
      aria-roledescription="карусель"
    >
      <div
        className="m-rail-viewport"
        ref={rail}
        onScroll={onScroll}
        onPointerDown={() => {
          dragging.current = true;
        }}
        onPointerUp={() => {
          dragging.current = false;
          settleTimer.current = window.setTimeout(normalize, 180);
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        {cyclic &&
          Children.map(children, (child) =>
            isValidElement(child)
              ? cloneElement(child, { 'aria-hidden': true } as Record<string, unknown>)
              : child,
          )}
        {children}
        {cyclic &&
          Children.map(children, (child) =>
            isValidElement(child)
              ? cloneElement(child, { 'aria-hidden': true } as Record<string, unknown>)
              : child,
          )}
        <span className="m-rail-end" aria-hidden="true" />
      </div>
      {dots ? (
        <div className="m-dots">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              aria-label={`${label} ${i + 1}`}
              aria-current={Math.round(position / step) % count === i ? 'true' : undefined}
              onClick={() => move(i * step)}
            />
          ))}
        </div>
      ) : (
        <div className="m-rail-controls">
          <input
            aria-label={`Прокрутити: ${label}`}
            type="range"
            min={0}
            max={max}
            step={1}
            value={Math.min(max, position)}
            onChange={(e) => {
              if (rail.current) rail.current.scrollLeft = Number(e.target.value);
            }}
            style={
              {
                '--rail-progress': `${max ? (position / max) * 100 : 100}%`,
              } as CSSProperties
            }
          />
          <span>
            {String(Math.min(count, Math.round(position / step) + 1)).padStart(2, '0')} /{' '}
            {String(count).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}
