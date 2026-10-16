/** Restore only known, unique products. Malformed storage keeps the existing default cart. */
export function restoreCart<T extends { id: string }>(
  serialized: string | null,
  catalog: ReadonlyMap<string, T>,
  fallback: T[],
): T[] {
  try {
    const ids: unknown = JSON.parse(serialized ?? 'null');
    if (!Array.isArray(ids)) return fallback;
    return [...new Set(ids)].flatMap((id) => {
      const product = typeof id === 'string' ? catalog.get(id) : undefined;
      return product ? [product] : [];
    });
  } catch {
    return fallback;
  }
}

export function itemCountLabel(count: number): string {
  const hundred = count % 100;
  const ten = count % 10;
  const noun =
    hundred >= 11 && hundred <= 14
      ? 'товарів'
      : ten === 1
        ? 'товар'
        : ten >= 2 && ten <= 4
          ? 'товари'
          : 'товарів';
  return `${count} ${noun}`;
}
