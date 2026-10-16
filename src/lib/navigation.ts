/** Number of leading links that fit, reserving room for the overflow button. */
export function visibleNavigationCount(
  widths: number[],
  available: number,
  gap: number,
  more: number,
) {
  const total =
    widths.reduce((sum, width) => sum + width, 0) + Math.max(0, widths.length - 1) * gap;
  if (total <= available) return widths.length;
  let used = more;
  let count = 0;
  for (const width of widths) {
    if (used + gap + width > available) break;
    used += gap + width;
    count++;
  }
  return count;
}

export function sectionHighlight(
  top: number,
  bottom: number,
  edge: number,
  viewportHeight: number,
  reduced: boolean,
) {
  const bandBottom = edge + Math.min(200, Math.max(80, (viewportHeight - edge) * 0.25));
  const height = Math.max(1, bandBottom - edge);
  const current = top <= edge + height / 2 && bottom > edge + height / 2;
  const visible = Math.max(0, Math.min(bottom, bandBottom) - Math.max(top, edge));
  const fraction = Math.min(1, visible / Math.max(1, Math.min(bottom - top, height)));
  if (reduced) return { start: 0, end: current ? 100 : 0, current };
  return top < edge
    ? { start: (1 - fraction) * 100, end: 100, current }
    : { start: 0, end: fraction * 100, current };
}
