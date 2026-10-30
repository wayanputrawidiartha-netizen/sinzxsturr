import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/catalog';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', target: 'hero' },
    { label: 'Layanan', target: 'layanan' },
    { label: 'Saluran Stok', target: 'saluran-stok' },
    { label: 'Fee Rekber', target: 'rekber' },
    { label: 'Tentang', target: 'tentang' },
    { label: 'Keunggulan', target: 'keunggulan' },
    { label: 'Alur Transaksi', target: 'alur-transaksi' },
    { label: 'FAQ', target: 'faq' },
  ];

  const handleNavClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080F1E]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="Kembali ke beranda SINZXR JB STORE"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-cyan-500/40 p-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-900/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:border-cyan-400 transition-all">
                <img
                  src="https://cdn.phototourl.com/member/2026-10-30-4054384d-a11a-4dd2-ae74-75c675ee91d6.jpg"
                  alt="Logo SINZXR JB STORE"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#080F1E]" title="Online" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                SINZXR <span className="text-cyan-400 text-xs px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30">JB STORE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400 inline" /> Official Sinzxsturr
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('kontak')}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-gradient-to-r from-cyan-600/80 to-blue-700/80 hover:from-cyan-500 hover:to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-400/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Hubungi Kami</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1325]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 pt-4 pb-6 mt-2 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg border border-transparent hover:border-cyan-500/20 transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-cyan-500/50 text-xs font-mono">0{navItems.indexOf(item) + 1}</span>
              </button>
            ))}

            <div className="pt-3 mt-1 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={`https://wa.me/${OFFICIAL_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium text-sm border border-emerald-400/40 shadow-lg shadow-emerald-950/50 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Admin WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
