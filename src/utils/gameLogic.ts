import { GameState, Milestone, MilestoneChain } from '../types/game';
import { initialMilestoneChains } from '../data/milestones';
import { 
  storeMilestoneOnBlockchain, 
  sendMilestoneReward, 
  awardBadge 
} from './blockchain-sdk';
import {
  getDemoMode,
  saveDemoMilestone,
  isDemoMilestoneCompleted,
  getDemoMilestoneTimestamp,
  generateDemoHash,
  generateDemoTxid,
  unlockDemoMission,
  saveDemoMode
} from './demo';
import { toast } from 'sonner';

// Initialize game state
export const initializeGameState = (
  address: string,
  username: string | null,
  balance: number
): GameState => {
  const demoMode = getDemoMode();
  
  // Deep copy chains to prevent mutations
  const chains = JSON.parse(JSON.stringify(initialMilestoneChains));
  
  // In demo mode, restore state from demo config
  if (demoMode.enabled) {
    chains.forEach(chain => {
      // Set unlocked status from demo config
      chain.unlocked = demoMode.unlockedMissions.includes(chain.id);
      
      // Restore completed milestones
      chain.milestones.forEach(milestone => {
        if (isDemoMilestoneCompleted(milestone.id)) {
          milestone.completed = true;
          milestone.timestamp = getDemoMilestoneTimestamp(milestone.id) || new Date().toISOString();
          milestone.hash = generateDemoHash(milestone.id, milestone.timestamp);
          milestone.txid = generateDemoTxid();
        }
      });
      
      // Set chain completion status
      chain.completed = chain.milestones.every(m => m.completed);
    });
    
    // Set current chain and milestone from demo config
    return {
      playerAddress: address,
      playerName: username,
      level: 1,
      xp: 0,
      balance: demoMode.balance,
      currentChainId: demoMode.currentChainId || 'dge-training',
      currentMilestoneId: demoMode.currentMilestoneId || 'dge-training-1',
      chains,
      badges: [],
      transactions: demoMode.transactions
    };
  }
  
  // Real mode initialization
  return {
    playerAddress: address,
    playerName: username,
    level: 1,
    xp: 0,
    balance,
    currentChainId: 'dge-training',
    currentMilestoneId: 'dge-training-1',
    chains,
    badges: [],
    transactions: []
  };
};

/**
 * Load game state from localStorage with error handling
 */
export const loadGameState = (address: string): GameState | null => {
  try {
    const savedState = localStorage.getItem(`gameState_${address}`);
    if (savedState) {
      const state = JSON.parse(savedState);
      
      // Validate required fields
      if (!state.playerAddress || !state.chains) {
        throw new Error('Invalid game state');
      }
      
      return state;
    }
    return null;
  } catch (error) {
    console.error('Error loading game state:', error);
    toast.error('Failed to load game state');
    return null;
  }
};

/**
 * Save game state to localStorage with error handling
 */
