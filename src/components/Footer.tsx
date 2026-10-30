import React from 'react';
import { ShieldCheck, MessageCircle, ExternalLink, ArrowUp } from 'lucide-react';
import { WHATSAPP_BASE_URL, TIKTOK_URL } from '../utils/catalog';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050a14] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden text-slate-400 text-xs sm:text-sm">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-blue-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1-2: Brand, Logo & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-cyan-500/40 p-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-900/40">
                <img
                  src="https://cdn.phototourl.com/member/2026-10-30-4054384d-a11a-4dd2-ae74-75c675ee91d6.jpg"
                  alt="Logo SINZXR JB STORE"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                SINZXR <span className="text-cyan-400">JB STORE</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Landing page promosi dan perkenalan resmi bisnis jual beli akun game Free Fire dan Mobile Legends oleh Sinzxsturr. Layanan konsultasi transaksi aman, transparan, dan terpercaya.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />
              <span>Jual Beli Akun Terpercaya • Fast Response</span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('layanan')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Layanan Game
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rekber')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Fee Rekber / MC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tentang')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Tentang Bisnis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('keunggulan')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Keunggulan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('alur-transaksi')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Alur Transaksi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Pertanyaan (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Game Focus */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold">
              Fokus Layanan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-orange-400 transition-colors">
                <button onClick={() => onNavigate('layanan')} className="cursor-pointer text-left">
                  • Akun Free Fire (FF)
                </button>
              </li>
              <li className="hover:text-cyan-400 transition-colors">
                <button onClick={() => onNavigate('layanan')} className="cursor-pointer text-left">
                  • Akun Mobile Legends (MLBB)
                </button>
              </li>
              <li>• Konsultasi Harga Pasar Akun</li>
              <li>• Panduan Rebind Akun Aman</li>
              <li>• Garansi Anti Hackback</li>
            </ul>
          </div>

          {/* Col 5: Social Media Official */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold">
              Sosial Media
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-900/50 text-xs font-medium transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Admin</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-slate-200 hover:text-pink-300 hover:border-pink-500/40 text-xs font-medium transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1 2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.11V9.43a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.08a8.28 8.28 0 0 0 4.76 1.48v-3.45c-1.35-.01-2.61-.47-3.8-1.42z" />
                </svg>
                <span>TikTok @sinzxstr.jb</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SINZXR JB STORE. All Rights Reserved.</p>
          <p className="text-center sm:text-right text-[11px] text-slate-600 max-w-md">
            Free Fire adalah hak cipta Garena. Mobile Legends: Bang Bang adalah hak cipta Moonton. Website ini berfungsi sebagai landing page promosi dan perkenalan bisnis layanan jual beli akun game.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
