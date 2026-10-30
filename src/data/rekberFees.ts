export interface RekberFeeTier {
  id: string;
  range: string;
  fee: string;
  popular?: boolean;
}

export const REKBER_FEE_TIERS: RekberFeeTier[] = [
  {
    id: 'tier-1',
    range: 'Rp1.000 – Rp50.000',
    fee: 'Rp3.000',
  },
  {
    id: 'tier-2',
    range: 'Rp51.000 – Rp100.000',
    fee: 'Rp5.000',
  },
  {
    id: 'tier-3',
    range: 'Rp101.000 – Rp200.000',
    fee: 'Rp10.000',
  },
  {
    id: 'tier-4',
    range: 'Rp201.000 – Rp300.000',
    fee: 'Rp15.000',
  },
  {
    id: 'tier-5',
    range: 'Rp301.000 – Rp500.000',
    fee: 'Rp20.000',
    popular: true,
  },
  {
    id: 'tier-6',
    range: 'Rp501.000 – Rp1.000.000++',
    fee: 'Rp25.000',
  },
];
