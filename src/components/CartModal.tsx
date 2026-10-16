import { itemCountLabel } from '../lib/cart';
import { useRef, useState } from 'react';
import { type Product, formatPrice } from '../data/catalog';
import { designAssets } from '../design/assets';
import { ProductRow } from './ProductRow';
const a = designAssets.CartDesign;
export function CartModal({
  items,
  total,
  onRemove,
  onClose,
  onCheckout,
}: {
  items: Product[];
  total: number;
  onRemove: (id: string) => void;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const startY = useRef<number | null>(null);
  const dragged = useRef(false);
  const [offset, setOffset] = useState(0);
  return (
    <>
      <button className="cart-close" aria-label="Закрити кошик" onClick={onClose}>
        <img src={a.imgCloseCircle} alt="" />
      </button>
      <div className="cart-panel" style={{ transform: `translateY(${offset}px)` }}>
        <button
          className="cart-grip"
          aria-label="Закрити кошик"
          onClick={() => {
            if (!dragged.current) onClose();
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            startY.current = event.clientY;
            dragged.current = false;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (startY.current !== null) {
              const delta = event.clientY - startY.current;
              if (Math.abs(delta) > 6) dragged.current = true;
              setOffset(Math.max(0, delta));
            }
          }}
          onPointerUp={() => {
            startY.current = null;
            if (offset > 60) onClose();
            else setOffset(0);
          }}
          onPointerCancel={() => {
            startY.current = null;
            setOffset(0);
          }}
        >
          <span />
        </button>
        <div className="cart-heading">
          <img src={a.imgStepIcon} alt="" />
          <h2>Ваш кошик</h2>
          <span>{itemCountLabel(items.length)}</span>
        </div>
        <div className="cart-rows">
          {items.length ? (
            items.map((p) => <ProductRow key={p.id} product={p} onRemove={onRemove} />)
          ) : (
            <p className="empty-cart">Кошик порожній</p>
          )}
        </div>
        <div className="cart-total">
          <span>До оплати</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <button
          className="cart-checkout"
          data-name="Delivery note"
          disabled={!items.length}
          onClick={onCheckout}
        >
          Перейти до оплати
        </button>
      </div>
    </>
  );
}
