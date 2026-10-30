import test from 'node:test';
import assert from 'node:assert/strict';
import { REKBER_FEE_TIERS } from './rekberFees';

test('REKBER_FEE_TIERS contains exactly 6 tiers with correct ranges and fees', () => {
  assert.equal(REKBER_FEE_TIERS.length, 6);

  assert.equal(REKBER_FEE_TIERS[0].range, 'Rp1.000 – Rp50.000');
  assert.equal(REKBER_FEE_TIERS[0].fee, 'Rp3.000');

  assert.equal(REKBER_FEE_TIERS[1].range, 'Rp51.000 – Rp100.000');
  assert.equal(REKBER_FEE_TIERS[1].fee, 'Rp5.000');

  assert.equal(REKBER_FEE_TIERS[2].range, 'Rp101.000 – Rp200.000');
  assert.equal(REKBER_FEE_TIERS[2].fee, 'Rp10.000');

  assert.equal(REKBER_FEE_TIERS[3].range, 'Rp201.000 – Rp300.000');
  assert.equal(REKBER_FEE_TIERS[3].fee, 'Rp15.000');

  assert.equal(REKBER_FEE_TIERS[4].range, 'Rp301.000 – Rp500.000');
  assert.equal(REKBER_FEE_TIERS[4].fee, 'Rp20.000');

  assert.equal(REKBER_FEE_TIERS[5].range, 'Rp501.000 – Rp1.000.000++');
  assert.equal(REKBER_FEE_TIERS[5].fee, 'Rp25.000');
});
