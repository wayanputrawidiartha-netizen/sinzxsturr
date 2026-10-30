import React from 'react';
import { Shield, ShieldCheck, ArrowLeftRight, MessageCircle, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { REKBER_FEE_TIERS } from '../data/rekberFees';
import { OFFICIAL_PHONE } from '../utils/catalog';

export const RekberFeeSection: React.FC = () => {
  const whatsappRekberUrl = `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(
    'Halo Admin Sinzxsturr (SINZXR JB STORE), saya ingin menggunakan layanan jasa Rekber / Middleman (MC) untuk transaksi akun game. Mohon info dan panduannya min.'
  )}`;

  return (
    <section id="rekber" className="py-20 relative overflow-hidden">
      {/* Background glow and subtle circuit elements */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-cyan-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRANSPARENT FEE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            REKBER & MIDDLEMAN FEE
          </h2>

          <p className="text-sm sm:text-base font-semibold text-cyan-300 tracking-wide mt-2 font-mono">
            Secure Your Transaction, Trade With Confidence.
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-4 rounded-full" />

          <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-4 leading-relaxed">
            Gunakan layanan Rekber / Middleman untuk membantu proses transaksi jual beli akun game agar lebih aman, terarah, dan transparan.
          </p>
        </div>

        {/* Futuristic Fee Table / Grid Display */}
        <div className="max-w-4xl mx-auto">
          {/* Top Decorative HUD Bar */}
          <div className="glass-panel rounded-t-2xl px-6 py-4 border-b border-cyan-500/30 flex items-center justify-between text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="font-bold tracking-wider uppercase">TABEL TARIF RESMI REKBER / MC</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" /> Jaminan Pihak Ketiga Netral
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400">Fixed Rate</span>
            </div>
          </div>

          {/* Table Container */}
          <div className="glass-panel rounded-b-2xl border-t-0 p-3 sm:p-6 shadow-2xl space-y-3">
            {/* Header row for larger screens */}
            <div className="hidden sm:grid sm:grid-cols-12 px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-slate-400 border-b border-slate-800">
              <span className="col-span-1">No</span>
              <span className="col-span-6 flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                Nominal Transaksi
              </span>
              <span className="col-span-5 text-right flex items-center justify-end gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Fee Rekber / MC
              </span>
            </div>

            {/* Fee Tiers List */}
            <div className="space-y-2.5">
              {REKBER_FEE_TIERS.map((tier, index) => {
                return (
                  <div
                    key={tier.id}
                    className="group relative rounded-xl p-4 sm:px-5 sm:py-3.5 bg-[#0a1427]/80 hover:bg-[#11213f] border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-200 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-2 sm:gap-0 shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  >
                    {/* Index */}
                    <div className="hidden sm:block col-span-1 font-mono text-xs text-cyan-500/70 font-bold">
                      0{index + 1}
                    </div>

                    {/* Nominal Range */}
                    <div className="col-span-6 flex items-center justify-between sm:justify-start gap-3">
                      <span className="sm:hidden text-xs text-slate-400 font-mono">Nominal Transaksi:</span>
                      <span className="text-sm sm:text-base font-semibold text-white tracking-wide group-hover:text-cyan-200 transition-colors">
                        {tier.range}
                      </span>
                    </div>

                    {/* Fee (Prominently styled) */}
                    <div className="col-span-5 flex items-center justify-between sm:justify-end gap-3 pt-1.5 sm:pt-0 border-t border-slate-800/60 sm:border-t-0">
                      <span className="sm:hidden text-xs text-slate-400 font-mono">Biaya Jasa:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-xl font-extrabold text-cyan-300 font-mono tracking-tight group-hover:scale-105 transition-transform drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                          {tier.fee}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                          Flat
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note under fee table */}
            <div className="mt-6 p-4 rounded-xl bg-[#091222]/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="text-slate-400">Catatan: </span>
                Untuk informasi dan konfirmasi biaya Rekber / Middleman, silakan hubungi admin <strong>SINZXR JB STORE</strong>. Biaya jasa dibayarkan saat kesepakatan transaksi dimulai.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappRekberUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Gunakan Jasa Rekber</span>
                <ExternalLink className="w-4 h-4 text-slate-950 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
