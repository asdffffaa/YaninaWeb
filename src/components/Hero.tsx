import HeroDesign from '../design/HeroDesign';
export function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section id="home" className="hero">
      <HeroDesign
        overrides={{
          '2351:2447': { as: 'h1' },
          '2351:2450': { as: 'button', type: 'button', onClick: () => onNavigate('courses') },
          '2351:2452': { as: 'button', type: 'button', onClick: () => onNavigate('recipes') },
        }}
      />
    </section>
  );
}
