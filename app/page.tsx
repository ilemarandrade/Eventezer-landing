import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingSegments } from "@/components/landing/landing-segments";
import { LandingStickyStory } from "@/components/landing/landing-sticky-story";
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
        <LandingSegments />
        <LandingStickyStory />
        <LandingPricing />
        <LandingCalculator />
        <LandingContact />
        <LandingFaq />
      </main>
      <LandingFooter />
    </>
  );
}
