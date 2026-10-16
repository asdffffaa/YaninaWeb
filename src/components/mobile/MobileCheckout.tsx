import { useState, type FormEvent } from 'react';
import { itemCountLabel } from '../../lib/cart';
import type { CheckoutDraft } from '../CheckoutPage';
import { formatPrice, telegram, type Product } from '../../data/catalog';
import { mobileAssets as a } from '../../design/mobile-assets';
export function MobileCheckout({
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
  const {
    step,
    setStep,
    email,
    setEmail,
    method,
    setMethod,
    consent,
    setConsent,
    digitalConsent,
    setDigitalConsent,
  } = draft;
  const [notice, setNotice] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <main className="m-checkout">
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <filter id="checkout-floral-tint" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 .125 .422 .043 0 .41 .138 .465 .047 0 .35 0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
      <div className="m-checkout-decor">
        <img src={a.MobileCartDesign.imgImage17} alt="" />
        <img src={a.MobileCheckoutDesign.imgImage18} alt="" />
      </div>
      <h1>{step === 1 ? 'Ваші дані' : 'Ваше замовлення'}</h1>
      <p>
        {' '}
        {step === 1
          ? 'Заповніть контактну інформацію'
          : 'Перевірте замовлення та оберіть спосіб оплати'}
      </p>
      <nav className="m-checkout-steps" aria-label="Кроки оформлення">
        <button onClick={onCart}>
          ✓<span>Кошик</span>
        </button>
        <button
          className={step === 2 ? 'is-complete' : undefined}
          aria-label={step === 2 ? 'Дані — завершено' : 'Дані'}
          aria-current={step === 1 ? 'step' : undefined}
          onClick={() => setStep(1)}
        >
          {step === 2 ? '✓' : '2'}
          <span>Дані</span>
        </button>
        <button
          aria-current={step === 2 ? 'step' : undefined}
          disabled={step === 1}
          onClick={() => setStep(2)}
        >
          3<span>Оплата</span>
        </button>
      </nav>
      {step === 1 ? (
        <form className="m-checkout-panel" onSubmit={submit}>
          <h2 className="m-contact-title">
            <img src={a.MobileCartDesign.imgUser} alt="" />
            Контактна інформація
          </h2>
          <label className="m-field">
            E-mail{' '}
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
            />
          </label>
          <p className="m-delivery">
            Після оплати ви отримаєте лист з доступом до матеріалів на e-mail.
          </p>
          <label className="m-consent">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>Я погоджуюсь з умовами придбання та політикою конфіденційності</span>
          </label>
          <button className="m-primary" disabled={!items.length}>
            Перейти до оплати
          </button>
          {!items.length && <p>Кошик порожній. Спочатку оберіть матеріал.</p>}
        </form>
      ) : (
        <div className="m-checkout-panel m-payment-panel">
          <h2 className="m-order-heading">
            <img src={a.MobileCheckoutDesign.imgStepIcon} alt="" />
            Ваше замовлення <small>{itemCountLabel(items.length)}</small>
          </h2>
          <div className="m-order-rows">
            {items.map((p) => (
              <article className="m-order-item" key={p.id}>
                <img src={p.image} alt="" />
                <h3>{p.name}</h3>
                <strong>{p.price === null ? 'Уточнюється' : formatPrice(p.price)}</strong>
              </article>
            ))}
          </div>
          <div className="m-order-total">
            <span>До оплати:</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <fieldset>
            <legend>
              <img src={a.MobileCheckoutDesign.imgVector} alt="" />
              Спосіб оплати
            </legend>
            {[
              ['card', 'Банківська картка'],
              ['apple', 'Apple Pay'],
              ['google', 'Google Pay'],
            ].map(([id, label]) => (
              <label key={id} className={'m-pay-method ' + (method === id ? 'selected' : '')}>
                <input
                  type="radio"
                  name="payment"
                  checked={method === id}
                  onChange={() => setMethod(id)}
                />
                {
                  <img
                    className="m-pay-logo"
                    src={
                      id === 'card'
                        ? a.MobileCheckoutDesign.imgVector1
                        : id === 'apple'
                          ? a.MobileCheckoutDesign.imgGroup
                          : a.MobileCheckoutDesign.imgFlatColorIconsGoogle
                    }
                    alt=""
                  />
                }
                {label}
                {id === 'card' && (
                  <span className="m-pay-card-logos">
                    <img src={a.MobileCheckoutDesign.imgVector2} alt="Visa" />
                    <img src={a.MobileCheckoutDesign.imgLogosMastercard} alt="Mastercard" />
                  </span>
                )}
              </label>
            ))}
          </fieldset>
          <label className="m-consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              Я погоджуюсь з <strong>Умовами придбання</strong> та{' '}
              <strong>Політикою конфіденційності</strong>
            </span>
          </label>
          <label className="m-consent">
            <input
              type="checkbox"
              checked={digitalConsent}
              onChange={(e) => setDigitalConsent(e.target.checked)}
            />
            <span>
              Я розумію, що після оплати отримаю цифровий контент одразу і погоджуюся з тим, що в
              такому випадку право на відмову від покупки може бути обмежене
            </span>
          </label>
          <button
            className="m-primary"
            disabled={!items.length || !consent || !digitalConsent}
            onClick={() => setNotice(true)}
          >
            Оплатити {formatPrice(total)}
          </button>
          {notice && (
            <p role="status">
              Онлайн-оплату ще не підключено.{' '}
              <a href={telegram} target="_blank" rel="noreferrer">
                Напишіть Яніні в Telegram
              </a>{' '}
              для оформлення.
            </p>
          )}
          <button className="m-back" onClick={() => setStep(1)}>
            ← Змінити e-mail
          </button>
        </div>
      )}
    </main>
  );
}
