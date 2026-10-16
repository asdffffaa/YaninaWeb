import { designAssets } from '../../design/assets';
import { mobileAssets } from '../../design/mobile-assets';
import './mobile-payment.css';

const assets = designAssets.PaymentDesign;
const methods = [
  {
    id: 'payment-card',
    label: 'ОДНИМ ПЛАТЕЖЕМ',
    title: 'Повна онлайн-оплата',
    description: 'Захищений платіж і миттєве підтвердження.',
    note: 'Visa • Mastercard',
    icon: assets.imgFrame1000003358,
  },
  {
    id: 'payment-mono',
    label: 'ЧАСТИНАМИ',
    title: 'Покупка частинами · monobank',
    description: 'Кількість платежів та умови уточнюються.',
    note: 'Умови уточнюються',
    icon: assets.imgFrame1000003359,
  },
  {
    id: 'payment-privat',
    label: 'ЧАСТИНАМИ',
    title: 'Оплата частинами · ПриватБанк',
    description: 'Комісії та доступність уточнюються.',
    note: 'Швидке рішення онлайн',
    icon: assets.imgFrame1000003360,
  },
] as const;

export function MobilePayment({
  onPayment,
}: {
  onPayment: (method: (typeof methods)[number]['id']) => void;
}) {
  return (
    <section id="payment" className="section m-payment-section" aria-labelledby="payment-title">
      <img
        className="m-payment-background"
        src={mobileAssets.MobilePaymentDesign.img13MobilePaymentAccess}
        alt=""
        loading="lazy"
      />
      <header className="m-payment-heading">
        <p className="section-eyebrow">ЗРУЧНА ОПЛАТА</p>
        <img src={assets.imgHeaderOrnament} alt="" loading="lazy" />
        <h2 id="payment-title">Оплата та доступ</h2>
        <p>Способи оплати та відкриття доступу — за умовами обраної програми.</p>
      </header>
      <div className="m-payment-cards">
        {methods.map((method) => (
          <article className="m-payment-card" key={method.id} data-payment-method={method.id}>
            <div className="m-payment-card-top">
              <img src={method.icon} alt="" loading="lazy" />
              {method.id !== 'payment-card' && <span className="m-payment-badge">ПОПУЛЯРНО</span>}
            </div>
            <p className="m-payment-label">{method.label}</p>
            <h3>{method.title}</h3>
            <p className="m-payment-description">{method.description}</p>
            <p className="m-payment-note">{method.note}</p>
            <button type="button" onClick={() => onPayment(method.id)}>
              Переглянути умови <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>
      <div className="m-payment-trust">
        <img src={assets.imgLockIcon} alt="" loading="lazy" />
        <p>Безпечна оплата • Підтвердження одразу • Допоможемо з вибором</p>
      </div>
    </section>
  );
}
