import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { GamesSection } from "@/components/sections/GamesSection";
import { BonusSection } from "@/components/sections/BonusSection";
import { SportsBetting } from "@/components/sections/SportsBetting";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <GamesSection />
        <BonusSection />
        <SportsBetting />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
