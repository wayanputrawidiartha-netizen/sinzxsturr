import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeWhatsAppNumber,
  validateWhatsAppNumber,
  generateJasapostText,
  validateJasapostForm,
  buildAdminWhatsAppLink,
  ADMIN_PRIMARY_WA,
  ADMIN_SECONDARY_WA,
} from '../lib/jasapost.js';

test('normalizeWhatsAppNumber handles 08, +62, spaces and dashes', () => {
  assert.equal(normalizeWhatsAppNumber('08886199242'), '628886199242');
  assert.equal(normalizeWhatsAppNumber('+62 888-6199-242'), '628886199242');
  assert.equal(normalizeWhatsAppNumber('8886199242'), '628886199242');
  assert.equal(normalizeWhatsAppNumber('628886199242'), '628886199242');
});

test('validateWhatsAppNumber validates valid and invalid numbers', () => {
  const valid = validateWhatsAppNumber('081234567890');
  assert.equal(valid.isValid, true);
  assert.equal(valid.normalized, '6281234567890');

  const empty = validateWhatsAppNumber('');
  assert.equal(empty.isValid, false);

  const tooShort = validateWhatsAppNumber('0812');
  assert.equal(tooShort.isValid, false);
});

test('generateJasapostText generates exact template output', () => {
  const input = {
    sellerWhatsapp: '081234567890',
    accountName: 'Free Fire Old Vault S1',
    specs: 'SG 2 Terompet, Bundle Sakura, Scar Titan Max',
    loginInfo: 'Single Log FB Siap Kait',
    bindInfo: 'Google Kosong, No HP Off',
    price: 'Rp 1.500.000 (Nego Tipis)',
  };

  const output = generateJasapostText(input);

  // Check critical markers
  assert.ok(output.includes('*FORMAT JASAPOST SINZX STORE*'));
  assert.ok(output.includes('*REG BALI*🇮🇩'));
  assert.ok(output.includes('(*format jasapost jual akun*)'));
  assert.ok(output.includes('wa.me/6281234567890'));
  assert.ok(output.includes('(*bukan akun admin*)'));
  assert.ok(output.includes('AKUN : Free Fire Old Vault S1'));
  assert.ok(output.includes('SPEK : SG 2 Terompet, Bundle Sakura, Scar Titan Max'));
  assert.ok(output.includes('LOG : Single Log FB Siap Kait'));
  assert.ok(output.includes('BIND : Google Kosong, No HP Off'));
  assert.ok(output.includes('HARGA : Rp 1.500.000 (Nego Tipis)'));
  assert.ok(output.includes('MC : SINZX STR'));
  assert.ok(output.includes('*NOTE*‼️'));
  assert.ok(output.includes('*WAJIB MENGGUNAKAN JASA ADMIN SINZX STORE AGAR TERHINDAR DARI PENIPUAN*'));
  assert.ok(output.includes(`wa.me/+${ADMIN_PRIMARY_WA}`));
  assert.ok(output.includes(`wa.me/${ADMIN_SECONDARY_WA}`));
});

test('validateJasapostForm catches empty fields', () => {
  const incomplete = {
    sellerWhatsapp: '',
    accountName: '',
    specs: '',
    loginInfo: '',
    bindInfo: '',
    price: '',
  };

  const result = validateJasapostForm(incomplete);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.sellerWhatsapp);
  assert.ok(result.errors.accountName);
  assert.ok(result.errors.specs);
  assert.ok(result.errors.loginInfo);
  assert.ok(result.errors.bindInfo);
  assert.ok(result.errors.price);
});

test('buildAdminWhatsAppLink correctly encodes parameters', () => {
  const link = buildAdminWhatsAppLink('Hello Admin');
  assert.ok(link.startsWith('https://wa.me/628886199242?text=Hello%20Admin'));
});
