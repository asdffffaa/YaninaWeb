import { lazy, Suspense, useState } from 'react';
import type { Product } from '../data/catalog';

const DesktopCheckout = lazy(() => import('./Checkout').then((m) => ({ default: m.Checkout })));
const MobileCheckout = lazy(() =>
  import('./mobile/MobileCheckout').then((m) => ({ default: m.MobileCheckout })),
);

function useCheckoutDraft(mobile: boolean) {
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('card');
  const [consent, setConsent] = useState(!mobile);
  const [digitalConsent, setDigitalConsent] = useState(false);
  const [step, setStep] = useState(1);
  return {
    email,
    setEmail,
    method,
    setMethod,
    consent,
    setConsent,
    digitalConsent,
    setDigitalConsent,
    step,
    setStep,
  };
}
export type CheckoutDraft = ReturnType<typeof useCheckoutDraft>;

/** Keep in-progress form data when the viewport switches between the two layouts. */
export function CheckoutPage({
  mobile,
  ...props
}: {
  mobile: boolean;
  items: Product[];
  total: number;
  onCart: () => void;
}) {
  const draft = useCheckoutDraft(mobile);
  const Layout = mobile ? MobileCheckout : DesktopCheckout;
  return (
    <Suspense
      fallback={
        <div className="page-loading" role="status">
          Завантаження…
        </div>
      }
    >
      <Layout {...props} draft={draft} />
    </Suspense>
  );
}
