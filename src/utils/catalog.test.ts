import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPhoneDisplay, createConsultationLink, OFFICIAL_PHONE, WHATSAPP_CHANNEL_URL } from './catalog';

test('formatPhoneDisplay formats phone number correctly', () => {
  assert.equal(formatPhoneDisplay('628886199242'), '+62 888-6199-242');
  assert.equal(formatPhoneDisplay(''), '');
});

test('createConsultationLink creates inquiry for buying an account', () => {
  const link = createConsultationLink('Free Fire', 'beli', 'Cari budget pelajar');
  assert.ok(link.startsWith(`https://wa.me/${OFFICIAL_PHONE}?text=`));
  assert.ok(link.includes(encodeURIComponent('Free Fire')));
  assert.ok(link.includes(encodeURIComponent('Cari budget pelajar')));
});

test('createConsultationLink creates inquiry for selling an account', () => {
  const link = createConsultationLink('Mobile Legends', 'jual', 'Akun pribadi tier Glory');
  assert.ok(link.startsWith(`https://wa.me/${OFFICIAL_PHONE}?text=`));
  assert.ok(link.includes(encodeURIComponent('titip jual / menawarkan')));
  assert.ok(link.includes(encodeURIComponent('Mobile Legends')));
});

test('createConsultationLink defaults to general consultation if no params', () => {
  const link = createConsultationLink();
  assert.ok(link.startsWith(`https://wa.me/${OFFICIAL_PHONE}?text=`));
  assert.ok(link.includes(encodeURIComponent('konsultasi seputar jasa jual beli')));
});

test('WHATSAPP_CHANNEL_URL matches official Sinzxsturr channel', () => {
  assert.equal(WHATSAPP_CHANNEL_URL, 'https://whatsapp.com/channel/0029VbDMDVbGufJ1AZ3tmq0D');
});
