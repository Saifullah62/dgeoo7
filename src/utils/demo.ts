import { DemoConfig, DemoTransaction } from '../types/game';
import { toast } from 'sonner';
import SHA256 from 'crypto-js/sha256';

// Demo mode configuration
const DEMO_MODE_KEY = 'dge_demo_mode';

// Get demo mode state from localStorage with error handling
export const getDemoMode = (): DemoConfig => {
  try {
    const stored = localStorage.getItem(DEMO_MODE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure all required fields exist
      return {
        enabled: Boolean(parsed.enabled),
        wif: String(parsed.wif || ''),
        address: String(parsed.address || ''),
        balance: Number(parsed.balance || 0),
        unlockedMissions: Array.isArray(parsed.unlockedMissions) ? parsed.unlockedMissions : [
          'dge-training',
          'national-blockchain-summit'
        ],
        completedMilestones: Array.isArray(parsed.completedMilestones) ? parsed.completedMilestones : [],
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
        pendingTransactions: Array.isArray(parsed.pendingTransactions) ? parsed.pendingTransactions : [],
        timestamps: typeof parsed.timestamps === 'object' ? parsed.timestamps : {},
        hashes: typeof parsed.hashes === 'object' ? parsed.hashes : {},
        currentChainId: parsed.currentChainId || 'dge-training',
        currentMilestoneId: parsed.currentMilestoneId || 'dge-training-1'
      };
    }
  } catch (error) {
    console.error('Error loading demo mode:', error);
    toast.error('Error loading demo mode settings');
  }

  // Return default config if loading fails
  return {
    enabled: false,
    wif: '',
    address: '',
    balance: 0,
    unlockedMissions: [
      'dge-training',
      'national-blockchain-summit'
    ],
    completedMilestones: [],
    transactions: [],
    pendingTransactions: [],
    timestamps: {},
    hashes: {},
    currentChainId: 'dge-training',
    currentMilestoneId: 'dge-training-1'
  };
};

