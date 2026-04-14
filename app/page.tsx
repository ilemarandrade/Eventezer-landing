import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingGrowthStructure } from "@/components/landing/landing-growth-structure";
import { LandingPricing } from "@/components/landing/landing-pricing";
import { LandingCalculator } from "@/components/landing/landing-calculator";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingGrowthStructure />
        <LandingPricing />
        <LandingCalculator />
        <LandingFaq />
        <LandingContact />
      </main>
      <LandingFooter />
    </>
  );
}
