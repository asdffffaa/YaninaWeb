import { useState } from 'react';
import { courses, type Product } from '../data/catalog';
import { designAssets } from '../design/assets';
import CoursesDesign from '../design/CoursesDesign';
import { Carousel, CarouselProgress } from './Carousel';
import { CourseCard } from './CourseCard';
export function Courses({ onOpen }: { onOpen: (product: Product) => void }) {
  const [index, setIndex] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  return (
    <section id="courses" className="section courses">
      <CoursesDesign
        overrides={{
          '2351:2279': { as: 'h2' },
          '2351:2281': {
            children: (
              <Carousel
                peek
                continuous
                scrubbing={scrubbing}
                index={index}
                pageSize={2}
                arrow={designAssets.CoursesDesign.imgArrowCircleLeft}
                onIndexChange={(next) => {
                  setScrubbing(false);
                  setIndex(next);
                }}
              >
                {courses.map((course, cardIndex) => (
                  <CourseCard
                    key={course.id + cardIndex}
                    course={course}
                    onOpen={() => onOpen(course)}
                  />
                ))}
              </Carousel>
            ),
            style: { overflow: 'visible' },
          },
          '2351:2350': { style: { display: 'none' } },
          '2351:2354': { style: { display: 'none' } },
          '2351:2360': {
            children: (
              <CarouselProgress
                continuous
                scrubbing={scrubbing}
                onScrubbingChange={setScrubbing}
                index={index}
                count={Math.ceil(courses.length / 2)}
                onChange={setIndex}
              />
            ),
            style: { overflow: 'visible' },
          },
        }}
      />
    </section>
  );
}
