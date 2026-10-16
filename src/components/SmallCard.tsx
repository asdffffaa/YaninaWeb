import type { Product } from '../data/catalog';
import { designAssets as assets } from '../design/assets';
export function SmallCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const recipe = product.kind === 'recipe',
    a = recipe ? assets.TechCardsDesign : assets.MiniCoursesDesign;
  return (
    <button
      type="button"
      className={
        'small-card ' +
        (recipe ? 'recipe-card' : 'lesson-card') +
        (product.popular ? ' popular' : '')
      }
      data-product={product.id}
      onClick={onOpen}
    >
      <div className={'small-cover ' + (product.crop === 'leveling' ? 'leveling-cover' : '')}>
        <img loading="lazy" decoding="async" src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p className="small-description">{product.description}</p>
      <div className="small-meta">
        {product.popular && (
          <p>
            <img loading="lazy" decoding="async" src={assets.TechCardsDesign.imgStar} alt="" />
            НАЙПОПУЛЯРНІШИЙ ВИБІР
          </p>
        )}
        <p>
          <img loading="lazy" decoding="async" src={a.imgPlayCircle} alt="" />
          {recipe ? 'PDF' : 'ОНЛАЙН'} • ДОСТУП ОДРАЗУ
        </p>
      </div>
      <span className="small-details">
        <span>{recipe ? 'ДЕТАЛІ ТЕХКАРТИ' : 'ДЕТАЛІ УРОКУ'}</span>
        <span className="small-arrow">
          <img loading="lazy" decoding="async" src={a.imgButtonArrowCircle} alt="" />
          <img loading="lazy" decoding="async" src={a.imgArrowRight} alt="" />
        </span>
      </span>
    </button>
  );
}
