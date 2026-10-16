import { restoreCart } from './lib/cart';
import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { Header } from './components/Header';
import { useMediaQuery } from './components/useMediaQuery';
import { MobileHeader } from './components/mobile/MobileHeader';
import { Modal } from './components/Modal';
import { usePageReveal } from './components/usePageReveal';
import { catalog, sampleCart, type Product } from './data/catalog';
const DesktopHome = lazy(() =>
  import('./components/DesktopHome').then((m) => ({ default: m.DesktopHome })),
);
const MobileHome = lazy(() =>
  import('./components/mobile/MobileHome').then((m) => ({ default: m.MobileHome })),
);
const CheckoutPage = lazy(() =>
  import('./components/CheckoutPage').then((m) => ({ default: m.CheckoutPage })),
);
const FullCoursePage = lazy(() =>
  import('./components/FullCoursePage').then((m) => ({ default: m.FullCoursePage })),
);
const CourseDetail = lazy(() =>
  import('./components/CourseDetail').then((m) => ({ default: m.CourseDetail })),
);
const MobileProductDetail = lazy(() =>
  import('./components/mobile/MobileProductDetail').then((m) => ({
    default: m.MobileProductDetail,
  })),
);
const CartModal = lazy(() =>
  import('./components/CartModal').then((m) => ({ default: m.CartModal })),
);
const PaymentConditions = lazy(() =>
  import('./components/PaymentConditions').then((m) => ({ default: m.PaymentConditions })),
);
const CART_KEY = 'yanina-desktop-20260930-cart-v1';
const catalogById = new Map(catalog.map((product) => [product.id, product]));
type NavigationTarget = {
  id: string;
} | null;
function currentRoute() {
  const hash = location.hash;
  return hash.startsWith('#/') ? hash.slice(1) : '/';
}
function Loading() {
  return (
    <div className="page-loading" role="status">
      Завантаження…
    </div>
  );
}
// Effects run after the lazy page commits, so navigation and entrance animations
// also work on the first visit and when returning from checkout.
function PageReady({
  route,
  target,
  children,
}: {
  route: string;
  target: NavigationTarget;
  children: ReactNode;
}) {
  usePageReveal(route);
  useEffect(() => {
    if (target)
      document.getElementById(target.id)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      });
  }, [route, target]);
  return children;
}
export default function App() {
  const [route, setRoute] = useState(currentRoute),
    [modal, setModal] = useState<
      Product | 'cart' | 'payment-card' | 'payment-mono' | 'payment-privat' | null
    >(null);
  const [target, setTarget] = useState<NavigationTarget>(null);
  const [cart, setCart] = useState<Product[]>(() => {
    try {
      return restoreCart(localStorage.getItem(CART_KEY), catalogById, sampleCart);
    } catch {
      return sampleCart;
    }
  });
  const mobile = useMediaQuery('(max-width: 767px)');
  const total = cart.reduce((sum, p) => sum + (p.price ?? 0), 0);
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart.map((p) => p.id)));
    } catch {
      /* The cart remains usable when storage is unavailable. */
    }
  }, [cart]);
  useEffect(() => {
    const sync = () => {
      setRoute(currentRoute());
      setModal(null);
    };
    let frame = 0,
      width = 0;
    const scale = () => {
      frame = 0;
      // Keep the landing's scale stable while a modal locks the body in place.
      width =
        document.body.style.position === 'fixed'
          ? document.body.clientWidth
          : document.documentElement.clientWidth;
      document.documentElement.style.setProperty(
        '--desktop-scale',
        String(Math.min(1, width / 1920)),
      );
      document.documentElement.style.setProperty(
        '--mobile-scale',
        String(Math.min(480, width) / 402),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(scale);
    };
    scale();
    const observer = new ResizeObserver(() => {
      if (document.documentElement.clientWidth !== width) schedule();
    });
    observer.observe(document.documentElement);
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', sync);
    };
  }, []);
  const [modalClosing, setModalClosing] = useState(false);
  const closeModal = useCallback(() => setModalClosing(true), []);
  useEffect(() => {
    if (!modalClosing) return;
    const timer = window.setTimeout(
      () => {
        setModal(null);
        setModalClosing(false);
      },
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
    );
    return () => window.clearTimeout(timer);
  }, [modalClosing]);
  const go = useCallback((path: string) => {
    setModal(null);
    setTarget(null);
    if (currentRoute() === path) setRoute(path);
    else location.hash = path === '/' ? 'home' : path;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const navigate = useCallback(
    (id: string) => {
      setModal(null);
      if (currentRoute() !== '/') go('/');
      setTarget({ id });
    },
    [go],
  );
  const openCourse = useCallback((p: Product) => setModal(p), []);
  const addProduct = useCallback((p: Product) => {
    const product = catalogById.get(p.id) ?? p;
    setCart((items) =>
      items.some((item) => item.id === product.id) ? items : [...items, product],
    );
    setModal('cart');
  }, []);
  const selected = route.startsWith('/course/') ? catalogById.get(route.slice(8)) : null;
  useEffect(() => {
    document.title = selected
      ? selected.name + ' — Яніна Коріненко'
      : route === '/checkout'
        ? 'Оформлення замовлення — Яніна Коріненко'
        : 'Яніна Коріненко — кондитерська онлайн-школа';
  }, [route, selected]);
  return (
    <>
      <div id="app-shell" className={mobile ? 'mobile-site' : 'desktop-canvas'}>
        {mobile ? (
          <MobileHeader
            navigate={navigate}
            onCart={() => setModal('cart')}
            count={cart.length}
            showCart={route !== '/checkout'}
          />
        ) : (
          <Header
            onCart={() => setModal('cart')}
            onNavigate={navigate}
            cartCount={cart.length}
            route={route}
            productKind={selected?.kind}
          />
        )}
        <Suspense fallback={<Loading />}>
          <PageReady route={route + (mobile ? 'mobile' : 'desktop')} target={target}>
            {route === '/checkout' ? (
              <CheckoutPage
                mobile={mobile}
                items={cart}
                total={total}
                onCart={() => setModal('cart')}
              />
            ) : selected ? (
              <FullCoursePage
                product={selected}
                onBack={() => navigate('courses')}
                onPurchase={addProduct}
              />
            ) : mobile ? (
              <MobileHome onOpen={openCourse} onPayment={setModal} navigate={navigate} />
            ) : (
              <DesktopHome onOpen={openCourse} onPayment={setModal} navigate={navigate} />
            )}
          </PageReady>
        </Suspense>
      </div>
      {modal && (
        <Modal
          label={
            typeof modal === 'string'
              ? modal === 'cart'
                ? 'Ваш кошик'
                : 'Умови оплати'
              : modal.name
          }
          variant={modal === 'cart' ? 'cart' : 'course'}
          closing={modalClosing}
          onClose={closeModal}
        >
          <Suspense fallback={<Loading />}>
            {modal === 'cart' ? (
              <CartModal
                items={cart}
                total={total}
                onRemove={(id) => setCart((items) => items.filter((p) => p.id !== id))}
                onClose={closeModal}
                onCheckout={() => go('/checkout')}
              />
            ) : typeof modal === 'string' ? (
              <PaymentConditions method={modal} onClose={closeModal} mobile={mobile} />
            ) : mobile ? (
              <MobileProductDetail product={modal} onClose={closeModal} onPurchase={addProduct} />
            ) : (
              <CourseDetail
                product={modal}
                onClose={closeModal}
                onReturn={() => {
                  closeModal();
                  navigate(
                    modal.kind === 'recipe'
                      ? 'recipes'
                      : modal.kind === 'course'
                        ? 'courses'
                        : 'lessons',
                  );
                }}
                onPurchase={addProduct}
              />
            )}
          </Suspense>
        </Modal>
      )}
    </>
  );
}
