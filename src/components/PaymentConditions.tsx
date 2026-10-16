import { designAssets } from '../design/assets';
import { MobilePaymentSheet } from './mobile/MobilePaymentSheet';
const conditions = {
  'payment-card': {
    title: 'Повна онлайн-оплата',
    body: 'Обраний продукт оплачується одним платежем. Перед підтвердженням замовлення перевірте суму та контактні дані. Доступ надається після підтвердження оплати.',
  },
  'payment-mono': {
    title: 'Покупка частинами · monobank',
    body: 'Можливість покупки частинами залежить від обраної програми та доступного ліміту у вашому банку. Кількість платежів і остаточні умови потрібно узгодити перед оформленням.',
  },
  'payment-privat': {
    title: 'Оплата частинами · ПриватБанк',
    body: 'Доступність оплати частинами залежить від обраної програми та рішення банку. Кількість платежів, можливі комісії й графік списань уточнюються до підтвердження замовлення.',
  },
};
export function PaymentConditions({
  method,
  onClose,
  mobile = false,
}: {
  method: string;
  onClose: () => void;
  mobile?: boolean;
}) {
  const content = conditions[method as keyof typeof conditions];
  const copy = (
    <>
      <p className="conditions-eyebrow">ЗРУЧНА ОПЛАТА</p>
      <h2>{content.title}</h2>
      <p>{content.body}</p>
      <p>
        Після підтвердження платежу ви отримаєте інструкцію для доступу до матеріалів. Якщо виникли
        питання, напишіть Яніні в Telegram.
      </p>
    </>
  );
  if (mobile) return <MobilePaymentSheet onClose={onClose}>{copy}</MobilePaymentSheet>;
  return (
    <div className="payment-conditions">
      <button className="conditions-close" onClick={onClose} aria-label="Закрити умови оплати">
        <img src={designAssets.CourseDetailDesign.imgIconClose} alt="" />
      </button>
      {copy}
      <button className="conditions-done" onClick={onClose}>
        Зрозуміло
      </button>
    </div>
  );
}
