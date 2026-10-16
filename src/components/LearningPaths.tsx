import LearningPathsDesign from '../design/LearningPathsDesign';
import type { DesignOverrides } from '../design/bindDesign';
export function LearningPaths({ onNavigate }: { onNavigate: (id: string) => void }) {
  const cards = [
    ['2351:2474', 'courses'],
    ['2351:2479', 'lessons'],
    ['2351:2484', 'recipes'],
    ['2351:2489', 'consultation'],
  ];
  const overrides: DesignOverrides = { '2351:2471': { as: 'h2' } };
  cards.forEach(([id, target]) => {
    overrides[id] = {
      as: 'a',
      href: '#' + target,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        onNavigate(target);
      },
    };
  });
  return (
    <section id="learning-paths" className="section learning-paths">
      <LearningPathsDesign overrides={overrides} />
    </section>
  );
}
