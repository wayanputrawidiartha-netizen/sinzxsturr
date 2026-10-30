import React from 'react';
import { MessageSquare, ShieldCheck, CheckSquare, KeyRound, Sparkles, ArrowRight } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/catalog';

export const HowToOrderSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Konsultasi Kebutuhan',
      desc: 'Sampaikan kriteria akun Free Fire atau Mobile Legends yang Anda cari atau ingin Anda tawarkan.',
      icon: MessageSquare,
    },
    {
      num: '02',
      title: 'Hubungi Admin Resmi',
      desc: 'Hubungi admin Sinzxsturr langsung via WhatsApp resmi untuk diskusi cepat dan responsif.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Verifikasi & Kesepakatan',
      desc: 'Admin memverifikasi bukti lobi, profil, status bind, serta rincian kesepakatan transaksi secara transparan.',
      icon: CheckSquare,
    },
    {
      num: '04',
      title: 'Serah Terima & Rebind',
      desc: 'Ikuti proses transaksi dengan panduan pengamanan dan rebind akun hingga 100% tuntas dan aman.',
      icon: KeyRound,
    },
  ];

  return (
    <section id="alur-transaksi" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Panduan Transaksi
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Alur Transaksi Mudah & Terarah
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            4 langkah terstruktur untuk memastikan setiap transaksi akun game berjalan aman, nyaman, dan terpercaya.
          </p>
        </div>

        {/* Timeline Desktop (Horizontal) & Mobile (Vertical) */}
        <div className="relative">
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-400/50 to-blue-500/20 -translate-y-8 pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="group relative flex flex-col items-center text-center p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
                >
                  {/* Step Number Badge */}
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#101D35] to-[#172B4D] border-2 border-cyan-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 transition-colors">
                      <Icon className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-cyan-500 text-slate-950 font-mono font-extrabold text-xs flex items-center justify-center shadow-md">
                      {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-center text-[10px] font-mono text-cyan-400/60 uppercase">
                    Langkah {idx + 1} dari 4
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Action Prompt */}
        <div className="mt-12 text-center">
          <a
            href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Halo Admin Sinzxsturr, saya ingin tanya prosedur transaksi jual beli akun game.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
          >
            <span>Ingin tanya seputar transaksi? Konsultasi dengan Admin</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