// Save demo mode state to localStorage with error handling
export const saveDemoMode = (config: DemoConfig): void => {
  try {
    localStorage.setItem(DEMO_MODE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving demo mode:', error);
    toast.error('Error saving demo mode settings');
  }
};

// Enable demo mode
export const enableDemoMode = async (): Promise<DemoConfig> => {
  try {
    const config: DemoConfig = {
      enabled: true,
      wif: `demo_${Date.now().toString(36)}`,
      address: `demo_${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`,
      balance: 100000,
      unlockedMissions: [
        'dge-training',
        'national-blockchain-summit'
      ],
      completedMilestones: [],
      transactions: [],
      pendingTransactions: [],
      timestamps: {},
      hashes: {},
      currentChainId: 'dge-training',
      currentMilestoneId: 'dge-training-1'
    };
    
    saveDemoMode(config);
    toast.success('Demo Mode Enabled', {
      description: 'Training and Summit missions unlocked! Complete them to unlock more.'
    });
    
    return config;
  } catch (error) {
    console.error('Error enabling demo mode:', error);
    toast.error('Failed to enable demo mode');
    throw error;
  }
};

// Disable demo mode
export const disableDemoMode = (): void => {
  try {
    localStorage.removeItem(DEMO_MODE_KEY);
    toast.success('Demo Mode Disabled', {
      description: 'Switched to real blockchain mode'
    });
  } catch (error) {
    console.error('Error disabling demo mode:', error);
    toast.error('Error disabling demo mode');
  }
};

// Update demo balance with validation
export const updateDemoBalance = (amount: number): void => {
  const config = getDemoMode();
  if (!config.enabled) return;

  try {
    // Validate amount
    const newBalance = config.balance + amount;
    if (newBalance < 0) {
      toast.error('Insufficient balance for transaction');
      return;
    }

    config.balance = newBalance;
    saveDemoMode(config);
  } catch (error) {
    console.error('Error updating demo balance:', error);
    toast.error('Failed to update balance');
  }
};

// Check if demo mode has enough balance
export const checkDemoBalance = (amount: number): boolean => {
  try {
    const config = getDemoMode();
    return config.enabled && config.balance >= amount;
  } catch (error) {
    console.error('Error checking demo balance:', error);
    return false;
  }
};

// Generate unique demo transaction ID
export const generateDemoTxid = (): string => {
  return `demo_tx_${Date.now().toString(36)}_${Math.random().toString(36).substring(2)}`;
};

// Save demo milestone completion with proper error handling
export const saveDemoMilestone = async (milestoneId: string, reward: number): Promise<{ milestoneTxid: string; rewardTxid: string }> => {
  try {
    const config = getDemoMode();
    if (!config.enabled) {
      throw new Error('Demo mode not enabled');
    }

    if (config.completedMilestones.includes(milestoneId)) {
      throw new Error('Milestone already completed');
    }

    // Generate transaction IDs
    const milestoneTxid = generateDemoTxid();
    const rewardTxid = generateDemoTxid();
    
    // Create transactions
    const transactions: DemoTransaction[] = [
      {
        txid: milestoneTxid,
        type: 'milestone',
        status: 'pending',
        timestamp: new Date().toISOString()
      },
      {
        txid: rewardTxid,
        type: 'reward',
        amount: reward,
        status: 'pending',
        timestamp: new Date().toISOString()
      }
    ];
    
    // Add to pending transactions
    config.pendingTransactions = [...config.pendingTransactions, ...transactions];
    
    // Add milestone to completed list
    config.completedMilestones.push(milestoneId);
    
    // Add transactions to history
    config.transactions.push(milestoneTxid, rewardTxid);
    
    // Update balance
    config.balance += reward;
    
    // Save timestamp
    const timestamp = new Date().toISOString();
    config.timestamps[milestoneId] = timestamp;
    
    // Generate and save hash
    const hash = generateDemoHash(milestoneId, timestamp);
    config.hashes[milestoneId] = hash;
    
    // Save updated config
    saveDemoMode(config);
    
    return { milestoneTxid, rewardTxid };
  } catch (error) {
    console.error('Error saving demo milestone:', error);
    throw error;
  }
};

// Check if demo milestone is completed
export const isDemoMilestoneCompleted = (milestoneId: string): boolean => {
  try {
    const config = getDemoMode();
    return config.enabled && config.completedMilestones.includes(milestoneId);
  } catch (error) {
    console.error('Error checking milestone completion:', error);
    return false;
  }
};

// Get demo milestone completion time
export const getDemoMilestoneTimestamp = (milestoneId: string): string | null => {
  try {
    const config = getDemoMode();
    return config.timestamps[milestoneId] || null;
  } catch (error) {
    console.error('Error getting milestone timestamp:', error);
    return null;
  }
};

// Get demo milestone hash
export const getDemoMilestoneHash = (milestoneId: string): string | null => {
  try {
    const config = getDemoMode();
    return config.hashes[milestoneId] || null;
  } catch (error) {
    console.error('Error getting milestone hash:', error);
    return null;
  }
};

// Get demo transactions
export const getDemoTransactions = (): string[] => {
  try {
    const config = getDemoMode();
    return config.enabled ? config.transactions : [];
  } catch (error) {
    console.error('Error getting demo transactions:', error);
    return [];
  }
};

// Add demo transaction with validation
export const addDemoTransaction = (type: 'milestone' | 'reward' | 'badge'): string => {
  try {
    const config = getDemoMode();
    if (!config.enabled) return '';

    const txid = generateDemoTxid();
    config.transactions.push(txid);
    saveDemoMode(config);
    return txid;
  } catch (error) {
    console.error('Error adding demo transaction:', error);
    toast.error('Failed to create transaction');
    return '';
  }
};

// Unlock a mission in demo mode with validation
export const unlockDemoMission = (missionId: string): void => {
  try {
    const config = getDemoMode();
    if (!config.enabled || config.unlockedMissions.includes(missionId)) return;

    config.unlockedMissions.push(missionId);
    saveDemoMode(config);
    
    // Get mission title from ID for better notification
    const title = missionId.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    toast.success('New Mission Chain Unlocked!', {
      description: `${title} is now available. Continue your journey to improve government efficiency.`
    });
  } catch (error) {
    console.error('Error unlocking mission:', error);
    toast.error('Failed to unlock mission');
  }
};

// Check if a mission is unlocked in demo mode
export const isDemoMissionUnlocked = (missionId: string): boolean => {
  try {
    const config = getDemoMode();
    return config.enabled && config.unlockedMissions.includes(missionId);
  } catch (error) {
    console.error('Error checking mission unlock status:', error);
    return false;
  }
};

// Generate demo hash with proper input validation
export const generateDemoHash = (milestoneId: string, timestamp: string): string => {
  try {
    if (!milestoneId || !timestamp) {
      throw new Error('Invalid input for hash generation');
    }
    
    const data = {
      milestoneId,
      timestamp,
      random: Math.random().toString()
    };
    
    return SHA256(JSON.stringify(data)).toString();
  } catch (error) {
    console.error('Error generating demo hash:', error);
    return SHA256(Date.now().toString()).toString();
  }
};