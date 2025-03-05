import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  txid?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'gameplay' | 'blockchain' | 'story' | 'special';
  secret?: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  order: number;
  requiredForProgress: boolean;
  image?: string;
}

interface GameStore {
  // Tutorial State
  tutorials: Tutorial[];
  currentTutorialId: string | null;
  tutorialEnabled: boolean;
  completedTutorials: string[];
  
  // Achievement State
  achievements: Achievement[];
  recentAchievements: string[];
  
  // Actions
  completeTutorial: (id: string) => void;
  skipTutorial: () => void;
  enableTutorial: () => void;
  unlockAchievement: (id: string, txid?: string) => void;
  clearRecentAchievements: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      // Initial Tutorial State
      tutorials: [
        {
          id: 'welcome',
          title: 'Welcome to DGE',
          content: 'Welcome to the Digital Government Efficiency agency. As a new agent, you\'ll help reform government agencies using blockchain technology.',
          completed: false,
          order: 1,
          requiredForProgress: true,
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
          id: 'blockchain-basics',
          title: 'Blockchain Basics',
          content: 'Every action you take is recorded on the Bitcoin SV blockchain, creating a permanent and transparent record.',
          completed: false,
          order: 2,
          requiredForProgress: true,
          image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
          id: 'milestones',
          title: 'Mission Milestones',
          content: 'Complete milestones to earn BSV rewards and advance through the game. Each milestone is cryptographically linked to form a chain.',
          completed: false,
          order: 3,
          requiredForProgress: true
        },
        {
          id: 'rewards',
          title: 'BSV Rewards',
          content: 'Earn real Bitcoin SV (BSV) for completing missions. Your rewards are sent directly to your wallet via blockchain transactions.',
          completed: false,
          order: 4,
          requiredForProgress: true
        },
        {
          id: 'interactive-content',
          title: 'Interactive Content',
          content: 'Each mission features interactive content like puzzles, simulations, and investigations. Complete these to progress through the game.',
          completed: false,
          order: 5,
          requiredForProgress: true
        },
        {
          id: 'blockchain-verification',
          title: 'Blockchain Verification',
          content: 'Your achievements are permanently recorded on the blockchain. Each completion creates a cryptographic hash linked to your previous accomplishments.',
          completed: false,
          order: 6,
          requiredForProgress: true
        },
        {
          id: 'mission-reports',
          title: 'Mission Reports',
          content: 'After completing a mission, review your mission report to see details about your performance and blockchain verification.',
          completed: false,
          order: 7,
          requiredForProgress: false
        },
        {
          id: 'achievements',
          title: 'Achievement System',
          content: 'Unlock achievements by completing special objectives. Each achievement is recorded on the blockchain as a verifiable credential.',
          completed: false,
          order: 8,
          requiredForProgress: false
        }
      ],
      currentTutorialId: 'welcome',
      tutorialEnabled: true,
      completedTutorials: [],
      
