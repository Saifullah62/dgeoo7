import React, { useState, useEffect } from 'react';
import { GameState, Milestone, MilestoneChain } from '../types/game';
import { 
  initializeGameState, 
  loadGameState, 
  saveGameState,
  getCurrentMilestone,
  completeMilestone
} from '../utils/gameLogic';
import MilestoneCard from './MilestoneCard';
import ChainProgress from './ChainProgress';
import PlayerStats from './PlayerStats';
import BlockchainExplorer from './BlockchainExplorer';
import NationalBlockchainSummit from './NationalBlockchainSummit';
import MissionCompleteModal from './modals/MissionCompleteModal';
import MissionBriefingModal from './modals/MissionBriefingModal';
import { Shield, Briefcase, RefreshCw, AlertCircle, CheckCircle2, Info, Target, Lock, Award, ChevronRight, FileText, Zap, MessageSquare, Database, BookOpen, Globe } from 'lucide-react';

interface GameInterfaceProps {
  userData: {
    address: string;
    username: string | null;
    isRegistered: boolean;
    balance: number;
  };
  wif: string;
  onUpdateBalance: () => Promise<void>;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ 
  userData, 
  wif,
  onUpdateBalance
}) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');
  const [selectedChainId, setSelectedChainId] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [showMissionComplete, setShowMissionComplete] = useState<boolean>(false);
  const [completedMilestone, setCompletedMilestone] = useState<Milestone | null>(null);
  const [showMissionBriefing, setShowMissionBriefing] = useState<boolean>(false);
  const [currentChainForBriefing, setCurrentChainForBriefing] = useState<MilestoneChain | null>(null);
  const [showBlockchainExplorer, setShowBlockchainExplorer] = useState<boolean>(false);
  const [showBlockchainInfo, setShowBlockchainInfo] = useState<boolean>(false);
  const [showNationalBlockchainSummit, setShowNationalBlockchainSummit] = useState<boolean>(false);
  const [showVisualEffects, setShowVisualEffects] = useState<boolean>(true);
  
  // Initialize or load game state
  useEffect(() => {
    if (userData.address && userData.isRegistered) {
      // Try to load existing game state
      const savedState = loadGameState(userData.address);
      
      if (savedState) {
        // Update balance from userData
        savedState.balance = userData.balance;
        setGameState(savedState);
        setSelectedChainId(savedState.currentChainId);
      } else {
        // Initialize new game state
        const newState = initializeGameState(
          userData.address,
          userData.username,
          userData.balance
        );
        setGameState(newState);
        setSelectedChainId(newState.currentChainId);
        saveGameState(newState);
        
        // Show intro for new players
        setShowIntro(true);
      }
    }
  }, [userData.address, userData.isRegistered, userData.balance, userData.username]);
  
  // Handle chain selection
  const handleSelectChain = (chainId: string) => {
    setSelectedChainId(chainId);
    
    // Show mission briefing for newly selected chain
    const chain = gameState?.chains.find(c => c.id === chainId);
    if (chain && !chain.completed && chain.unlocked) {
      setCurrentChainForBriefing(chain);
      setShowMissionBriefing(true);
    }
    
    // If National Blockchain Summit is selected, show the special interface
    if (chainId === 'national-blockchain-summit') {
      setShowNationalBlockchainSummit(true);
      setShowBlockchainExplorer(false);
      setShowBlockchainInfo(false);
    } else {
      setShowNationalBlockchainSummit(false);
    }
  };
  
  // Handle milestone completion
  const handleCompleteMilestone = async (milestone: Milestone) => {
    if (!gameState || !wif) return;
    
    try {
      setLoading(true);
      setMessage('Processing milestone completion on the blockchain...');
      setMessageType('info');
      
      // Complete milestone and update game state
      const { state: updatedState, txids } = await completeMilestone(gameState, wif);
      
      setGameState(updatedState);
      setSelectedChainId(updatedState.currentChainId);
      
      // Update balance
      await onUpdateBalance();
      
      // Show completion modal
      setCompletedMilestone(milestone);
      setShowMissionComplete(true);
      
      setMessage(`Milestone completed! Transaction IDs: ${txids.join(', ')}`);
      setMessageType('success');
    } catch (error) {
      setMessage(`Error completing milestone: ${error instanceof Error ? error.message : String(error)}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };
  
  // Close intro modal
  const handleCloseIntro = () => {
    setShowIntro(false);
  };
  
  // Close mission complete modal
  const handleCloseMissionComplete = () => {
    setShowMissionComplete(false);
    setCompletedMilestone(null);
  };
  
  // Close mission briefing modal
  const handleCloseMissionBriefing = () => {
    setShowMissionBriefing(false);
    setCurrentChainForBriefing(null);
  };
  
  // Toggle blockchain explorer
  const toggleBlockchainExplorer = () => {
    setShowBlockchainExplorer(!showBlockchainExplorer);
    if (showBlockchainInfo) setShowBlockchainInfo(false);
    if (showNationalBlockchainSummit) setShowNationalBlockchainSummit(false);
  };
  
  // Toggle blockchain info
  const toggleBlockchainInfo = () => {
    setShowBlockchainInfo(!showBlockchainInfo);
    if (showBlockchainExplorer) setShowBlockchainExplorer(false);
    if (showNationalBlockchainSummit) setShowNationalBlockchainSummit(false);
  };
  
  // Toggle National Blockchain Summit
  const toggleNationalBlockchainSummit = () => {
    setShowNationalBlockchainSummit(!showNationalBlockchainSummit);
    if (showBlockchainExplorer) setShowBlockchainExplorer(false);
    if (showBlockchainInfo) setShowBlockchainInfo(false);
    
    // If showing the summit, select its chain
    if (!showNationalBlockchainSummit) {
      const summitChain = gameState?.chains.find(c => c.id === 'national-blockchain-summit');
      if (summitChain) {
        setSelectedChainId('national-blockchain-summit');
      }
    }
  };
  
  // Toggle visual effects
  const toggleVisualEffects = () => {
    setShowVisualEffects(!showVisualEffects);
  };
  
  // Get current chain
  const getCurrentChain = (): MilestoneChain | null => {
    if (!gameState || !selectedChainId) return null;
    return gameState.chains.find(c => c.id === selectedChainId) || null;
  };
  
  // Get all completed milestones
  const getCompletedMilestones = (): Milestone[] => {
    if (!gameState) return [];
    
    return gameState.chains.flatMap(chain => 
      chain.milestones.filter(milestone => milestone.completed)
    );
  };
  
  // Render loading state
  if (!gameState) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-12 w-12 border-t-2 border-[#ffc107] border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  const currentChain = getCurrentChain();
  
  // Calculate total progress
  const totalMilestones = gameState.chains.reduce((acc, chain) => acc + chain.milestones.length, 0);
  const completedMilestones = gameState.chains.reduce((acc, chain) => acc + chain.milestones.filter(m => m.completed).length, 0);
  const overallProgress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
  
  return (
    <div className="bg-[#0f172a] rounded-lg border border-gray-800 shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Shield className="text-[#ffc107] h-8 w-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-100">DGE Mission Terminal</h1>
              <p className="text-gray-400 text-sm">Operation: Goldfinger</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="text-sm text-gray-400 mr-4">
              <span className="font-medium text-[#ffc107]">{completedMilestones}</span>/{totalMilestones} milestones completed
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#ffc107] to-[#ff8f00]"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <PlayerStats gameState={gameState} />
        
        <div className="flex mt-6 space-x-2">
          <button
            onClick={toggleBlockchainExplorer}
            className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
              showBlockchainExplorer 
                ? 'bg-blue-900 text-blue-300 border border-blue-700' 
                : 'bg-[#1e293b] text-gray-300 border border-gray-700 hover:bg-[#263548]'
            }`}
          >
            <Database className="mr-1.5" size={16} />
            Blockchain Explorer
          </button>
          
          <button
            onClick={toggleBlockchainInfo}
            className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
              showBlockchainInfo 
                ? 'bg-blue-900 text-blue-300 border border-blue-700' 
                : 'bg-[#1e293b] text-gray-300 border border-gray-700 hover:bg-[#263548]'
            }`}
          >
            <BookOpen className="mr-1.5" size={16} />
            BSV Benefits
          </button>
          
          <button
            onClick={toggleNationalBlockchainSummit}
            className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
              showNationalBlockchainSummit 
                ? 'bg-yellow-900 text-yellow-300 border border-yellow-700' 
                : 'bg-[#1e293b] text-gray-300 border border-gray-700 hover:bg-[#263548]'
            }`}
          >
            <Globe className="mr-1.5" size={16} />
            National Blockchain Summit
          </button>
          
          <button
            onClick={toggleVisualEffects}
            className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
              showVisualEffects 
                ? 'bg-purple-900 text-purple-300 border border-purple-700' 
                : 'bg-[#1e293b] text-gray-300 border border-gray-700 hover:bg-[#263548]'
            }`}
            title={showVisualEffects ? "Disable visual effects" : "Enable visual effects"}
          >
            <Zap className="mr-1.5" size={16} />
            {showVisualEffects ? "Effects On" : "Effects Off"}
          </button>
        </div>
      </div>
      
      {showBlockchainExplorer ? (
        <div className="p-6">
          <BlockchainExplorer 
            playerAddress={gameState.playerAddress}
            transactions={gameState.transactions}
            milestones={getCompletedMilestones()}
          />
        </div>
      ) : showBlockchainInfo ? (
        <div className="p-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-[#ffc107] mb-4 flex items-center">
              <Shield className="mr-2" size={24} />
              Bitcoin SV: The Foundation for Government Efficiency
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Transparency & Accountability</h3>
                <p className="text-gray-300 mb-3">
                  Bitcoin SV's public ledger creates unprecedented transparency in government operations. Every transaction, 
                  from budget allocations to contract awards, can be recorded on the blockchain and viewed by any citizen.
                </p>
                <div className="bg-[#0f172a] p-4 rounded border border-gray-700">
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Real-World Application</h4>
                  <p className="text-sm text-gray-400">
                    In DGE operations, every milestone completion is recorded as an OP_RETURN transaction containing a 
                    cryptographic hash of the achievement. This creates an immutable record that can be independently verified 
                    by anyone, eliminating the possibility of falsified accomplishments or backdated records.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Fraud Prevention & Detection</h3>
                <p className="text-gray-300 mb-3">
                  The immutable nature of blockchain records makes fraud immediately detectable. Any attempt to alter historical 
                  data would require changing all subsequent blocks—a practical impossibility in a properly secured blockchain network.
                </p>
                <div className="bg-[#0f172a] p-4 rounded border border-gray-700">
                  <h4 className="text-sm font-medium text-green-400 mb-2">Real-World Application</h4>
                  <p className="text-sm text-gray-400">
                    In the game, Goldfinger attempts to manipulate government records to hide inefficiencies. With BSV implementation, 
                    these attempts are immediately visible as discrepancies between the blockchain record and the manipulated data. 
                    This same principle applies to real government spending, where blockchain can prevent billions in fraud annually.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Data Integrity & Security</h3>
                <p className="text-gray-300 mb-3">
                  Once data is written to the BSV blockchain, it cannot be altered or deleted. This ensures the long-term 
                  integrity of government records, protecting them from both accidental corruption and malicious tampering.
                </p>
                <div className="bg-[#0f172a] p-4 rounded border border-gray-700">
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Real-World Application</h4>
                  <p className="text-sm text-gray-400">
                    In the Fort Knox security mission, you implement blockchain verification of access logs that cannot be altered 
                    even by system administrators. This prevents Goldfinger from covering his tracks by modifying security logs. 
                    Similarly, government records stored on BSV would be protected from insider threats and external hackers.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Cost Efficiency & Scalability</h3>
                <p className="text-gray-300 mb-3">
                  Bitcoin SV is designed for massive on-chain scaling, allowing it to handle government-scale data at minimal cost. 
                  With transaction fees measured in fractions of a cent, BSV makes blockchain practical for everyday government operations.
                </p>
                <div className="bg-[#0f172a] p-4 rounded border border-gray-700">
                  <h4 className="text-sm font-medium text-yellow-400 mb-2">Real-World Application</h4>
                  <p className="text-sm text-gray-400">
                    The Treasury Department audit mission demonstrates how blockchain can process millions of financial transactions 
                    efficiently. BSV's ability to handle over 50,000 transactions per second makes it suitable for even the largest 
                    government departments, while its low fees ensure cost-effectiveness compared to traditional auditing methods.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg border border-blue-800">
                <h3 className="text-lg font-semibold text-[#ffc107] mb-2 flex items-center">
                  <Shield className="mr-2" size={20} />
                  The DGE Advantage
                </h3>
                <p className="text-gray-300">
                  By implementing BSV blockchain across government operations, the Digital Government Efficiency agency creates:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={16} />
                    <span className="text-gray-300">Transparent spending records accessible to all citizens</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={16} />
                    <span className="text-gray-300">Immutable audit trails that prevent fraud and waste</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={16} />
                    <span className="text-gray-300">Cryptographically secure records that cannot be altered</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={16} />
                    <span className="text-gray-300">Real-time verification of government activities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={16} />
                    <span className="text-gray-300">Cost-effective data management at massive scale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : showNationalBlockchainSummit ? (
        <div className="p-6">
          <NationalBlockchainSummit 
            userData={userData}
            wif={wif}
            gameState={gameState}
            onUpdateGameState={(updatedState) => {
              setGameState(updatedState);
              onUpdateBalance();
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-1">
            <ChainProgress 
              chains={gameState.chains}
              currentChainId={selectedChainId}
              onSelectChain={handleSelectChain}
            />
          </div>
          
          <div className="md:col-span-2">
            {currentChain ? (
              <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#0f172a] p-2 rounded-full mr-3">
                    {currentChain.completed ? (
                      <Award className="text-green-400" size={20} />
                    ) : (
                      <Target className="text-[#ffc107]" size={20} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-100">{currentChain.title}</h2>
                    <div className="flex items-center mt-1">
                      <div className="text-xs text-gray-400 mr-2">
                        {currentChain.milestones.filter(m => m.completed).length}/{currentChain.milestones.length} completed
                      </div>
                      {currentChain.completed && (
                        <span className="badge badge-green flex items-center">
                          <CheckCircle2 size={12} className="mr-1" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#0f172a] rounded-md border border-gray-700 mb-6">
                  <p className="text-gray-300">{currentChain.description}</p>
                </div>
                
                <div className="space-y-4">
                  {currentChain.milestones.map((milestone) => (
                    <MilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onClick={() => handleCompleteMilestone(milestone)}
                      disabled={milestone.completed || loading || milestone.id !== gameState.currentMilestoneId}
                      showVisualEffects={showVisualEffects}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-12 flex flex-col items-center justify-center">
                <div className="text-gray-500 mb-4">
                  <FileText size={48} />
                </div>
                <p className="text-gray-400 text-center">Select a mission to view milestones</p>
                <p className="text-gray-500 text-sm text-center mt-2">Choose a mission from the list on the left</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Status Messages */}
      {message && (
        <div className={`mx-6 mb-6 p-4 rounded-md ${
          messageType === 'success' ? 'bg-[#0f2b1d] border border-green-800' :
          messageType === 'error' ? 'bg-[#2b1212] border border-red-800' :
          'bg-[#172038] border border-blue-800'
        }`}>
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">
              {messageType === 'success' ? (
                <CheckCircle2 className="text-green-500" size={18} />
              ) : messageType === 'error' ? (
                <AlertCircle className="text-red-500" size={18} />
              ) : (
                <Info className="text-blue-500" size={18} />
              )}
            </div>
            <p className={`${
              messageType === 'success' ? 'text-green-400' :
              messageType === 'error' ? 'text-red-400' :
              'text-blue-400'
            }`}>{message}</p>
          </div>
        </div>
      )}
      
      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-lg shadow-lg border border-gray-800">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 border-t-2 border-[#ffc107] border-solid rounded-full animate-spin"></div>
            </div>
            <p className="text-center text-gray-300">Processing blockchain operation...</p>
          </div>
        </div>
      )}
      
      {/* Intro Modal */}
      {showIntro && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-lg shadow-lg border border-gray-800 max-w-md">
            <div className="flex justify-center mb-4">
              <Shield className="text-[#ffc107] h-16 w-16" />
            </div>
            <h2 className="text-xl font-bold mb-4 text-center text-gray-100">
              Welcome, Agent {userData.username}!
            </h2>
            <p className="mb-4 text-gray-300">
              You've been recruited to the Digital Government Efficiency (DGE) agency. Your mission is to reform inefficient government agencies and thwart the plans of the villain, Goldfinger.
            </p>
            <p className="mb-4 text-gray-300">
              Complete milestones to earn real Bitcoin SV rewards and advance through the game. Each completed milestone is recorded on the blockchain, creating an immutable record of your progress.
            </p>
            <div className="bg-blue-900 bg-opacity-20 p-3 rounded border border-blue-800 mb-4">
              <h3 className="text-sm font-medium text-blue-400 mb-1 flex items-center">
                <Database className="mr-1.5" size={14} />
                Blockchain Integration
              </h3>
              <p className="text-xs text-gray-300">
                This game demonstrates how Bitcoin SV blockchain can be used to create transparent, tamper-proof records. Every achievement you complete is permanently recorded on the blockchain, just as government operations could be.
              </p>
            </div>
            <div className="bg-yellow-900 bg-opacity-20 p-3 rounded border border-yellow-800 mb-4">
              <h3 className="text-sm font-medium text-yellow-400 mb-1 flex items-center">
                <Globe className="mr-1.5" size={14} />
                National Blockchain Summit
              </h3>
              <p className="text-xs text-gray-300">
                Support the National Blockchain Summit by completing special advocacy milestones. Sign the petition, share information, and recruit allies to earn exclusive rewards while promoting U.S. leadership in blockchain technology.
              </p>
            </div>
            <p className="mb-4 font-medium text-[#ffc107]">
              Your first mission: Complete the DGE Agent Training.
            </p>
            <button
              onClick={handleCloseIntro}
              className="w-full gold-button"
            >
              Begin Mission
            </button>
          </div>
        </div>
      )}
      
      {/* Mission Complete Modal */}
      {showMissionComplete && completedMilestone && (
        <MissionCompleteModal
          milestone={completedMilestone}
          userData={userData}
          showVisualEffects={showVisualEffects}
          onClose={handleCloseMissionComplete}
        />
      )}
      
      {/* Mission Briefing Modal */}
      {showMissionBriefing && currentChainForBriefing && (
        <MissionBriefingModal
          chain={currentChainForBriefing}
          userData={userData}
          showVisualEffects={showVisualEffects}
          onClose={handleCloseMissionBriefing}
        />
      )}
    </div>
  );
};

export default GameInterface;