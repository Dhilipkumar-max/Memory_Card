export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type CardTheme =
  | 'animals'
  | 'fruits'
  | 'shapes'
  | 'vehicles'
  | 'colors'
  | 'numbers'
  | 'alphabet'
  | 'ocean'
  | 'space'
  | 'farm';

export interface CardItem {
  id: string;
  uniqueId: string; // for React keys
  value: string;    // e.g., 'Dog', 'Apple'
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PlayerProfile {
  name: string;
  avatar: string; // e.g., 'bunny', 'bear', 'kitten', 'puppy', 'frog', 'fox'
  stars: number;
  coins: number;
  xp: number;
  unlockedThemes: CardTheme[];
  unlockedAvatars: string[];
  stickers: string[]; // Sticker IDs
}

export interface GameSettings {
  musicEnabled: boolean;
  soundEnabled: boolean;
  darkMode: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  animationSpeed: 'normal' | 'slow';
  voiceInstructionsEnabled: boolean;
  language: 'en' | 'es' | 'hi' | 'fr' | 'ta';
}

export interface GameStatistics {
  gamesPlayed: number;
  gamesWon: number;
  matchesFound: number;
  totalFlips: number;
  correctFlips: number;
  timePlayed: number; // in seconds
  currentStreak: number;
  longestStreak: number;
  starsCollected: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  icon: string;
}

export interface GameState {
  view: 'home' | 'difficulty-select' | 'theme-select' | 'playing' | 'paused' | 'end-screen' | 'stats' | 'achievements' | 'shop' | 'wheel' | 'avatar-select';
  difficulty: Difficulty;
  theme: CardTheme;
  isMultiplayer: boolean;
  players: {
    name: string;
    avatar: string;
    stars: number;
    score: number;
    matches: number;
  }[];
  currentPlayerIndex: number;
  isDailyChallenge: boolean;
}

export interface ShopItem {
  id: string;
  type: 'theme' | 'avatar' | 'sticker';
  name: string;
  cost: number;
  unlocked: boolean;
  value: string; // key value
}
