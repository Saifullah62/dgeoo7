// Ensure all types are properly defined
export interface DemoTransaction {
  txid: string;
  type: 'milestone' | 'reward' | 'badge';
  status: 'pending' | 'confirming' | 'confirmed';
  amount?: number;
  timestamp: string;
}

export interface DemoConfig {
  enabled: boolean;
  wif: string;
  address: string;
  balance: number;
  unlockedMissions: string[];
  completedMilestones: string[];
  transactions: string[];
  pendingTransactions: DemoTransaction[];
  timestamps: Record<string, string>;
  hashes: Record<string, string>;
  currentChainId?: string;
  currentMilestoneId?: string;
}

export interface InteractiveContent {
  type: 'quiz' | 'simulation' | 'puzzle' | 'dossier' | 'investigation' | 'data-analysis' | 'security-challenge' | 'intelligence-report' | 'security-audit' | 'implementation' | 'mission';
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  scenario?: string;
  steps?: string[];
  outcome?: string;
  discovery?: string;
  securityLayers?: string[];
  challenge?: string;
  instructions?: string;
  hint?: string;
  solution?: string;
  evidence?: Array<{ type: string; name: string; content: string; }>;
  revelation?: string;
  dataset?: string;
  anomalies?: string[];
  conclusion?: string;
  subject?: string;
  details?: Array<{ label: string; value: string; classified?: boolean; }>;
  briefing?: string;
  objectives?: string[];
  climax?: string;
  features?: string[];
  test?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  type: 'agency' | 'story';
  agency?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert' | 'legendary';
  reward: number;
  completed: boolean;
  hash?: string;
  txid?: string;
  timestamp?: string;
  previousHash?: string;
  interactiveContent?: InteractiveContent;
}

export interface MilestoneChain {
  id: string;
  title: string;
  description: string;
  milestones: Milestone[];
  completed: boolean;
  unlocked: boolean;
  backgroundImage?: string;
}

export interface GameState {
  playerAddress: string;
  playerName: string | null;
  level: number;
  xp: number;
  balance: number;
  currentChainId: string | null;
  currentMilestoneId: string | null;
  chains: MilestoneChain[];
  badges: string[];
  transactions: string[];
}

export interface PlayerProfile {
  address: string;
  username: string | null;
  isRegistered: boolean;
  balance: number;
  level: number;
  xp: number;
  badges: string[];
  milestoneHashes: Record<string, string>;
  transactions: string[];
}