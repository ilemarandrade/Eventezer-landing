import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingGrowthStructure } from "@/components/landing/landing-growth-structure";
import { LandingPersonas } from "@/components/landing/landing-personas";
import { LandingPricing } from "@/components/landing/landing-pricing";
import { LandingCalculator } from "@/components/landing/landing-calculator";
import { LandingFaq } from "@/components/landing/landing-faq";
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
        <LandingPricing />
        <LandingCalculator />
        <LandingFaq />
        <LandingContact />
      </main>
      <LandingFooter />
    </>
  );
}
