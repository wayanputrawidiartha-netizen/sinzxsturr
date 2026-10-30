export const OFFICIAL_PHONE = '628886199242';
export const WHATSAPP_BASE_URL = 'https://wa.me/628886199242';
export const TIKTOK_URL = 'https://www.tiktok.com/@sinzxstr.jb?_r=1&_t=ZS-9AyV8QRelhy';

/**
 * Format raw phone number to readable display string (+62 888-6199-242)
 */
export function formatPhoneDisplay(phone: string): string {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '');
  if (clean.startsWith('62') && clean.length >= 11) {
    return `+62 ${clean.slice(2, 5)}-${clean.slice(5, 9)}-${clean.slice(9)}`;
  }
  return phone;
}

/**
 * Generate customized WhatsApp link for business consultation inquiry
 */
export function createConsultationLink(
  game?: string,
  needType?: 'beli' | 'jual' | 'konsultasi',
  customNote?: string
): string {
  let message = 'Halo Admin Sinzxsturr (SINZXR JB STORE),\n\n';

  if (needType === 'jual') {
    message += `Saya ingin titip jual / menawarkan akun ${game || 'game'} saya.`;
  } else if (needType === 'beli') {
    message += `Saya mencari rekomendasi akun ${game || 'Free Fire / Mobile Legends'}.`;
  } else {
    message += `Saya ingin konsultasi seputar jasa jual beli akun ${game || 'Free Fire & Mobile Legends'}.`;
  }

  if (customNote && customNote.trim()) {
    message += `\nKeterangan: ${customNote.trim()}`;
  }

  message += '\n\nMohon info dan panduannya min. Terima kasih!';

  return `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(message)}`;
}
