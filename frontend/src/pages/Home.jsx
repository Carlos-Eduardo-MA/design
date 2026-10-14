import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { PinterestGallery } from "@/components/PinterestGallery";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main data-testid="home-page">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <HeroSection />
      <EditorialMarquee />
      <PinterestGallery />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
