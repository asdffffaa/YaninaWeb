import { type Product, formatPrice } from '../data/catalog';
import { designAssets } from '../design/assets';
const icons = designAssets.CourseDetailDesign;
const outcomeIcons = [
  icons.imgOutcomeSvg1,
  icons.imgOutcomeSvg2,
  icons.imgOutcomeSvg3,
  icons.imgOutcomeSvg4,
];
export function CourseDetail({
  product,
  onClose,
  onPurchase,
  onReturn,
  page = false,
}: {
  product: Product;
  onClose: () => void;
  onPurchase: (p: Product) => void;
  onReturn: () => void;
  page?: boolean;
}) {
  const Heading = page ? 'h1' : 'h2',
    type =
      product.kind === 'recipe'
        ? 'ТЕХКАРТА • PDF'
        : product.kind === 'lesson'
          ? 'ОНЛАЙН • ОКРЕМИЙ УРОК'
          : 'ОНЛАЙН-КУРС • ПОВНА ПРОГРАМА';
  return (
    <article className="product-modal">
      <button className="product-modal-close" onClick={onClose} aria-label="Закрити">
        <img src={designAssets.CourseDetailDesign.imgIconClose} alt="" />
      </button>
      <div className="product-modal-body">
        <div className="product-modal-copy">
          <p className="product-eyebrow">{type}</p>
          <Heading id="course-title">{product.name}</Heading>
          <p className="product-intro">{product.description}</p>
          <section className="product-audience">
            <span className="product-audience-icon">
              <img src={icons.imgIconUser} alt="" />
            </span>
            <h3>ДЛЯ КОГО ЦЕЙ {product.kind === 'recipe' ? 'МАТЕРІАЛ' : 'КУРС'}</h3>
            <p>{product.audience}</p>
          </section>
          <section>
            <h3>ЩО БУДЕ У ПРОГРАМІ</h3>
            <ol className="product-program">
              {product.program.map((text, i) => (
                <li key={i}>
                  <span>{i + 1}</span>
                  {text}
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h3>ПІСЛЯ НАВЧАННЯ ВИ ЗМОЖЕТЕ</h3>
            <ul className="product-outcomes">
              {product.outcomes.map((text, i) => (
                <li key={text}>
                  <span className="product-outcome-icon">
                    <img src={outcomeIcons[i % outcomeIcons.length]} alt="" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="product-modal-aside">
          <img className="product-modal-photo" src={product.image} alt={product.name} />
          <div className="product-format">
            <h3>ФОРМАТ НАВЧАННЯ</h3>
            <p>
              <span className="product-format-icon">
                <img src={icons.imgFrame} alt="" />
              </span>
              {product.kind === 'recipe' ? 'PDF-рецептура' : 'Онлайн у власному темпі'}
            </p>
            <p>
              <span className="product-format-icon">
                <img src={icons.imgFrame1} alt="" />
              </span>
              {product.kind === 'recipe'
                ? 'Точні пропорції та технологія'
                : `${product.lessons} ${product.lessons === 1 ? 'відеоурок' : 'відеоуроків'}`}
            </p>
            <p>
              <span className="product-format-icon">
                <img src={icons.imgFrame2} alt="" />
              </span>
              Доступ одразу після оплати
            </p>
          </div>
        </aside>
      </div>
      <footer className="product-modal-footer">
        <span className="product-modal-price">
          {product.price !== null ? formatPrice(product.price) : 'Ціна уточнюється'}
        </span>
        <div className="product-footer-badges">
          <span>
            <img src={icons.imgFrame3} alt="" />
            {product.kind === 'recipe' ? 'PDF' : 'ОНЛАЙН'}
          </span>
          <span>
            <img src={icons.imgFrame4} alt="" />
            {product.kind === 'recipe' ? 'РЕЦЕПТУРА' : `${product.lessons} ВІДЕОУРОКІВ`}
          </span>
          <span>
            <img src={icons.imgFrame5} alt="" />
            ДОСТУП ОДРАЗУ
          </span>
        </div>
        <button className="product-return" onClick={onReturn}>
          Повернутися до каталогу
        </button>
        <button className="product-purchase" onClick={() => onPurchase(product)}>
          Додати в кошик
        </button>
      </footer>
    </article>
  );
}
