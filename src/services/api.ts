import { WebsiteSettings, RekberFee, GameService, FaqItem } from '../types';
import { DEFAULT_SETTINGS, DEFAULT_REKBER_FEES, DEFAULT_GAME_SERVICES, DEFAULT_FAQS } from '../../netlify/functions/utils/defaultData';

const BASE_API_URL = '/api';

export interface WebsiteDataBundle {
  settings: WebsiteSettings;
  rekberFees: RekberFee[];
  gameServices: GameService[];
  faqs: FaqItem[];
}

/**
 * Fetch all public website content from backend API (or Supabase via API)
 */
export async function getWebsiteData(): Promise<WebsiteDataBundle> {
  try {
    const [settingsRes, feesRes, servicesRes, faqsRes] = await Promise.allSettled([
      fetch(`${BASE_API_URL}/settings`),
      fetch(`${BASE_API_URL}/rekber-fees`),
      fetch(`${BASE_API_URL}/game-services`),
      fetch(`${BASE_API_URL}/faqs`),
    ]);

    const settingsData = settingsRes.status === 'fulfilled' && settingsRes.value.ok
      ? (await settingsRes.value.json()).data
      : null;

    const feesData = feesRes.status === 'fulfilled' && feesRes.value.ok
      ? (await feesRes.value.json()).data
      : null;

    const servicesData = servicesRes.status === 'fulfilled' && servicesRes.value.ok
      ? (await servicesRes.value.json()).data
      : null;

    const faqsData = faqsRes.status === 'fulfilled' && faqsRes.value.ok
      ? (await faqsRes.value.json()).data
      : null;

    return {
      settings: settingsData || DEFAULT_SETTINGS,
      rekberFees: Array.isArray(feesData) && feesData.length > 0 ? feesData : DEFAULT_REKBER_FEES,
      gameServices: Array.isArray(servicesData) && servicesData.length > 0 ? servicesData : DEFAULT_GAME_SERVICES,
      faqs: Array.isArray(faqsData) && faqsData.length > 0 ? faqsData : DEFAULT_FAQS,
    };
  } catch (error) {
    console.warn('Using default fallback data due to fetch error:', error);
    return {
      settings: DEFAULT_SETTINGS,
      rekberFees: DEFAULT_REKBER_FEES,
      gameServices: DEFAULT_GAME_SERVICES,
      faqs: DEFAULT_FAQS,
    };
  }
}

/**
 * Verify admin token on backend server
 */
export async function verifyServerAdmin(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/admin-verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return false;
    const body = await res.json();
    return body.authenticated === true;
  } catch {
    return false;
  }
}

/**
 * Update general website settings (Admin only)
 */
export async function updateSettings(
  settings: Partial<WebsiteSettings>,
  token: string
): Promise<{ success: boolean; data?: WebsiteSettings; error?: string }> {
  try {
    const res = await fetch(`${BASE_API_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });

    const json = await res.json();
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || 'Gagal menyimpan pengaturan.' };
  }
}

/**
 * Create or update rekber fee tier (Admin only)
 */
export async function saveRekberFee(
  tier: RekberFee,
  isNew: boolean,
  token: string
): Promise<{ success: boolean; data?: RekberFee; error?: string }> {
  try {
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(`${BASE_API_URL}/rekber-fees`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tier),
    });

    const json = await res.json();
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || 'Gagal menyimpan tarif.' };
  }
}

/**
 * Delete rekber fee tier (Admin only)
 */
export async function deleteRekberFee(
  id: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${BASE_API_URL}/rekber-fees`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const json = await res.json();
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || 'Gagal menghapus tarif.' };
  }
}

/**
 * Save FAQ (Admin only)
 */
export async function saveFaq(
  faq: FaqItem,
  isNew: boolean,
  token: string
): Promise<{ success: boolean; data?: FaqItem; error?: string }> {
  try {
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(`${BASE_API_URL}/faqs`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(faq),
    });

    const json = await res.json();
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || 'Gagal menyimpan FAQ.' };
  }
}

/**
 * Delete FAQ (Admin only)
 */
export async function deleteFaq(
  id: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${BASE_API_URL}/faqs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const json = await res.json();
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || 'Gagal menghapus FAQ.' };
  }
}

/**
 * Update Game Service details (Admin only)
 */
export async function updateGameService(
  service: GameService,
  token: string
): Promise<{ success: boolean; data?: GameService; error?: string }> {
  try {
    const res = await fetch(`${BASE_API_URL}/game-services`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(service),
    });

    const json = await res.json();
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || 'Gagal mengupdate layanan game.' };
  }
}