      // Initial Achievement State
      achievements: [
        // Gameplay Achievements
        {
          id: 'first-mission',
          title: 'First Steps',
          description: 'Complete your first DGE mission',
          icon: 'footprints',
          unlocked: false,
          rarity: 'common',
          category: 'gameplay'
        },
        {
          id: 'rising-star',
          title: 'Rising Star',
          description: 'Reach level 5 as a DGE agent',
          icon: 'star',
          unlocked: false,
          rarity: 'common',
          category: 'gameplay'
        },
        {
          id: 'veteran-agent',
          title: 'Veteran Agent',
          description: 'Complete 50 milestones',
          icon: 'badge',
          unlocked: false,
          rarity: 'rare',
          category: 'gameplay'
        },
        {
          id: 'master-agent',
          title: 'Master Agent',
          description: 'Reach the maximum level',
          icon: 'crown',
          unlocked: false,
          rarity: 'legendary',
          category: 'gameplay'
        },
        
        // Blockchain Achievements
        {
          id: 'blockchain-pioneer',
          title: 'Blockchain Pioneer',
          description: 'Record your first milestone on the blockchain',
          icon: 'database',
          unlocked: false,
          rarity: 'common',
          category: 'blockchain'
        },
        {
          id: 'chain-builder',
          title: 'Chain Builder',
          description: 'Create a chain of 10 consecutive verified milestones',
          icon: 'link',
          unlocked: false,
          rarity: 'rare',
          category: 'blockchain'
        },
        {
          id: 'crypto-millionaire',
          title: 'Crypto Millionaire',
          description: 'Accumulate 1,000,000 satoshis in rewards',
          icon: 'bitcoin',
          unlocked: false,
          rarity: 'epic',
          category: 'blockchain'
        },
        {
          id: 'blockchain-master',
          title: 'Blockchain Master',
          description: 'Complete all blockchain-related missions',
          icon: 'server',
          unlocked: false,
          rarity: 'legendary',
          category: 'blockchain'
        },
        
        // Story Achievements
        {
          id: 'efficiency-expert',
          title: 'Efficiency Expert',
          description: 'Complete all USPS reform missions',
          icon: 'mail',
          unlocked: false,
          rarity: 'rare',
          category: 'story'
        },
        {
          id: 'treasury-guardian',
          title: 'Treasury Guardian',
          description: 'Complete all Treasury Department missions',
          icon: 'landmark',
          unlocked: false,
          rarity: 'epic',
          category: 'story'
        },
        {
          id: 'fort-knox-hero',
          title: 'Fort Knox Hero',
          description: 'Prevent Goldfinger\'s attack on Fort Knox',
          icon: 'shield',
          unlocked: false,
          rarity: 'epic',
          category: 'story'
        },
        {
          id: 'goldfinger-nemesis',
          title: 'Goldfinger\'s Nemesis',
          description: 'Complete the final showdown with Goldfinger',
          icon: 'target',
          unlocked: false,
          rarity: 'legendary',
          category: 'story'
        },
        
        // Special Achievements
        {
          id: 'blockchain-advocate',
          title: 'Blockchain Advocate',
          description: 'Complete all National Blockchain Summit missions',
          icon: 'globe',
          unlocked: false,
          rarity: 'legendary',
          category: 'special'
        },
        {
          id: 'perfect-agent',
          title: 'Perfect Agent',
          description: 'Complete all missions without using hints',
          icon: 'award',
          unlocked: false,
          rarity: 'legendary',
          category: 'special',
          secret: true
        },
        {
          id: 'speed-runner',
          title: 'Speed Runner',
          description: 'Complete any mission chain in under 10 minutes',
          icon: 'timer',
          unlocked: false,
          rarity: 'epic',
          category: 'special',
          secret: true
        },
        {
          id: 'blockchain-scholar',
          title: 'Blockchain Scholar',
          description: 'Read all educational content in the game',
          icon: 'book',
          unlocked: false,
          rarity: 'rare',
          category: 'special'
        }
      ],
      recentAchievements: [],
      
      // Actions
      completeTutorial: (id: string) => set((state) => ({
        completedTutorials: [...state.completedTutorials, id],
        currentTutorialId: state.tutorials.find(t => 
          !state.completedTutorials.includes(t.id) && 
          t.order > (state.tutorials.find(ct => ct.id === id)?.order || 0)
        )?.id || null
      })),
      
      skipTutorial: () => set({ 
        tutorialEnabled: false,
        currentTutorialId: null,
        completedTutorials: []
      }),
      
      enableTutorial: () => set({ 
        tutorialEnabled: true,
        currentTutorialId: 'welcome',
        completedTutorials: []
      }),
      
      unlockAchievement: (id: string, txid?: string) => set((state) => {
        const achievement = state.achievements.find(a => a.id === id);
        if (!achievement || achievement.unlocked) return state;
        
        return {
          achievements: state.achievements.map(a => 
            a.id === id ? {
              ...a,
              unlocked: true,
              unlockedAt: new Date().toISOString(),
              txid
            } : a
          ),
          recentAchievements: [id, ...state.recentAchievements]
        };
      }),
      
      clearRecentAchievements: () => set({ recentAchievements: [] })
    }),
    {
      name: 'dge-game-storage'
    }
  )
);