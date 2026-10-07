import s from "./v2.module.css";
import Nav from "@/components/v2/Nav";
import Hero from "@/components/v2/Hero";
import LogoStrip from "@/components/v2/LogoStrip";
import Features from "@/components/v2/Features";
import Pricing from "@/components/v2/Pricing";
import Showcase from "@/components/v2/Showcase";
import Testimonials from "@/components/v2/Testimonials";
import Insights from "@/components/v2/Insights";
import Cta from "@/components/v2/Cta";
import Footer from "@/components/v2/Footer";
import RevealObserver from "@/components/v2/RevealObserver";

export default function LandingV2() {
  return (
    <div className={s.page}>
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <Pricing />
        <Showcase />
        <Testimonials />
        <div className={s.tint}>
          <Insights />
          <Cta />
        </div>
      </main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
