import React from 'react';
import { Layers, Headphones, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Layers,
      title: 'Pilihan Akun',
      desc: 'Tersedia pilihan akun FF dan ML dengan variasi tier, skin eksklusif, rank, dan rentang budget yang fleksibel.',
      tag: 'BERAGAM & LENGKAP',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Headphones,
      title: 'Pelayanan Responsif',
      desc: 'Admin siap membantu menjawab pertanyaan pembeli, konsultasi spesifikasi akun, dan panduan transaksi.',
      tag: 'FAST RESPONSE',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: ShieldCheck,
      title: 'Informasi Transparan',
      desc: 'Detail akun, status bind, riwayat, dan screenshot dijelaskan secara jujur dan terbuka sebelum transaksi berlangsung.',
      tag: 'DATA VALID',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Zap,
      title: 'Proses Mudah',
      desc: 'Konsultasi dan pemesanan langsung melalui WhatsApp resmi tanpa alur berbelit-belit dengan serah terima terarah.',
      tag: 'PRAKTIS & CEPAT',
      color: 'from-purple-500 to-cyan-500',
    },
  ];

  return (
    <section id="keunggulan" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Kenapa Memilih Kami
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Keunggulan SINZXR JB STORE
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Komitmen kami menghadirkan platform jual beli akun game yang aman, transparan, dan terpercaya bagi gamers Indonesia.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl p-6 glass-panel glass-panel-hover border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Robotic corner accent */}
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:border-cyan-400 transition-colors shadow-inner">
                    <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Tag */}
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase font-semibold block mb-1">
                    {feat.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>STEP 0{index + 1}</span>
                  <span className="text-cyan-400/50">PRO_VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