export const saveGameState = (state: GameState): void => {
  try {
    if (!state.playerAddress) {
      throw new Error('Invalid game state: missing player address');
    }
    localStorage.setItem(`gameState_${state.playerAddress}`, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
    toast.error('Failed to save game state');
  }
};

/**
 * Get the current milestone with error handling
 */
export const getCurrentMilestone = (state: GameState): Milestone | null => {
  try {
    if (!state.currentChainId || !state.currentMilestoneId) {
      throw new Error('No current milestone set');
    }
    
    const chain = state.chains.find(c => c.id === state.currentChainId);
    if (!chain) {
      throw new Error('Current chain not found');
    }
    
    const milestone = chain.milestones.find(m => m.id === state.currentMilestoneId);
    if (!milestone) {
      throw new Error('Current milestone not found');
    }
    
    return milestone;
  } catch (error) {
    console.error('Error getting current milestone:', error);
    return null;
  }
};

/**
 * Get the next milestone with proper chain progression
 */
export const getNextMilestone = (state: GameState): { milestone: Milestone, chainId: string } | null => {
  try {
    if (!state.currentChainId || !state.currentMilestoneId) {
      throw new Error('No current milestone set');
    }
    
    // Find current chain
    const chainIndex = state.chains.findIndex(c => c.id === state.currentChainId);
    if (chainIndex === -1) {
      throw new Error('Current chain not found');
    }
    
    const currentChain = state.chains[chainIndex];
    
    // Find current milestone index
    const milestoneIndex = currentChain.milestones.findIndex(m => m.id === state.currentMilestoneId);
    if (milestoneIndex === -1) {
      throw new Error('Current milestone not found');
    }
    
    // Check if there's another milestone in the current chain
    if (milestoneIndex < currentChain.milestones.length - 1) {
      return {
        milestone: currentChain.milestones[milestoneIndex + 1],
        chainId: currentChain.id
      };
    }
    
    // Look for next unlocked chain
    for (let i = chainIndex + 1; i < state.chains.length; i++) {
      const nextChain = state.chains[i];
      if (nextChain.unlocked && !nextChain.completed) {
        // Show transition message
        toast.info(`Starting ${nextChain.title}`, {
          description: 'Get ready for your next mission chain!'
        });
        
        return {
          milestone: nextChain.milestones[0],
          chainId: nextChain.id
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting next milestone:', error);
    return null;
  }
};

/**
 * Calculate XP for completing a milestone
 */
export const calculateXP = (milestone: Milestone): number => {
  // Summit milestones give more XP
  if (milestone.id.startsWith('nbs-')) {
    return milestone.type === 'agency' ? 20 : 50;
  }
  
  return milestone.type === 'agency' ? 10 : 25;
};

/**
 * Check if player should level up
 */
export const shouldLevelUp = (level: number, xp: number): boolean => {
  const xpNeeded = level * 50;
  return xp >= xpNeeded;
};

/**
 * Complete milestone with comprehensive error handling
 */
export const completeMilestone = async (
  state: GameState,
  wif: string
): Promise<{ state: GameState, txids: string[] }> => {
  const currentMilestone = getCurrentMilestone(state);
  if (!currentMilestone) {
    throw new Error('No current milestone found');
  }

  const demoMode = getDemoMode();
  const updatedState = { ...state };

  try {
    if (demoMode.enabled) {
      // Handle demo mode completion
      const { milestoneTxid, rewardTxid } = await saveDemoMilestone(currentMilestone.id, currentMilestone.reward);
      
      // Update milestone in state
      const chain = updatedState.chains.find(c => c.id === updatedState.currentChainId);
      if (!chain) throw new Error('Chain not found');
      
      const milestone = chain.milestones.find(m => m.id === currentMilestone.id);
      if (!milestone) throw new Error('Milestone not found');
      
      milestone.completed = true;
      milestone.timestamp = new Date().toISOString();
      milestone.hash = generateDemoHash(milestone.id, milestone.timestamp);
      milestone.txid = milestoneTxid;
      
      // Update chain completion status
      const allMilestonesCompleted = chain.milestones.every(m => m.completed);
      if (allMilestonesCompleted) {
        chain.completed = true;
        
        // Show chain completion message
        toast.success(`${chain.title} mission chain completed!`, {
          description: 'You\'ve unlocked new missions and earned rewards.'
        });
        
        // Special handling for National Blockchain Summit
        if (chain.id === 'national-blockchain-summit') {
          // Update demo mode state
          const updatedDemoMode = getDemoMode();
          updatedDemoMode.currentChainId = chain.id;
          updatedDemoMode.currentMilestoneId = milestone.id;
          saveDemoMode(updatedDemoMode);
          
          // Show completion message
          toast.success('National Blockchain Summit Completed!', {
            description: 'Your advocacy efforts have been recorded on the blockchain.'
          });
        } else {
          // Handle normal chain progression
          const nextChainIndex = updatedState.chains.findIndex(c => c.id === chain.id) + 1;
          if (nextChainIndex < updatedState.chains.length) {
            const nextChain = updatedState.chains[nextChainIndex];
            nextChain.unlocked = true;
            unlockDemoMission(nextChain.id);
            
            // Set next milestone
            updatedState.currentChainId = nextChain.id;
            updatedState.currentMilestoneId = nextChain.milestones[0].id;
            
            // Update demo mode state
            const updatedDemoMode = getDemoMode();
            updatedDemoMode.currentChainId = nextChain.id;
            updatedDemoMode.currentMilestoneId = nextChain.milestones[0].id;
            saveDemoMode(updatedDemoMode);
            
            // Show next chain notification
            toast.success(`New Mission Chain Unlocked!`, {
              description: `${nextChain.title} is now available.`
            });
          }
        }
      } else {
        // Set next milestone in current chain
        const currentMilestoneIndex = chain.milestones.findIndex(m => m.id === milestone.id);
        if (currentMilestoneIndex < chain.milestones.length - 1) {
          const nextMilestone = chain.milestones[currentMilestoneIndex + 1];
          updatedState.currentMilestoneId = nextMilestone.id;
          
          // Update demo mode state
          const updatedDemoMode = getDemoMode();
          updatedDemoMode.currentMilestoneId = nextMilestone.id;
          saveDemoMode(updatedDemoMode);
        }
      }
      
      // Update XP and check for level up
      const xpGained = calculateXP(milestone);
      updatedState.xp += xpGained;
      
      if (shouldLevelUp(updatedState.level, updatedState.xp)) {
        updatedState.level += 1;
        updatedState.xp = 0;
        toast.success(`Level Up!`, {
          description: `You are now level ${updatedState.level}`
        });
      }
      
      // Save state
      saveGameState(updatedState);
      
      return {
        state: updatedState,
        txids: [milestoneTxid, rewardTxid]
      };
    } else {
      // Handle real blockchain completion
      const chainIndex = updatedState.chains.findIndex(c => c.id === updatedState.currentChainId);
      if (chainIndex === -1) throw new Error('Chain not found');
      
      const milestoneIndex = updatedState.chains[chainIndex].milestones.findIndex(
        m => m.id === updatedState.currentMilestoneId
      );
      if (milestoneIndex === -1) throw new Error('Milestone not found');
      
      // Get previous hash if any
      const previousHash = updatedState.chains[chainIndex].milestones
        .filter(m => m.completed && m.hash)
        .map(m => m.hash)
        .pop();
      
      // Store milestone completion on blockchain
      const { txid, hash } = await storeMilestoneOnBlockchain(
        wif,
        currentMilestone,
        updatedState.playerAddress,
        previousHash
      );
      
      // Update milestone
      const milestone = updatedState.chains[chainIndex].milestones[milestoneIndex];
      milestone.completed = true;
      milestone.hash = hash;
      milestone.txid = txid;
      milestone.timestamp = new Date().toISOString();
      milestone.previousHash = previousHash;
      
      // Send reward
      const rewardTxid = await sendMilestoneReward(wif, currentMilestone, updatedState.playerAddress);
      
      // Update transactions
      updatedState.transactions.push(txid, rewardTxid);
      
      // Update balance
      updatedState.balance += currentMilestone.reward;
      
      // Update XP and check for level up
      const xpGained = calculateXP(milestone);
      updatedState.xp += xpGained;
      
      if (shouldLevelUp(updatedState.level, updatedState.xp)) {
        updatedState.level += 1;
        updatedState.xp = 0;
        toast.success(`Level Up! You are now level ${updatedState.level}`);
      }
      
      // Check chain completion
      const chain = updatedState.chains[chainIndex];
      if (chain.milestones.every(m => m.completed)) {
        chain.completed = true;
        
        // Award chain completion badge
        const badgeTxid = await awardBadge(wif, `${chain.title} Expert`, updatedState.playerAddress);
        updatedState.badges.push(`${chain.title} Expert`);
        updatedState.transactions.push(badgeTxid);
        
        // Special handling for National Blockchain Summit
        if (chain.id === 'national-blockchain-summit') {
          toast.success('National Blockchain Summit Completed!', {
            description: 'Your advocacy efforts have been recorded on the blockchain.'
          });
        } else {
          // Unlock next chain
          if (chainIndex < updatedState.chains.length - 1) {
            updatedState.chains[chainIndex + 1].unlocked = true;
          }
        }
      }
      
      // Set next milestone
      const next = getNextMilestone(updatedState);
      if (next) {
        updatedState.currentChainId = next.chainId;
        updatedState.currentMilestoneId = next.milestone.id;
      } else {
        // Handle game completion
        toast.success('Congratulations! You\'ve completed all available missions!');
      }
      
      // Save state
      saveGameState(updatedState);
      
      return {
        state: updatedState,
        txids: [txid, rewardTxid]
      };
    }
  } catch (error) {
    console.error('Error completing milestone:', error);
    toast.error('Failed to complete milestone');
    throw error;
  }
};