import type { ReactNode } from 'react';
export function Section({
  id,
  height,
  children,
  className = '',
}: {
  id: string;
  height: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section m-section ${className}`} style={{ height }}>
      {children}
    </section>
  );
}
