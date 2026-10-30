export type GameType = 'Free Fire' | 'Mobile Legends';

export interface GameServiceInfo {
  game: GameType;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  bannerImage: string;
  accentColor: string;
  badge: string;
}
