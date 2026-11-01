import { WebsiteSettings, RekberFee, GameService, FaqItem } from '../../../src/types';

export const DEFAULT_SETTINGS: WebsiteSettings = {
  id: 'general',
  brand_name: 'SINZXR JB STORE',
  whatsapp_number: '628886199242',
  whatsapp_channel_url: 'https://whatsapp.com/channel/0029VbDMDVbGufJ1AZ3tmq0D',
  tiktok_url: 'https://www.tiktok.com/@sinzxstr.jb?_r=1&_t=ZS-9AyV8QRelhy',
  hero_headline: 'YOUR ACCOUNT, YOUR NEXT LEGEND.',
  hero_subheadline: 'Temukan akun Free Fire dan Mobile Legends impianmu. Transaksi mudah, pilihan beragam, dan pelayanan terpercaya.',
  banner_image: 'https://cdn.phototourl.com/member/2026-10-30-02dedc40-a038-485a-b58d-b5dafd448667.png',
  logo_image: 'https://cdn.phototourl.com/member/2026-10-30-4054384d-a11a-4dd2-ae74-75c675ee91d6.jpg',
};

export const DEFAULT_REKBER_FEES: RekberFee[] = [
  { id: 'tier-1', range_label: 'Rp1.000 – Rp50.000', fee_label: 'Rp3.000', sort_order: 1, is_active: true },
  { id: 'tier-2', range_label: 'Rp51.000 – Rp100.000', fee_label: 'Rp5.000', sort_order: 2, is_active: true },
  { id: 'tier-3', range_label: 'Rp101.000 – Rp200.000', fee_label: 'Rp10.000', sort_order: 3, is_active: true },
  { id: 'tier-4', range_label: 'Rp201.000 – Rp300.000', fee_label: 'Rp15.000', sort_order: 4, is_active: true },
  { id: 'tier-5', range_label: 'Rp301.000 – Rp500.000', fee_label: 'Rp20.000', sort_order: 5, is_active: true },
  { id: 'tier-6', range_label: 'Rp501.000 – Rp1.000.000++', fee_label: 'Rp25.000', sort_order: 6, is_active: true },
];

export const DEFAULT_GAME_SERVICES: GameService[] = [
  {
    id: 'game-ff',
    game: 'Free Fire',
    title: 'Free Fire (FF)',
    description: 'Temukan berbagai pilihan akun Free Fire dengan koleksi item dan skin menarik.',
    speciality_notes: 'Bantuan pengecekan vault, verifikasi single/double bind, panduan rebind akun Google/FB, dan konsultasi harga pasar akun FF.',
    highlights: ['Evo Gun Max', 'Old Season', 'SG2 Rapper'],
    banner_image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'game-ml',
    game: 'Mobile Legends',
    title: 'Mobile Legends (MLBB)',
    description: 'Cari akun Mobile Legends dengan koleksi hero, skin, dan berbagai pilihan menarik.',
    speciality_notes: 'Pengecekan Monsep (Moonton Sepaket), verifikasi all unbind, pergantian email primer Moonton, dan jaminan keamanan transaksi.',
    highlights: ['Skin Collector', 'KOF Series', 'Aspirants'],
    banner_image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    sort_order: 2,
    is_active: true,
  },
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana cara membeli akun?',
    answer: 'Anda cukup menghubungi admin Sinzxsturr melalui kontak resmi WhatsApp. Sampaikan kriteria akun Free Fire atau Mobile Legends yang Anda cari (budget, skin langka, rank, dsb.). Admin akan merekomendasikan pilihan akun yang sesuai, memverifikasi data bersama Anda, dan memandu transaksi secara langsung.',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'faq-2',
    question: 'Apakah tersedia akun FF dan ML?',
    answer: 'Ya, fokus utama spesialisasi kami adalah jual beli akun game Free Fire (FF) dan Mobile Legends (MLBB). Kami melayani berbagai kebutuhan, mulai dari akun tier budget/pelajar hingga akun sultan dengan skin langka seperti Evo Gun Max, Collector, KOF, Legend, dan season lawas.',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara mengetahui detail akun?',
    answer: 'Admin akan memberikan rincian lengkap mengenai akun yang Anda minati melalui chat WhatsApp, meliputi tangkapan layar (screenshot) profil, bukti lobi, inventori skin/vault, serta status pengaitan akun (bind Moonton, Google, FB) sebelum Anda mengambil keputusan.',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'faq-4',
    question: 'Apakah bisa bertanya sebelum membeli?',
    answer: 'Sangat bisa dan sangat dianjurkan. Kami siap melayani konsultasi gratis sebelum Anda bertransaksi, mulai dari cek perkiraan harga pasar, tips keamanan akun, hingga rekomendasi akun terbaik sesuai kebutuhan Anda.',
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'faq-5',
    question: 'Bagaimana proses serah terima akun?',
    answer: 'Setelah kesepakatan transaksi tercapai, admin akan memandu serah terima data login secara langsung. Admin akan mengawal proses rebind ke nomor/email pribadi Anda dan memastikan verifikasi dua langkah (2FA) aktif sampai akun sepenuhnya aman dalam genggaman Anda.',
    sort_order: 5,
    is_active: true,
  },
];
