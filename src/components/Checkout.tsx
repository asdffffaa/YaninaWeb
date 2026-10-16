import { itemCountLabel } from '../lib/cart';
import { useState, type FormEvent } from 'react';
import { formatPrice, type Product } from '../data/catalog';
import { designAssets } from '../design/assets';
import CheckoutDesign from '../design/CheckoutDesign';
import { ProductRow } from './ProductRow';
import type { CheckoutDraft } from './CheckoutPage';
export function Checkout({
  items,
  total,
  onCart,
  draft,
}: {
  items: Product[];
  total: number;
  onCart: () => void;
  draft: CheckoutDraft;
}) {
  const { email, setEmail, method, setMethod, consent, setConsent } = draft;
  const [notice, setNotice] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setNotice(
      'Онлайн-оплату ще не підключено. Щоб оформити замовлення, напишіть Яніні в Telegram.',
    );
  };
  const summaryHeight = items.length < 3 ? 593 : 776 + (items.length - 3) * 156;
  const pageHeight = Math.max(1080, 326 + summaryHeight + 32);
  return (
    <main className="checkout-page" style={{ height: pageHeight - 86 }}>
      <CheckoutDesign
        overrides={{
          '2351:1890': { style: { height: pageHeight } },
          '2361:4840': { style: { display: 'none' } },
          '2351:1896': { as: 'h1' },
          '2351:1905': { as: 'button', type: 'button', onClick: onCart },
          '2351:1922': {
            as: 'form',
            onSubmit: submit,
            style: { overflow: 'visible', height: 593 },
          },
          '2351:1926': { children: null, style: { display: 'none' } },
          '2351:1930': { as: 'label', htmlFor: 'customer-email', style: { width: '100%' } },
          '2351:1932': {
            as: 'input',
            id: 'customer-email',
            name: 'email',
            type: 'email',
            autoComplete: 'email',
            value: email,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
            required: true,
            placeholder: 'example@gmail.com',
            children: undefined,
            className: 'checkout-input',
          },
          '2351:1933': { children: null, style: { display: 'none' } },
          '2351:1949': {
            as: 'button',
            type: 'button',
            onClick: () => setMethod('card'),
            'aria-pressed': method === 'card',
            style: { borderColor: method === 'card' ? '#9e3046' : '#ddd2c7' },
          },
          '2351:1960': {
            as: 'button',
            type: 'button',
            onClick: () => setMethod('apple'),
            'aria-pressed': method === 'apple',
            style: { borderColor: method === 'apple' ? '#9e3046' : '#ddd2c7' },
          },
          '2351:1968': {
            as: 'button',
            type: 'button',
            onClick: () => setMethod('google'),
            'aria-pressed': method === 'google',
            style: { borderColor: method === 'google' ? '#9e3046' : '#ddd2c7' },
          },
          '2351:1952': {
            children: <span className={'payment-radio ' + (method === 'card' ? 'checked' : '')} />,
          },
          '2351:1962': {
            children: <span className={'payment-radio ' + (method === 'apple' ? 'checked' : '')} />,
          },
          '2351:1970': {
            children: (
              <span className={'payment-radio ' + (method === 'google' ? 'checked' : '')} />
            ),
          },
          '2351:1980': {
            as: 'label',
            children: (
              <>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />
                <span>Я погоджуюсь з умовами придбання та політикою конфіденційності</span>
              </>
            ),
            className: 'checkout-consent',
          },
          '2351:1983': { as: 'button', type: 'submit', disabled: !items.length || !consent },
          '2351:1984': { children: 'Оплатити ' + formatPrice(total) },
          '2351:1921': { style: { overflow: 'visible', height: 'auto' } },
          '2351:1920': { style: { overflow: 'visible', height: Math.max(679, summaryHeight) } },
          '2351:2010': {
            style: { height: summaryHeight },
            children: <CheckoutSummary items={items} total={total} />,
          },
        }}
      />
      {notice && (
        <p className="checkout-notice" role="status">
          {notice}{' '}
          <a href="https://t.me/yaninakorinenko" target="_blank" rel="noreferrer">
            Написати →
          </a>
        </p>
      )}
    </main>
  );
}
function CheckoutSummary({ items, total }: { items: Product[]; total: number }) {
  return (
    <div
      className={
        'checkout-summary' +
        (items.length >= 3 ? ' checkout-summary-long' : ' checkout-summary-short')
      }
    >
      <div className="cart-heading">
        <img src={designAssets.CheckoutDesign.imgStepIcon} alt="" />
        <h2>Ваше замовлення</h2>
        <span>{itemCountLabel(items.length)}</span>
      </div>
      <div className="checkout-rows">
        {items.map((p) => (
          <ProductRow key={p.id} product={p} />
        ))}
      </div>
      <div className="cart-total">
        <span>До оплати</span>
        <strong>{formatPrice(total)}</strong>
      </div>
      <div className="checkout-delivery">
        <img src={designAssets.CheckoutDesign.imgVector3} alt="" />
        <p>
          Після оплати ви отримаєте лист
          <br />з доступом до всіх матеріалів на e-mail
        </p>
      </div>
    </div>
  );
}
