import { Children, useRef, useState, type PointerEvent, type ReactNode } from 'react';
export function Carousel({
  children,
  index,
  onIndexChange,
  pageSize = 4,
  arrow,
  label = 'картки',
  className = '',
  peek = false,
  continuous = false,
  scrubbing = false,
  pageStep,
}: {
  children: ReactNode;
  index: number;
  onIndexChange: (index: number) => void;
  pageSize?: number;
  arrow: string;
  label?: string;
  className?: string;
  peek?: boolean;
  continuous?: boolean;
  scrubbing?: boolean;
  pageStep?: number;
}) {
  const items = Children.toArray(children),
    count = Math.ceil(items.length / pageSize),
    step = pageStep ?? (peek ? 1240 : 1346);
  const [drag, setDrag] = useState(0),
    [dragging, setDragging] = useState(false);
  const gesture = useRef<{
      x: number;
      scale: number;
      pointer: number;
      moved: boolean;
    } | null>(null),
    suppressClick = useRef(false);
  const move = (next: number) => onIndexChange(Math.max(0, Math.min(count - 1, next)));
  const start = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    gesture.current = {
      x: e.clientX,
      scale: e.currentTarget.getBoundingClientRect().width / e.currentTarget.offsetWidth,
      pointer: e.pointerId,
      moved: false,
    };
    suppressClick.current = false;
  };
  const update = (e: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g) return;
    const distance = (e.clientX - g.x) / g.scale;
    if (Math.abs(distance) > 6 && !g.moved) {
      g.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    if (g.moved) {
      const bounded =
        (index === 0 && distance > 0) || (index === count - 1 && distance < 0)
          ? distance * 0.2
          : distance;
      setDrag(bounded);
    }
  };
  const finish = (e: PointerEvent<HTMLDivElement>, cancel = false) => {
    const g = gesture.current;
    if (!g) return;
    gesture.current = null;
    suppressClick.current = g.moved;
    if (g.moved && !cancel) {
      if (continuous) move(index - drag / step);
      else if (Math.abs(drag) > 70) move(index + (drag < 0 ? 1 : -1));
    }
    setDrag(0);
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(g.pointer))
      e.currentTarget.releasePointerCapture(g.pointer);
  };
  return (
    <div
      className={'carousel ' + className + (peek ? ' carousel-peek' : '')}
      aria-roledescription="карусель"
    >
      <button
        className="carousel-arrow prev"
        aria-label={'Попередні ' + label}
        disabled={index === 0}
        onClick={() => move(continuous ? Math.ceil(index - 0.000001) - 1 : index - 1)}
      >
        <img src={arrow} alt="" />
      </button>
      <div
        className={'carousel-viewport ' + (dragging ? 'dragging' : '')}
        onPointerDown={start}
        onPointerMove={update}
        onPointerUp={(e) => finish(e)}
        onPointerCancel={(e) => finish(e, true)}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        <div
          className="carousel-track"
          style={{
            ...(peek
              ? { left: -index * step + drag }
              : { transform: `translate3d(${-index * step + drag}px,0,0)` }),
            transition: dragging || scrubbing ? 'none' : undefined,
          }}
          data-slide-index={index}
        >
          {Array.from({ length: count }, (_, i) => (
            <div
              className="carousel-page"
              key={i}
              inert={
                (i < Math.floor(index) || i > Math.ceil(index)) && !dragging ? true : undefined
              }
              aria-hidden={(i < Math.floor(index) || i > Math.ceil(index)) && !dragging}
            >
              {items.slice(i * pageSize, (i + 1) * pageSize)}
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel-arrow next"
        aria-label={'Наступні ' + label}
        disabled={index === count - 1}
        onClick={() => move(continuous ? Math.floor(index + 0.000001) + 1 : index + 1)}
      >
        <img src={arrow} alt="" />
      </button>
    </div>
  );
}
export function CarouselProgress({
  index,
  count,
  dark = false,
  onChange,
  continuous = false,
  scrubbing = false,
  onScrubbingChange,
}: {
  index: number;
  count: number;
  dark?: boolean;
  onChange: (index: number) => void;
  continuous?: boolean;
  scrubbing?: boolean;
  onScrubbingChange?: (active: boolean) => void;
}) {
  return (
    <div className={'carousel-progress ' + (dark ? 'dark' : '')}>
      <div className="progress-track">
        <span
          style={{
            transition: scrubbing ? 'none' : undefined,
            width: `${100 / count}%`,
            left: `${(index / count) * 100}%`,
          }}
        />
        <input
          type="range"
          min="0"
          max={Math.max(0, count - 1)}
          step={continuous ? 0.001 : 1}
          value={index}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            onScrubbingChange?.(true);
          }}
          onPointerUp={() => onScrubbingChange?.(false)}
          onPointerCancel={() => onScrubbingChange?.(false)}
          onLostPointerCapture={() => onScrubbingChange?.(false)}
          onBlur={() => onScrubbingChange?.(false)}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Прокрутити каталог"
          aria-valuetext={
            continuous
              ? `${Math.round((index / Math.max(1, count - 1)) * 100)}%`
              : `Сторінка ${index + 1} з ${count}`
          }
          disabled={count < 2}
        />
      </div>
      <span className="progress-counter">
        {String(Math.round(index) + 1).padStart(2, '0')}{' '}
        <span>/ {String(count).padStart(2, '0')}</span>
      </span>
    </div>
  );
}
