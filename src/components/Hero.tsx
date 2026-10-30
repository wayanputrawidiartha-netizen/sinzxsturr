import React from 'react';
import { ArrowDown, MessageCircle, Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/catalog';

interface HeroProps {
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-24 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background cyber grid & glow effects */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Futuristic decorative circuit lines / HUD borders */}
      <div className="absolute top-28 left-6 sm:left-12 hidden lg:flex flex-col gap-2 opacity-40 font-mono text-[10px] text-cyan-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>SYSTEM_ONLINE // PROTOCOL_V2.6</span>
        </div>
        <div className="w-28 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
        <span className="text-slate-500">AUTH: VERIFIED_JB_NODE</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col items-center text-center">
          {/* Top Badge: Verified Gaming Store */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="tracking-wide">Layanan Jasa Jual Beli Akun FF & MLBB</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400 font-mono text-[11px]">Sinzxsturr</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase max-w-5xl leading-[1.1] mb-6">
            YOUR ACCOUNT, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]">
              YOUR NEXT LEGEND.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8 sm:mb-10 font-normal">
            Temukan akun Free Fire dan Mobile Legends impianmu. Transaksi mudah, pilihan beragam, dan pelayanan terpercaya.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Jelajahi Layanan</span>
              <ArrowDown className="w-4 h-4 text-slate-950" />
            </button>

            <a
              href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Halo Admin Sinzxsturr, saya ingin konsultasi jasa jual beli akun Free Fire & Mobile Legends.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#101D35]/80 hover:bg-[#172B4D] border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-semibold text-sm sm:text-base tracking-wide transition-all shadow-lg flex items-center justify-center gap-2.5 backdrop-blur-md transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Hubungi Admin</span>
            </a>
          </div>

          {/* Primary Visual Banner Display (Main requested banner) */}
          <div className="w-full max-w-4xl relative group mt-2">
            {/* Outer cyber robotic HUD frame */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            {/* Glowing backdrop layer */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-600/20 to-cyan-500/30 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Banner card container with proportional image display */}
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 bg-[#0a1325] shadow-2xl">
              <img
                src="https://cdn.phototourl.com/member/2026-10-30-02dedc40-a038-485a-b58d-b5dafd448667.png"
                alt="Banner Utama SINZXR JB STORE"
                className="w-full h-auto max-h-[480px] object-contain sm:object-cover mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                loading="eager"
              />

              {/* Subtle tech vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E] via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Status bar inside banner */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-lg bg-[#080F1E]/80 backdrop-blur-md border border-cyan-500/20 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold tracking-wide">SINZXR JB STORE</span>
                  <span className="text-slate-500 hidden sm:inline">|</span>
                  <span className="text-cyan-300 hidden sm:inline">Pusat Jual Beli Akun FF & MLBB</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fast Response
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" /> All Unbind Aman
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Features Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mt-10">
            <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3 border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Garansi Transaksi</p>
                <p className="text-[11px] text-slate-400">Jaminan data aman</p>
              </div>
            </div>

            <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3 border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Pelayanan Cepat</p>
                <p className="text-[11px] text-slate-400">Direct admin WhatsApp</p>
              </div>
            </div>

            <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3 border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Informasi Jujur</p>
                <p className="text-[11px] text-slate-400">Cek sebelum transaksi</p>
              </div>
            </div>

            <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3 border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Pilihan Beragam</p>
                <p className="text-[11px] text-slate-400">Akun FF & MLBB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
