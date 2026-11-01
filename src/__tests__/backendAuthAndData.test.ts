import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  DEFAULT_SETTINGS,
  DEFAULT_REKBER_FEES,
  DEFAULT_GAME_SERVICES,
  DEFAULT_FAQS,
} from '../../netlify/functions/utils/defaultData';
import { isSupabaseConfigured } from '../lib/supabase';

describe('Backend Data & Supabase Config', () => {
  it('DEFAULT_SETTINGS should contain official brand data', () => {
    assert.strictEqual(DEFAULT_SETTINGS.brand_name, 'SINZXR JB STORE');
    assert.strictEqual(DEFAULT_SETTINGS.whatsapp_number, '628886199242');
    assert.ok(DEFAULT_SETTINGS.whatsapp_channel_url.includes('0029VbDMDVbGufJ1AZ3tmq0D'));
  });

  it('DEFAULT_REKBER_FEES contains 6 transparent tiers', () => {
    assert.strictEqual(DEFAULT_REKBER_FEES.length, 6);
    assert.strictEqual(DEFAULT_REKBER_FEES[0].fee_label, 'Rp3.000');
    assert.strictEqual(DEFAULT_REKBER_FEES[5].fee_label, 'Rp25.000');
  });

  it('DEFAULT_GAME_SERVICES covers both Free Fire and Mobile Legends', () => {
    assert.strictEqual(DEFAULT_GAME_SERVICES.length, 2);
    const games = DEFAULT_GAME_SERVICES.map(g => g.game);
    assert.ok(games.includes('Free Fire'));
    assert.ok(games.includes('Mobile Legends'));
  });

  it('DEFAULT_FAQS contains required FAQs', () => {
    assert.ok(DEFAULT_FAQS.length >= 5);
    const questions = DEFAULT_FAQS.map(f => f.question);
    assert.ok(questions.some(q => q.includes('cara membeli akun')));
    assert.ok(questions.some(q => q.includes('FF dan ML')));
  });
});
