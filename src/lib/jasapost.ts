export interface JasapostFormData {
  sellerWhatsapp: string;
  accountName: string;
  specs: string;
  loginInfo: string;
  bindInfo: string;
  price: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof JasapostFormData | 'image', string>>;
  normalizedPhone?: string;
}

export const ADMIN_PRIMARY_WA = '628886199242';
export const ADMIN_SECONDARY_WA = '+6287720938486';
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Normalizes user-entered WhatsApp number to Indonesian standard format (628...)
 */
export function normalizeWhatsAppNumber(raw: string): string {
  if (!raw) return '';
  // Remove non-digit characters except leading plus if any
  let cleaned = raw.trim().replace(/[^\d+]/g, '');

  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }

  // If starts with 08..., convert to 628...
  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    // If starts with 8..., convert to 628...
    cleaned = '62' + cleaned;
  }

  return cleaned;
}

/**
 * Validates WhatsApp number format
 */
export function validateWhatsAppNumber(raw: string): { isValid: boolean; normalized: string; error?: string } {
  const normalized = normalizeWhatsAppNumber(raw);
  if (!normalized) {
    return { isValid: false, normalized: '', error: 'Nomor WhatsApp wajib diisi' };
  }

  // Indonesian WhatsApp numbers: usually start with 628 and have 10-15 digits total
  const waRegex = /^628[1-9][0-9]{7,12}$/;
  if (!waRegex.test(normalized)) {
    return {
      isValid: false,
      normalized,
      error: 'Format nomor WhatsApp tidak valid. Gunakan format contoh: 628xxxxxxxxxx',
    };
  }

  return { isValid: true, normalized };
}

/**
 * Validates spec screenshot image
 */
export function validateJasapostFile(file: File | null | undefined): { isValid: boolean; error?: string } {
  if (!file) {
    return { isValid: true }; // File is optional or verified separately
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return {
      isValid: false,
      error: 'Format file tidak didukung. Harap gunakan format JPG, JPEG, PNG, atau WEBP.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `Ukuran file terlalu besar (${sizeInMB} MB). Maksimal ukuran file adalah 5 MB.`,
    };
  }

  return { isValid: true };
}

/**
 * Generates exact WhatsApp format required by SINZX STORE
 */
export function generateJasapostText(data: JasapostFormData): string {
  const phone = normalizeWhatsAppNumber(data.sellerWhatsapp) || data.sellerWhatsapp.trim();

  return `*FORMAT JASAPOST SINZX STORE*
*REG BALI*🇮🇩

(*format jasapost jual akun*)

wa.me/${phone}

(*bukan akun admin*)

AKUN : ${data.accountName.trim()}
SPEK : ${data.specs.trim()}
LOG : ${data.loginInfo.trim()}
BIND : ${data.bindInfo.trim()}
HARGA : ${data.price.trim()}
MC : SINZX STR

*NOTE*‼️
*WAJIB MENGGUNAKAN JASA ADMIN SINZX STORE AGAR TERHINDAR DARI PENIPUAN*

*WA ADMIN SINZX*:
wa.me/+628886199242
wa.me/+6287720938486`;
}

/**
 * Comprehensive form validation
 */
export function validateJasapostForm(data: JasapostFormData, file?: File | null): ValidationResult {
  const errors: Partial<Record<keyof JasapostFormData | 'image', string>> = {};

  const phoneValidation = validateWhatsAppNumber(data.sellerWhatsapp);
  if (!phoneValidation.isValid) {
    errors.sellerWhatsapp = phoneValidation.error;
  }

  if (!data.accountName || !data.accountName.trim()) {
    errors.accountName = 'Nama / jenis akun wajib diisi';
  }

  if (!data.specs || !data.specs.trim()) {
    errors.specs = 'Spesifikasi akun wajib diisi';
  }

  if (!data.loginInfo || !data.loginInfo.trim()) {
    errors.loginInfo = 'Informasi login (LOG) wajib diisi';
  }

  if (!data.bindInfo || !data.bindInfo.trim()) {
    errors.bindInfo = 'Informasi bind akun wajib diisi';
  }

  if (!data.price || !data.price.trim()) {
    errors.price = 'Harga akun wajib diisi';
  }

  if (file) {
    const fileValidation = validateJasapostFile(file);
    if (!fileValidation.isValid) {
      errors.image = fileValidation.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone: phoneValidation.normalized,
  };
}

/**
 * Generates direct wa.me link with pre-filled encoded text for admin
 */
export function buildAdminWhatsAppLink(text: string, adminPhone: string = ADMIN_PRIMARY_WA): string {
  const cleanAdmin = normalizeWhatsAppNumber(adminPhone) || ADMIN_PRIMARY_WA;
  return `https://wa.me/${cleanAdmin}?text=${encodeURIComponent(text)}`;
}
