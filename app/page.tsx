import s from "./landing.module.css";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Showcase from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import Insights from "@/components/Insights";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

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
