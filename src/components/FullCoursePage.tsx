import type { Product } from '../data/catalog';
import { CourseDetail } from './CourseDetail';
export function FullCoursePage({
  product,
  onBack,
  onPurchase,
}: {
  product: Product;
  onBack: () => void;
  onPurchase: (p: Product) => void;
}) {
  return (
    <main className="full-course-page">
      <CourseDetail
        product={product}
        onClose={onBack}
        onReturn={onBack}
        onPurchase={onPurchase}
        page
      />
    </main>
  );
}
