import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GameCategories } from './components/GameCategories';
import { StockChannelSection } from './components/StockChannelSection';
import { RekberFeeSection } from './components/RekberFeeSection';
import { AboutBusinessSection } from './components/AboutBusinessSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowToOrderSection } from './components/HowToOrderSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080F1E] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Navbar */}
      <Navbar onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section with requested visual banner & branding */}
        <Hero onExploreServices={() => scrollToSection('layanan')} />

        {/* Section Fokus Layanan Game (FF & MLBB) */}
        <GameCategories />

        {/* Section Saluran WhatsApp Stok Akun SINZXSTURR */}
        <StockChannelSection />

        {/* Section REKBER & MIDDLEMAN FEE */}
        <RekberFeeSection />

        {/* Section Pengenalan Bisnis Sinzxsturr */}
        <AboutBusinessSection />

        {/* Section Keunggulan (4 Pilar) */}
        <FeaturesSection />

        {/* Section Alur Transaksi (Timeline) */}
        <HowToOrderSection />

        {/* Section FAQ (Accordion) */}
        <FaqSection />

        {/* Section Kontak dan Sosial Media Resmi */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
