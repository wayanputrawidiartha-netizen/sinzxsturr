import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StockChannelSection } from './components/StockChannelSection';
import { RekberFeeSection } from './components/RekberFeeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { getWebsiteData, WebsiteDataBundle } from './services/api';
import { getActiveSession, signOutAdmin } from './lib/supabase';
import { UserProfile } from './types';
import {
  DEFAULT_SETTINGS,
  DEFAULT_REKBER_FEES,
  DEFAULT_GAME_SERVICES,
  DEFAULT_FAQS,
} from '../netlify/functions/utils/defaultData';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'admin'>(() => {
    return typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')
      ? 'admin'
      : 'home';
  });

  const [adminUser, setAdminUser] = useState<UserProfile | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [sessionChecking, setSessionChecking] = useState(true);

  const [websiteData, setWebsiteData] = useState<WebsiteDataBundle>({
    settings: DEFAULT_SETTINGS,
    rekberFees: DEFAULT_REKBER_FEES,
    gameServices: DEFAULT_GAME_SERVICES,
    faqs: DEFAULT_FAQS,
  });

  // Handle URL navigation
  const navigateTo = (route: 'home' | 'admin') => {
    setCurrentRoute(route);
    const targetPath = route === 'admin' ? '/admin' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch website data from API on mount
  const refreshWebsiteData = async () => {
    try {
      const data = await getWebsiteData();
      setWebsiteData(data);
    } catch (err) {
      console.error('Failed to load website data:', err);
    }
  };

  useEffect(() => {
    refreshWebsiteData();
  }, []);

  // Check existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getActiveSession();
        if (session && session.user && session.token && session.user.role === 'admin') {
          setAdminUser(session.user);
          setAuthToken(session.token);
        }
      } catch (err) {
        console.error('Session check error:', err);
      } finally {
        setSessionChecking(false);
      }
    };

    checkSession();
  }, []);

  const handleLoginSuccess = (user: UserProfile, token: string) => {
    setAdminUser(user);
    setAuthToken(token);
    navigateTo('admin');
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setAdminUser(null);
    setAuthToken(null);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on /admin route:
  if (currentRoute === 'admin') {
    if (sessionChecking) {
      return (
        <div className="min-h-screen bg-[#080F1E] text-cyan-400 flex flex-col items-center justify-center font-mono text-sm">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
          <span>INITIALIZING_ADMIN_ENVIRONMENT...</span>
        </div>
      );
    }

    if (adminUser && authToken) {
      return (
        <AdminDashboard
          adminUser={adminUser}
          token={authToken}
          initialSettings={websiteData.settings}
          initialRekberFees={websiteData.rekberFees}
          initialGameServices={websiteData.gameServices}
          initialFaqs={websiteData.faqs}
          onDataUpdated={refreshWebsiteData}
          onLogout={handleLogout}
          onViewWebsite={() => navigateTo('home')}
        />
      );
    }

    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  // Regular Visitors: Public Landing Page
  return (
    <div className="min-h-screen bg-[#080F1E] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Navbar */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenAdmin={() => navigateTo('admin')}
        settings={websiteData.settings}
      />

      <main className="flex-1">
        {/* Hero Section with requested visual banner & branding */}
        <Hero
          onExploreStock={() => scrollToSection('saluran-stok')}
          settings={websiteData.settings}
        />

        {/* Section Saluran WhatsApp Stok Akun SINZXSTURR */}
        <StockChannelSection
          channelUrl={websiteData.settings.whatsapp_channel_url}
        />

        {/* Section REKBER & MIDDLEMAN FEE */}
        <RekberFeeSection
          fees={websiteData.rekberFees}
          whatsappNumber={websiteData.settings.whatsapp_number}
        />

        {/* Section Kontak dan Sosial Media Resmi */}
        <ContactSection settings={websiteData.settings} />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
