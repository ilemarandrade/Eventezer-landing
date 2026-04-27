import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingGrowthStructure } from "@/components/landing/landing-growth-structure";
import { LandingPersonas } from "@/components/landing/landing-personas";
import { LandingProductPreview } from "@/components/landing/landing-product-preview";
import { LandingPricing } from "@/components/landing/landing-pricing";
import { LandingCalculator } from "@/components/landing/landing-calculator";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingServiceCta } from "@/components/landing/landing-service-cta";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingGrowthStructure />
        <LandingPersonas />
        <LandingProductPreview />
        <LandingPricing />
        <LandingCalculator />
        <LandingFaq />
        <LandingServiceCta />
        <LandingContact />
      </main>
      <LandingFooter />
    </>
  );
}
