import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Bagaimana cara membeli akun?',
      answer:
        'Anda cukup menghubungi admin Sinzxsturr melalui kontak resmi WhatsApp. Sampaikan kriteria akun Free Fire atau Mobile Legends yang Anda cari (budget, skin langka, rank, dsb.). Admin akan merekomendasikan pilihan akun yang sesuai, memverifikasi data bersama Anda, dan memandu transaksi secara langsung.',
    },
    {
      question: 'Apakah tersedia akun FF dan ML?',
      answer:
        'Ya, fokus utama spesialisasi kami adalah jual beli akun game Free Fire (FF) dan Mobile Legends (MLBB). Kami melayani berbagai kebutuhan, mulai dari akun tier budget/pelajar hingga akun sultan dengan skin langka seperti Evo Gun Max, Collector, KOF, Legend, dan season lawas.',
    },
    {
      question: 'Bagaimana cara mengetahui detail akun?',
      answer:
        'Admin akan memberikan rincian lengkap mengenai akun yang Anda minati melalui chat WhatsApp, meliputi tangkapan layar (screenshot) profil, bukti lobi, inventori skin/vault, serta status pengaitan akun (bind Moonton, Google, FB) sebelum Anda mengambil keputusan.',
    },
    {
      question: 'Apakah bisa bertanya sebelum membeli?',
      answer:
        'Sangat bisa dan sangat dianjurkan. Kami siap melayani konsultasi gratis sebelum Anda bertransaksi, mulai dari cek perkiraan harga pasar, tips keamanan akun, hingga rekomendasi akun terbaik sesuai kebutuhan Anda.',
    },
    {
      question: 'Bagaimana proses serah terima akun?',
      answer:
        'Setelah kesepakatan transaksi tercapai, admin akan memandu serah terima data login secara langsung. Admin akan mengawal proses rebind ke nomor/email pribadi Anda dan memastikan verifikasi dua langkah (2FA) aktif sampai akun sepenuhnya aman dalam genggaman Anda.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Pertanyaan Umum
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Jawaban lengkap seputar layanan jual beli akun game di SINZXR JB STORE.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="rounded-xl overflow-hidden glass-panel border border-slate-800 transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors cursor-pointer focus:outline-none"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-100 flex items-center gap-3">
                    <span className="font-mono text-cyan-400 text-xs sm:text-sm">0{index + 1}.</span>
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-cyan-950/50 border-cyan-500/50' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                    <p className="pl-6 sm:pl-7">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
