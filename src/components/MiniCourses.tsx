import { useState } from 'react';
import { lessons, type Product } from '../data/catalog';
import { designAssets } from '../design/assets';
import MiniCoursesDesign from '../design/MiniCoursesDesign';
import { Carousel, CarouselProgress } from './Carousel';
import { SmallCard } from './SmallCard';
export function MiniCourses({ onOpen }: { onOpen: (product: Product) => void }) {
  const [index, setIndex] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  return (
    <section id="lessons" className="section mini-courses">
      <MiniCoursesDesign
        overrides={{
          '2351:2262': { as: 'h2' },
          '2351:2199': {
            children: (
              <Carousel
                peek
                continuous
                pageStep={1256}
                scrubbing={scrubbing}
                index={index}
                arrow={designAssets.MiniCoursesDesign.imgArrowCircleLeft}
                onIndexChange={(next) => {
                  setScrubbing(false);
                  setIndex(next);
                }}
              >
                {lessons.map((product) => (
                  <SmallCard key={product.id} product={product} onOpen={() => onOpen(product)} />
                ))}
              </Carousel>
            ),
            style: { overflow: 'visible', top: 305 },
          },
          '2351:2264': { style: { display: 'none' } },
          '2351:2268': { style: { display: 'none' } },
          '2351:2272': {
            children: (
              <CarouselProgress
                continuous
                scrubbing={scrubbing}
                onScrubbingChange={setScrubbing}
                index={index}
                count={Math.ceil(lessons.length / 4)}
                onChange={setIndex}
                dark
              />
            ),
            style: { overflow: 'visible' },
          },
        }}
      />
    </section>
  );
}
