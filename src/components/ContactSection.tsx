import React, { useState } from 'react';
import { ExternalLink, Sparkles, Send, ShieldCheck, Check } from 'lucide-react';
import { OFFICIAL_PHONE, WHATSAPP_BASE_URL, TIKTOK_URL, createConsultationLink, formatPhoneDisplay } from '../utils/catalog';
import { WebsiteSettings } from '../types';

interface ContactSectionProps {
  settings?: WebsiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [selectedGame, setSelectedGame] = useState<'Free Fire' | 'Mobile Legends'>('Free Fire');
  const [serviceType, setServiceType] = useState<'beli' | 'jual' | 'konsultasi'>('beli');
  const [consultNote, setConsultNote] = useState('');
  const [copied, setCopied] = useState(false);

  const phone = settings?.whatsapp_number || OFFICIAL_PHONE;
  const tiktokUrl = settings?.tiktok_url || TIKTOK_URL;
  const whatsappUrl = `https://wa.me/${phone}`;

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = createConsultationLink(selectedGame, serviceType, consultNote);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(`+${phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="kontak" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Hubungi Kami
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Kontak & Sosial Media Resmi
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Terhubung langsung dengan owner & admin Sinzxsturr melalui jalur resmi WhatsApp dan akun TikTok kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Left Column: Official Social Buttons & Admin Profile (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-cyan-400/50 p-0.5 bg-gradient-to-br from-cyan-500/30 to-blue-900/50 shadow-[0_0_20px_rgba(6,182,212,0.35)] shrink-0">
                  <img
                    src="https://cdn.phototourl.com/member/2026-10-30-4054384d-a11a-4dd2-ae74-75c675ee91d6.jpg"
                    alt="Logo SINZXR JB STORE"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    SINZXR JB STORE
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Admin Online & Siap Melayani
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Operasional: Setiap Hari (Fast Response)
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091222] border border-slate-800 text-xs text-slate-300 mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Nomor WhatsApp:</span>
                  <button
                    onClick={copyPhoneNumber}
                    className="text-cyan-300 font-mono hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
                    title="Klik untuk menyalin nomor"
                  >
                    <span>{formatPhoneDisplay(phone)}</span>
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">TikTok Handle:</span>
                  <span className="text-slate-200 font-mono">@sinzxstr.jb</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Jaminan:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Anti Hackback
                  </span>
                </div>
              </div>
            </div>

            {/* The 2 Clickable Social Buttons requested in prompt */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Pilih Jalur Komunikasi:
              </span>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-between p-4 rounded-xl bg-[#0e2a22]/80 hover:bg-[#12362b] border border-emerald-500/40 hover:border-emerald-400 text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 fill-emerald-400 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.185 1.564 5.939l-1.564 5.889 6.079-1.595c1.701.936 3.654 1.767 5.921 1.767 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Hubungi WhatsApp Resmi</p>
                    <p className="text-xs text-emerald-300 font-mono">{formatPhoneDisplay(phone)}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* TikTok Button */}
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-between p-4 rounded-xl bg-[#091526]/90 hover:bg-[#0d2038] border border-cyan-500/40 hover:border-pink-500/60 text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black/60 border border-cyan-400/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                    <svg
                      className="w-5 h-5 fill-white group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.11V9.43a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.08a8.28 8.28 0 0 0 4.76 1.48v-3.45c-1.35-.01-2.61-.47-3.8-1.42z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Follow TikTok Sinzxsturr</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-950 text-pink-300 border border-pink-500/30">Official</span>
                    </p>
                    <p className="text-xs text-slate-300 font-mono">@sinzxstr.jb</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Quick Consultation Builder (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Konsultasi Kebutuhan Transaksi
                </h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Ingin mencari akun spesifik, menjual akun pribadi, atau menanyakan perkiraan harga pasar? Pilih opsi di bawah untuk mengirim pesan otomatis ke admin.
              </p>

              <form onSubmit={handleConsultSubmit} className="space-y-4">
                {/* Game Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    1. Pilih Game:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedGame('Free Fire')}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        selectedGame === 'Free Fire'
                          ? 'bg-orange-950/60 border-orange-500 text-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Free Fire (FF)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGame('Mobile Legends')}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        selectedGame === 'Mobile Legends'
                          ? 'bg-blue-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Mobile Legends (MLBB)
                    </button>
                  </div>
                </div>

                {/* Service Need Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    2. Jenis Kebutuhan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setServiceType('beli')}
                      className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        serviceType === 'beli'
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Cari Akun
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('jual')}
                      className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        serviceType === 'jual'
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Titip / Jual Akun
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('konsultasi')}
                      className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        serviceType === 'konsultasi'
                          ? 'bg-indigo-950 border-indigo-400 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Tanya Umum
                    </button>
                  </div>
                </div>

                {/* Specific Requirements Note */}
                <div>
                  <label htmlFor="spec-input" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    3. Catatan / Rincian Tambahan (Opsional):
                  </label>
                  <input
                    id="spec-input"
                    type="text"
                    value={consultNote}
                    onChange={(e) => setConsultNote(e.target.value)}
                    placeholder="Contoh: Cari akun budget 500rb ada Evo Gun / Mau jual akun tier Glory..."
                    className="w-full p-3 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Konsultasi Langsung via WhatsApp Admin</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>*Privasi dan informasi Anda terlindungi</span>
              <span className="font-mono text-cyan-400">SINZXR_SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
