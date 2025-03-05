import SHA256 from 'crypto-js/sha256';
import type { Milestone } from '../types/game';

// Initialize BSV library with loading state
let bsvLoaded = false;
let loadingPromise: Promise<void> | null = null;
let privateKey: any = null;
let address: string | null = null;

// Initialize BSV library with timeout
const initBSV = async () => {
  if (bsvLoaded) return;
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds total (50 * 100ms)
    
    const checkBSV = () => {
      attempts++;
      if ((window as any).bsv) {
        console.log('BSV library loaded successfully');
        bsvLoaded = true;
        resolve();
      } else if (attempts >= maxAttempts) {
        reject(new Error('BSV library failed to load after 5 seconds'));
      } else {
        setTimeout(checkBSV, 100); // Check every 100ms
      }
    };
    checkBSV();
  });

  return loadingPromise;
};

// Get BSV from window object with proper error handling
const getBsv = async () => {
  try {
    await initBSV();
    if (!bsvLoaded) {
      throw new Error('BSV library not loaded');
    }
    return (window as any).bsv;
  } catch (error) {
    console.error('Error getting BSV library:', error);
    throw new Error('Failed to initialize BSV library. Please refresh the page and try again.');
  }
};

/**
 * Loads a WIF private key and derives the address
 * @param wif The private key in WIF format
 * @returns The derived address and balance
 */
export const loadWIF = async (wif: string): Promise<{ address: string, balance: number }> => {
  if (!wif?.trim()) {
    throw new Error('Please enter a WIF key');
  }

  try {
    const bsv = await getBsv();
    if (!bsv) {
      throw new Error('BSV library not initialized');
    }

    privateKey = bsv.PrivateKey.fromWIF(wif);
    const publicKey = bsv.PublicKey.fromPrivateKey(privateKey);
    address = bsv.Address.fromPublicKey(publicKey).toString();
    
    console.log("Loaded address:", address);
    const balance = await getBalance();
    return { address, balance };
  } catch (error) {
    console.error("Error loading WIF:", error);
    if (!bsvLoaded) {
      throw new Error('BSV library not loaded. Please wait and try again.');
    }
    if (error instanceof Error && error.message.includes('Invalid checksum')) {
      throw new Error('Invalid WIF key format');
    }
    throw new Error(error instanceof Error ? error.message : 'Failed to load WIF key');
  }
};

/**
 * Gets the balance for an address
 * @returns Balance in satoshis
 */
export const getBalance = async (): Promise<number> => {
  if (!address) return 0;
  
  try {
    const response = await fetch(`https://api.whatsonchain.com/v1/bsv/main/address/${address}/balance`);
    const data = await response.json();
    const balance = data.confirmed + data.unconfirmed;
    
    console.log(`Current balance: ${balance} satoshis`);
    return balance;
  } catch (error) {
    console.error("Error getting balance:", error);
    return 0;
  }
};

/**
 * Creates and broadcasts an OP_RETURN transaction
 * @param wif The private key in WIF format
 * @param data The data to store in OP_RETURN
 * @returns Transaction ID
 */
export const createOpReturnTransaction = async (wif: string, data: string): Promise<string> => {
  try {
    const bsv = await getBsv();
    
    // First load the WIF if not already loaded
    if (!privateKey || !address) {
      await loadWIF(wif);
    }
    
    // Create OP_RETURN script
    const dataBuffer = Buffer.from(data);
    const script = bsv.Script.buildSafeDataOut([dataBuffer]);
    
    // Create and sign transaction
    const tx = new bsv.Transaction()
      .addOutput(new bsv.Transaction.Output({
        script,
        satoshis: 0
      }))
      .from(await fetchUTXOs(address!))
      .change(address!)
      .sign(privateKey!);
    
    // Broadcast transaction
    const txid = await broadcastTransaction(tx.toString());
    
    console.log(`OP_RETURN Transaction created with data: ${data.substring(0, 50)}${data.length > 50 ? '...' : ''}`);
    
    return txid;
  } catch (error) {
    console.error("Error creating OP_RETURN transaction:", error);
    throw error;
  }
};

/**
 * Creates and broadcasts a transaction with satoshi transfer and optional OP_RETURN data
 * @param wif The private key in WIF format
 * @param recipient Recipient address
 * @param amount Amount in satoshis
 * @param data Optional data for OP_RETURN
 * @returns Transaction ID
 */
