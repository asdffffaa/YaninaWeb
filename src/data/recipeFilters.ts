export const recipeFilters = [
  'Усі',
  'Шоколадні',
  'Ягідні',
  'Карамельні',
  'Горіхові',
  "М'ятні",
  'Цитрусові',
  'Інше',
];

export function matchesRecipeFilter(category: string[] | undefined, filter: string) {
  if (filter === 'Усі') return true;
  if (filter === 'Інше')
    return (
      category?.includes('Інше') ||
      !category?.some((value) => recipeFilters.slice(1, -1).includes(value))
    );
  return category?.includes(filter) ?? false;
}
