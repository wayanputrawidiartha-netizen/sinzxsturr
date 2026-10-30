import React from 'react';
import { Flame, Swords, ArrowRight, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { createConsultationLink } from '../utils/catalog';

export const GameCategories: React.FC = () => {
  const ffWhatsappUrl = createConsultationLink('Free Fire (FF)', 'konsultasi', 'Ingin menanyakan ketersediaan dan rekomendasi akun Free Fire');
  const mlWhatsappUrl = createConsultationLink('Mobile Legends (MLBB)', 'konsultasi', 'Ingin menanyakan ketersediaan dan rekomendasi akun Mobile Legends');

  return (
    <section id="layanan" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Fokus Layanan Game
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Layanan Jual Beli Game
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Kami berspesialisasi dalam perantaraan, kurasi, dan konsultasi jual beli akun game Free Fire dan Mobile Legends terpercaya.
          </p>
        </div>

        {/* 2 Big Specialty Promotion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Free Fire */}
          <div className="group relative rounded-2xl overflow-hidden glass-panel glass-panel-hover border border-orange-500/20 hover:border-orange-400/60 transition-all duration-300 flex flex-col justify-between">
            {/* Top Glowing Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
            
            {/* Image Banner Header */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                alt="Free Fire Visual Theme"
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d172e] via-[#0d172e]/50 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Garena Free Fire</span>
              </div>

              {/* Tag Highlights */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-200">
                  Evo Gun Max
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-200">
                  Old Season
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-200">
                  SG2 Rapper
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>Free Fire (FF)</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Temukan berbagai pilihan akun Free Fire dengan koleksi item dan skin menarik.
                </p>

                <div className="p-3 rounded-xl bg-orange-950/20 border border-orange-500/20 text-xs text-slate-300 mb-6 space-y-1.5">
                  <div className="flex items-center gap-2 text-orange-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-orange-400" />
                    <span>Layanan Spesialisasi FF:</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Bantuan pengecekan vault, verifikasi single/double bind, panduan rebind akun Google/FB, dan konsultasi harga pasar akun FF.
                  </p>
                </div>
              </div>

              <a
                href={ffWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-orange-600/90 to-amber-600/90 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(249,115,22,0.25)] flex items-center justify-center gap-2 cursor-pointer border border-orange-400/30 group-hover:border-orange-400"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Akun FF</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card 2: Mobile Legends */}
          <div className="group relative rounded-2xl overflow-hidden glass-panel glass-panel-hover border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between">
            {/* Top Glowing Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />
            
            {/* Image Banner Header */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
                alt="Mobile Legends Visual Theme"
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d172e] via-[#0d172e]/50 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                <Swords className="w-4 h-4 text-cyan-400" />
                <span>Mobile Legends: Bang Bang</span>
              </div>

              {/* Tag Highlights */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-200">
                  Skin Collector
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-200">
                  KOF Series
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-200">
                  Aspirants
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span>Mobile Legends (MLBB)</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Cari akun Mobile Legends dengan koleksi hero, skin, dan berbagai pilihan menarik.
                </p>

                <div className="p-3 rounded-xl bg-blue-950/30 border border-cyan-500/20 text-xs text-slate-300 mb-6 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Layanan Spesialisasi MLBB:</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Pengecekan Monsep (Moonton Sepaket), verifikasi all unbind, pergantian email primer Moonton, dan jaminan keamanan transaksi.
                  </p>
                </div>
              </div>

              <a
                href={mlWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-600/90 to-blue-600/90 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2 cursor-pointer border border-cyan-400/30 group-hover:border-cyan-400"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Akun ML</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