export const sendTransaction = async (
  wif: string,
  recipient: string,
  amount: number,
  data?: string
): Promise<string> => {
  try {
    const bsv = await getBsv();
    
    // First load the WIF if not already loaded
    if (!privateKey || !address) {
      await loadWIF(wif);
    }
    
    // Create transaction
    const tx = new bsv.Transaction()
      .to(recipient, amount)
      .from(await fetchUTXOs(address!))
      .change(address!);
    
    // Add OP_RETURN if data provided
    if (data) {
      const dataBuffer = Buffer.from(data);
      const script = bsv.Script.buildSafeDataOut([dataBuffer]);
      tx.addOutput(new bsv.Transaction.Output({
        script,
        satoshis: 0
      }));
    }
    
    // Sign and broadcast
    tx.sign(privateKey!);
    const txid = await broadcastTransaction(tx.toString());
    
    console.log(`Transaction sent: ${amount} satoshis to ${recipient}`);
    if (data) {
      console.log(`With data: ${data.substring(0, 50)}${data.length > 50 ? '...' : ''}`);
    }
    
    return txid;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
};

/**
 * Fetches UTXOs for an address
 * @param addr The BSV address
 * @returns Array of UTXOs
 */
async function fetchUTXOs(addr: string) {
  try {
    const bsv = await getBsv();
    const response = await fetch(`https://api.whatsonchain.com/v1/bsv/main/address/${addr}/unspent`);
    const data = await response.json();
    
    return data.map((utxo: any) => ({
      txId: utxo.tx_hash,
      outputIndex: utxo.tx_pos,
      script: bsv.Script.buildPublicKeyHashOut(addr).toString(),
      satoshis: utxo.value
    }));
  } catch (error) {
    console.error("Error fetching UTXOs:", error);
    return [];
  }
}

/**
 * Broadcasts a transaction to the network
 * @param txHex The raw transaction hex
 * @returns Transaction ID
 */
async function broadcastTransaction(txHex: string): Promise<string> {
  try {
    const response = await fetch('https://api.whatsonchain.com/v1/bsv/main/tx/raw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txhex: txHex }),
    });
    
    if (!response.ok) {
      throw new Error(`Broadcasting failed: ${response.statusText}`);
    }
    
    const txid = await response.text();
    console.log("Transaction broadcasted with TXID:", txid);
    return txid;
  } catch (error) {
    console.error("Error broadcasting transaction:", error);
    throw error;
  }
}

/**
 * Generates a hash for a milestone
 * @param milestone The milestone to hash
 * @param playerAddress The player's address
 * @param previousHash The previous milestone's hash (optional)
 * @returns The hash of the milestone
 */
export const generateMilestoneHash = (
  milestone: Milestone,
  playerAddress: string,
  previousHash?: string
): string => {
  const timestamp = new Date().toISOString();
  const data = {
    milestoneId: milestone.id,
    playerAddress,
    timestamp,
    previousHash: previousHash || '0'
  };
  
  const hash = SHA256(JSON.stringify(data)).toString();
  
  console.log(`Generated hash for milestone ${milestone.id}: ${hash.substring(0, 16)}...`);
  
  return hash;
};

/**
 * Stores a completed milestone on the blockchain
 * @param wif The private key in WIF format
 * @param milestone The completed milestone
 * @param playerAddress The player's address
 * @param previousHash The previous milestone's hash (optional)
 * @returns The transaction ID and hash
 */
export const storeMilestoneOnBlockchain = async (
  wif: string,
  milestone: Milestone,
  playerAddress: string,
  previousHash?: string
): Promise<{ txid: string, hash: string }> => {
  // Generate hash for the milestone
  const hash = generateMilestoneHash(milestone, playerAddress, previousHash);
  
  // Prepare data for blockchain storage
  const data = JSON.stringify({
    type: 'milestone_completion',
    milestoneId: milestone.id,
    playerAddress,
    hash,
    previousHash: previousHash || '0',
    timestamp: new Date().toISOString()
  });
  
  // Store on blockchain
  const txid = await createOpReturnTransaction(wif, data);
  
  return { txid, hash };
};

/**
 * Sends a reward payment for completing a milestone
 * @param wif The private key in WIF format
 * @param milestone The completed milestone
 * @param playerAddress The player's address
 * @returns The transaction ID
 */
export const sendMilestoneReward = async (
  wif: string,
  milestone: Milestone,
  playerAddress: string
): Promise<string> => {
  // Prepare data for the transaction
  const data = JSON.stringify({
    type: 'milestone_reward',
    milestoneId: milestone.id,
    reward: milestone.reward,
    timestamp: new Date().toISOString()
  });
  
  // Send the reward
  const txid = await sendTransaction(wif, playerAddress, milestone.reward, data);
  
  return txid;
};

/**
 * Updates player profile with a new badge
 * @param wif The private key in WIF format
 * @param badge The badge to add
 * @param playerAddress The player's address
 * @returns The transaction ID
 */
export const awardBadge = async (
  wif: string,
  badge: string,
  playerAddress: string
): Promise<string> => {
  // Prepare data for blockchain storage
  const data = JSON.stringify({
    type: 'badge_award',
    badge,
    playerAddress,
    timestamp: new Date().toISOString()
  });
  
  // Store on blockchain
  const txid = await createOpReturnTransaction(wif, data);
  
  return txid;
};