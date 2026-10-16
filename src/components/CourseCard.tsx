import type { Product } from '../data/catalog';
import { designAssets as assets } from '../design/assets';
export function CourseCard({ course, onOpen }: { course: Product; onOpen: () => void }) {
  return (
    <article className="course-card" data-product={course.id} onClick={onOpen}>
      <div className={'course-cover ' + (course.crop === 'modern' ? 'modern-cover' : '')}>
        <img loading="lazy" decoding="async" src={course.image} alt={course.name} />
        <span className="start-badge">СТАРТ&nbsp; 15.09.2026</span>
      </div>
      <div className="course-copy">
        <p className="course-level">{course.level}</p>
        <h3>{course.name}</h3>
        <p className="course-description">{course.description}</p>
        <div className="course-meta">
          <p>
            <img loading="lazy" decoding="async" src={assets.CoursesDesign.imgStar} alt="" />
            НАЙПОПУЛЯРНІШИЙ ВИБІР
          </p>
          <p>
            <img loading="lazy" decoding="async" src={assets.CoursesDesign.imgPlayCircle} alt="" />
            ОНЛАЙН · ДОСТУП ОДРАЗУ
          </p>
        </div>
        <button
          className="course-details"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          ДЕТАЛІ КУРСУ
        </button>
      </div>
    </article>
  );
}
