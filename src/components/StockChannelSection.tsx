import React from 'react';
import { ExternalLink, Radio, Sparkles, Bell, ShieldCheck, Flame, Swords } from 'lucide-react';
import { WHATSAPP_CHANNEL_URL } from '../utils/catalog';

interface StockChannelSectionProps {
  channelUrl?: string;
}

export const StockChannelSection: React.FC<StockChannelSectionProps> = ({ channelUrl }) => {
  const url = channelUrl || WHATSAPP_CHANNEL_URL;
  return (
    <section id="saluran-stok" className="py-20 relative overflow-hidden">
      {/* Holographic radial gradients & digital circuit backdrop */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/10 to-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber circuit lines */}
      <div className="absolute top-12 left-10 hidden xl:block w-36 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute bottom-12 right-10 hidden xl:block w-36 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto relative group">
          {/* Robotic HUD outer corner frame */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-400/80 pointer-events-none" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-400/80 pointer-events-none" />

          {/* Hologram gradient border glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/25 via-cyan-500/30 to-blue-600/25 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Main Card with Glassmorphism & Hologram Effect */}
          <div className="relative rounded-2xl glass-panel p-6 sm:p-10 md:p-12 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] bg-gradient-to-b from-[#0d1b33]/90 via-[#0a1528]/95 to-[#070e1c]/95 overflow-hidden text-center">
            {/* Holographic light streak inside card */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[450px] h-40 bg-gradient-to-b from-cyan-400/10 to-transparent rotate-12 blur-2xl pointer-events-none" />

            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>OFFICIAL WHATSAPP CHANNEL</span>
            </div>

            {/* Brand Logo & WhatsApp Channel Icon Duo */}
            <div className="flex items-center justify-center gap-4 sm:gap-5 mb-8">
              {/* Logo SINZXR JB STORE */}
              <div className="relative group/logo">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/60 p-1 bg-gradient-to-br from-cyan-500/30 via-blue-900/40 to-slate-900 shadow-[0_0_25px_rgba(6,182,212,0.35)] transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://cdn.phototourl.com/member/2026-10-30-4054384d-a11a-4dd2-ae74-75c675ee91d6.jpg"
                    alt="Logo SINZXR JB STORE"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-[#080F1E] flex items-center justify-center" title="Verified">
                  <ShieldCheck className="w-2.5 h-2.5 text-slate-950" />
                </span>
              </div>

              {/* Holographic Connection Wave */}
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-500 opacity-70" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* WhatsApp Channel Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-400/60 p-1 bg-gradient-to-br from-emerald-500/30 via-teal-900/40 to-[#0e2a22] shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <svg
                  className="w-9 h-9 sm:w-11 sm:h-11 fill-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.185 1.564 5.939l-1.564 5.889 6.079-1.595c1.701.936 3.654 1.767 5.921 1.767 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </div>

            {/* Requested Section Headline */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight mb-2">
              STAY UPDATED WITH OUR STOCK
            </h2>

            {/* Requested Subheadline */}
            <p className="text-base sm:text-lg font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 mb-5">
              Never Miss The Next Drop.
            </p>

            {/* Requested Description */}
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              Pantau update stok akun Free Fire dan Mobile Legends terbaru melalui saluran WhatsApp resmi SINZXSTURR. Dapatkan informasi akun yang tersedia dan update terbaru secara langsung.
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-9 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-orange-500/30 text-orange-300">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Drop Akun Free Fire</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-cyan-500/30 text-cyan-300">
                <Swords className="w-3.5 h-3.5 text-cyan-400" />
                <span>Drop Akun Mobile Legends</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-500/30 text-emerald-300">
                <Bell className="w-3.5 h-3.5 text-emerald-400" />
                <span>Notifikasi Real-Time</span>
              </span>
            </div>

            {/* Requested Primary CTA Button */}
            <div className="flex flex-col items-center justify-center gap-3">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] border border-emerald-200/50 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                {/* WhatsApp Icon */}
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-slate-950"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.185 1.564 5.939l-1.564 5.889 6.079-1.595c1.701.936 3.654 1.767 5.921 1.767 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>JOIN STOCK CHANNEL</span>
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 opacity-80" />
              </a>

              {/* Requested small text */}
              <p className="text-[11px] sm:text-xs text-slate-400 mt-2 font-mono">
                Join our channel and stay updated with the latest stock information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
