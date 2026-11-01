-- ==============================================================================
-- SINZXR JB STORE - SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Jalankan skrip SQL ini di Dashboard Supabase -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. TABEL PROFILES (Role Management: 'admin' vs 'user')
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'user',
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TABEL WEBSITE SETTINGS (Pengaturan Informasi Utama Website)
CREATE TABLE IF NOT EXISTS public.website_settings (
  id TEXT PRIMARY KEY DEFAULT 'general',
  brand_name TEXT NOT NULL DEFAULT 'SINZXR JB STORE',
  whatsapp_number TEXT NOT NULL DEFAULT '628886199242',
  whatsapp_channel_url TEXT NOT NULL DEFAULT 'https://whatsapp.com/channel/0029VbDMDVbGufJ1AZ3tmq0D',
  tiktok_url TEXT NOT NULL DEFAULT 'https://www.tiktok.com/@sinzxstr.jb?_r=1&_t=ZS-9AyV8QRelhy',
  hero_headline TEXT NOT NULL DEFAULT 'YOUR ACCOUNT, YOUR NEXT LEGEND.',
  hero_subheadline TEXT NOT NULL DEFAULT 'Temukan akun Free Fire dan Mobile Legends impianmu. Transaksi mudah, pilihan beragam, dan pelayanan terpercaya.',
  banner_image TEXT NOT NULL DEFAULT 'https://cdn.phototourl.com/member/2026-10-30-02dedc40-a038-485a-b58d-b5dafd448667.png',
  logo_image TEXT NOT NULL DEFAULT 'https://cdn.phototourl.com/member/2026-10-30-4054384d-a11a-4dd2-ae74-75c675ee91d6.jpg',
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABEL REKBER FEES (Tarif Biaya Rekber & Middleman)
CREATE TABLE IF NOT EXISTS public.rekber_fees (
  id TEXT PRIMARY KEY,
  range_label TEXT NOT NULL,
  fee_label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABEL GAME SERVICES (Layanan Game FF & MLBB)
CREATE TABLE IF NOT EXISTS public.game_services (
  id TEXT PRIMARY KEY,
  game TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  speciality_notes TEXT,
  highlights TEXT[] DEFAULT '{}',
  banner_image TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. TABEL FAQS (Pertanyaan Umum)
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Aktifkan RLS pada seluruh tabel
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rekber_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Helper function: Memeriksa apakah user saat ini adalah admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Kebijakan RLS untuk PROFILES
DROP POLICY IF EXISTS "Public can view own profile or admins view all" ON public.profiles;
CREATE POLICY "Public can view own profile or admins view all"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_admin());

-- Kebijakan RLS untuk WEBSITE_SETTINGS
-- Siapapun dapat membaca (SELECT) pengaturan website untuk ditampilkan di landing page
DROP POLICY IF EXISTS "Public can read website settings" ON public.website_settings;
CREATE POLICY "Public can read website settings"
  ON public.website_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Hanya admin yang dapat mengubah (INSERT/UPDATE/DELETE) pengaturan website
DROP POLICY IF EXISTS "Only admin can modify website settings" ON public.website_settings;
CREATE POLICY "Only admin can modify website settings"
  ON public.website_settings FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Kebijakan RLS untuk REKBER_FEES
DROP POLICY IF EXISTS "Public can read active rekber fees" ON public.rekber_fees;
CREATE POLICY "Public can read active rekber fees"
  ON public.rekber_fees FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Only admin can modify rekber fees" ON public.rekber_fees;
CREATE POLICY "Only admin can modify rekber fees"
  ON public.rekber_fees FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Kebijakan RLS untuk GAME_SERVICES
DROP POLICY IF EXISTS "Public can read game services" ON public.game_services;
CREATE POLICY "Public can read game services"
  ON public.game_services FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Only admin can modify game services" ON public.game_services;
CREATE POLICY "Only admin can modify game services"
  ON public.game_services FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Kebijakan RLS untuk FAQS
DROP POLICY IF EXISTS "Public can read faqs" ON public.faqs;
CREATE POLICY "Public can read faqs"
  ON public.faqs FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Only admin can modify faqs" ON public.faqs;
CREATE POLICY "Only admin can modify faqs"
  ON public.faqs FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==============================================================================
-- TRIGGER OTOMATIS: Buat Profile Baru Saat Pendaftaran Supabase Auth
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    -- Jika pendaftar pertama atau email tertentu, jadikan admin, selain itu 'user'
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- SEED DATA AWAL (Default Website Data)
-- ==============================================================================

-- 1. Website Settings
INSERT INTO public.website_settings (id, brand_name, whatsapp_number, whatsapp_channel_url, tiktok_url, hero_headline, hero_subheadline)
VALUES (
  'general',
  'SINZXR JB STORE',
  '628886199242',
  'https://whatsapp.com/channel/0029VbDMDVbGufJ1AZ3tmq0D',
  'https://www.tiktok.com/@sinzxstr.jb?_r=1&_t=ZS-9AyV8QRelhy',
  'YOUR ACCOUNT, YOUR NEXT LEGEND.',
  'Temukan akun Free Fire dan Mobile Legends impianmu. Transaksi mudah, pilihan beragam, dan pelayanan terpercaya.'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Rekber Fees
INSERT INTO public.rekber_fees (id, range_label, fee_label, sort_order, is_active)
VALUES
  ('tier-1', 'Rp1.000 – Rp50.000', 'Rp3.000', 1, true),
  ('tier-2', 'Rp51.000 – Rp100.000', 'Rp5.000', 2, true),
  ('tier-3', 'Rp101.000 – Rp200.000', 'Rp10.000', 3, true),
  ('tier-4', 'Rp201.000 – Rp300.000', 'Rp15.000', 4, true),
  ('tier-5', 'Rp301.000 – Rp500.000', 'Rp20.000', 5, true),
  ('tier-6', 'Rp501.000 – Rp1.000.000++', 'Rp25.000', 6, true)
ON CONFLICT (id) DO NOTHING;

-- 3. Game Services
INSERT INTO public.game_services (id, game, title, description, speciality_notes, highlights, banner_image, sort_order, is_active)
VALUES
  (
    'game-ff',
    'Free Fire',
    'Free Fire (FF)',
    'Temukan berbagai pilihan akun Free Fire dengan koleksi item dan skin menarik.',
    'Bantuan pengecekan vault, verifikasi single/double bind, panduan rebind akun Google/FB, dan konsultasi harga pasar akun FF.',
    ARRAY['Evo Gun Max', 'Old Season', 'SG2 Rapper'],
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    1,
    true
  ),
  (
    'game-ml',
    'Mobile Legends',
    'Mobile Legends (MLBB)',
    'Cari akun Mobile Legends dengan koleksi hero, skin, dan berbagai pilihan menarik.',
    'Pengecekan Monsep (Moonton Sepaket), verifikasi all unbind, pergantian email primer Moonton, dan jaminan keamanan transaksi.',
    ARRAY['Skin Collector', 'KOF Series', 'Aspirants'],
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    2,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- 4. FAQs
INSERT INTO public.faqs (id, question, answer, sort_order, is_active)
VALUES
  (
    'faq-1',
    'Bagaimana cara membeli akun?',
    'Anda cukup menghubungi admin Sinzxsturr melalui kontak resmi WhatsApp. Sampaikan kriteria akun Free Fire atau Mobile Legends yang Anda cari (budget, skin langka, rank, dsb.). Admin akan merekomendasikan pilihan akun yang sesuai, memverifikasi data bersama Anda, dan memandu transaksi secara langsung.',
    1,
    true
  ),
  (
    'faq-2',
    'Apakah tersedia akun FF dan ML?',
    'Ya, fokus utama spesialisasi kami adalah jual beli akun game Free Fire (FF) dan Mobile Legends (MLBB). Kami melayani berbagai kebutuhan, mulai dari akun tier budget/pelajar hingga akun sultan dengan skin langka seperti Evo Gun Max, Collector, KOF, Legend, dan season lawas.',
    2,
    true
  ),
  (
    'faq-3',
    'Bagaimana cara mengetahui detail akun?',
    'Admin akan memberikan rincian lengkap mengenai akun yang Anda minati melalui chat WhatsApp, meliputi tangkapan layar (screenshot) profil, bukti lobi, inventori skin/vault, serta status pengaitan akun (bind Moonton, Google, FB) sebelum Anda mengambil keputusan.',
    3,
    true
  ),
  (
    'faq-4',
    'Apakah bisa bertanya sebelum membeli?',
    'Sangat bisa dan sangat dianjurkan. Kami siap melayani konsultasi gratis sebelum Anda bertransaksi, mulai dari cek perkiraan harga pasar, tips keamanan akun, hingga rekomendasi akun terbaik sesuai kebutuhan Anda.',
    4,
    true
  ),
  (
    'faq-5',
    'Bagaimana proses serah terima akun?',
    'Setelah kesepakatan transaksi tercapai, admin akan memandu serah terima data login secara langsung. Admin akan mengawal proses rebind ke nomor/email pribadi Anda dan memastikan verifikasi dua langkah (2FA) aktif sampai akun sepenuhnya aman dalam genggaman Anda.',
    5,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- CARA MENGANGKAT USER MENJADI ADMIN:
-- Ganti 'admin@sinzxsturr.com' dengan email yang Anda gunakan saat register di /admin:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@sinzxsturr.com';
-- ==============================================================================
