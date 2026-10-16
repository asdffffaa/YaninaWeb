import { memo } from 'react';
import type { Product } from '../data/catalog';
import { Courses } from './Courses';
import { FAQ } from './FAQ';
import { Hero } from './Hero';
import { LearningPaths } from './LearningPaths';
import { MiniCourses } from './MiniCourses';
import {
  About,
  Approach,
  Consultation,
  Diplomas,
  Footer,
  Payment,
  Results,
  Reviews,
  Steps,
} from './StaticSections';
import { TechCards } from './TechCards';
export const DesktopHome = memo(function DesktopHome({
  onOpen,
  onPayment,
  navigate,
}: {
  onOpen: (product: Product) => void;
  onPayment: (method: 'payment-card' | 'payment-mono' | 'payment-privat') => void;
  navigate: (id: string) => void;
}) {
  return (
    <main className="home-page">
      <Hero onNavigate={navigate} />
      <div className="sections">
        <LearningPaths onNavigate={navigate} />
        <About />
        <Approach />
        <Courses onOpen={onOpen} />
        <MiniCourses onOpen={onOpen} />
        <TechCards onOpen={onOpen} />
        <Consultation />
        <Results />
        <Reviews />
        <Diplomas />
        <Payment onOpen={onPayment} />
        <Steps />
        <FAQ />
        <Footer onNavigate={navigate} />
      </div>
    </main>
  );
});
