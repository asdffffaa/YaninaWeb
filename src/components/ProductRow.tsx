import { type Product, formatPrice } from '../data/catalog';
import { designAssets } from '../design/assets';
const a = designAssets.CartDesign;
export function ProductRow({
  product,
  onRemove,
}: {
  product: Product;
  onRemove?: (id: string) => void;
}) {
  const summary =
    product.id === 'suchasni-smaky'
      ? product.description
      : product.kind === 'course'
        ? `Онлайн-курс · ${product.lessons} уроків`
        : product.kind === 'recipe'
          ? 'PDF файл'
          : 'Відеоурок';
  return (
    <article className="product-row" data-cart-product={product.id}>
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{summary}</p>
        <p>{product.kind === 'recipe' ? 'Надсилається після оплати' : 'Доступ назавжди'}</p>
      </div>
      <p className="product-price">
        {product.price === null ? 'Уточнюється' : formatPrice(product.price)}
      </p>
      {onRemove && (
        <button
          className="remove-product"
          aria-label={`Видалити ${product.name}`}
          onClick={() => onRemove(product.id)}
        >
          <img src={a.imgVuesaxLinearCloseCircle} alt="" />
        </button>
      )}
    </article>
  );
}
