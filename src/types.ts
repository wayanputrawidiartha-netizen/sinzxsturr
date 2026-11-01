export type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  created_at?: string;
}

export interface WebsiteSettings {
  id: string;
  brand_name: string;
  whatsapp_number: string;
  whatsapp_channel_url: string;
  tiktok_url: string;
  hero_headline: string;
  hero_subheadline: string;
  banner_image: string;
  logo_image: string;
  updated_at?: string;
}

export interface RekberFee {
  id: string;
  range_label: string;
  fee_label: string;
  sort_order: number;
  is_active: boolean;
  updated_at?: string;
}

export interface GameService {
  id: string;
  game: string;
  title: string;
  description: string;
  speciality_notes?: string;
  highlights: string[];
  banner_image?: string;
  sort_order: number;
  is_active: boolean;
  updated_at?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  updated_at?: string;
}

export interface WebsiteDataState {
  settings: WebsiteSettings;
  rekberFees: RekberFee[];
  gameServices: GameService[];
  faqs: FaqItem[];
  loading: boolean;
  error?: string | null;
}
