import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle, Sparkles, MessageCircle } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/catalog';

export const AboutBusinessSection: React.FC = () => {
  return (
    <section id="tentang" className="py-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Brand Story Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Robotic HUD border accents */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-cyan-400/50 p-0.5 bg-gradient-to-br from-cyan-500/30 to-blue-900/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0">
                  <img
                    src="https://cdn.phototourl.com/member/2026-10-30-4054384d-a11a-4dd2-ae74-75c675ee91d6.jpg"
                    alt="Logo SINZXR JB STORE"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    SINZXR JB STORE
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Trusted Gaming JB Partner
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Founder & Admin: Sinzxsturr
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                <p>
                  <strong>Sinzxsturr</strong> hadir sebagai solusi terpercaya bagi komunitas gamer di Indonesia yang menginginkan transaksi akun Free Fire dan Mobile Legends yang aman, transparan, dan tanpa drama penipuan.
                </p>
                <p className="text-slate-400">
                  Kami memahami kekhawatiran pembeli dan penjual terkait risiko hackback dan data tidak valid. Oleh karena itu, setiap akun yang kami tangani melalui proses verifikasi data ketat dan panduan rebind hingga 100% aman.
                </p>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#091222] border border-slate-800 text-center">
                  <span className="font-heading text-lg font-bold text-cyan-400 block">100%</span>
                  <span className="text-[11px] text-slate-400">Garansi Transaksi Aman</span>
                </div>
                <div className="p-3 rounded-xl bg-[#091222] border border-slate-800 text-center">
                  <span className="font-heading text-lg font-bold text-emerald-400 block">Fast</span>
                  <span className="text-[11px] text-slate-400">Responsif & Ramah</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Commitments & Selling Points (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Tentang Bisnis Kami
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Membangun Reputasi Lewat Kejujuran & Keamanan
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mt-4 rounded-full" />
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Di industri jual beli akun game, reputasi adalah segalanya. <strong>SINZXR JB STORE</strong> mengutamakan keamanan akun dan transparansi informasi di setiap tahap transaksi, memastikan pembeli mendapatkan apa yang dijanjikan dan penjual menerima pembayaran secara adil.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Verifikasi Data Akun</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pengecekan mendalam status bind (Google, Moonton, FB), vault, hero, dan rank sebelum kesepakatan final.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Panduan Rebind Tuntas</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Admin memandu proses serah terima akun langkah demi langkah hingga akun sepenuhnya beralih ke kontak Anda.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Konsultasi Ramah & Terbuka</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bebas bertanya dan konsultasi seputar harga pasar, rekomendasi akun, maupun tips mengamankan akun game.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>Fokus FF & MLBB</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pemahaman mendalam mengenai meta, skin langka, dan struktur keamanan akun Free Fire serta Mobile Legends.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Halo Admin Sinzxsturr, saya ingin kenalan dan konsultasi jasa jual beli akun game.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Konsultasi Langsung dengan Admin Sinzxsturr</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
