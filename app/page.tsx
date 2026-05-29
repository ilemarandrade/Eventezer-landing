import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingAroDecor } from '@/components/landing/landing-aro-decor';
import { LandingEspiralDecor } from '@/components/landing/landing-espiral-decor';
import { LandingConoDecor } from '@/components/landing/landing-cono-decor';
import { LandingCilindroDecor } from '@/components/landing/landing-cilindro-decor';
import { LandingHero } from '@/components/landing/landing-hero';
import { LandingGrowthStructure } from '@/components/landing/landing-growth-structure';
import { LandingPersonas } from '@/components/landing/landing-personas';
import { LandingProductPreview } from '@/components/landing/landing-product-preview';
import { LandingPricing } from '@/components/landing/landing-pricing';
import { LandingCalculator } from '@/components/landing/landing-calculator';
import { LandingFaq } from '@/components/landing/landing-faq';
import { LandingServiceCta } from '@/components/landing/landing-service-cta';
import { LandingContact } from '@/components/landing/landing-contact';
import { LandingFooter } from '@/components/landing/landing-footer';

export default function HomePage() {
  return (
    <>
      <LandingNavbar />
      <div className="relative overflow-x-hidden">
        <LandingAroDecor />
        <LandingCilindroDecor />
        <LandingConoDecor side="right" />
        <LandingConoDecor side="left" />
        <main className="relative z-10">
          <LandingHero />
          <div className="relative">
            <LandingEspiralDecor />
            <div className="relative z-10">
              <LandingGrowthStructure />
              <LandingPersonas />
              <LandingProductPreview />
              <LandingPricing />
              <LandingCalculator />
              <LandingServiceCta />
              <LandingFaq />
              <LandingContact />
            </div>
          </div>
        </main>
        <LandingFooter className="relative z-10" />
      </div>
    </>
  );
}
