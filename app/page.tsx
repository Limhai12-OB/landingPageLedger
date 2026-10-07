import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SyncSection from "@/components/SyncSection";
import Upgrade from "@/components/Upgrade";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <SyncSection />
      <Upgrade />
      <Testimonials />
      <WhyUs />
      <Footer />
    </main>
  );
}
