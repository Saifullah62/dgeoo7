import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Target, 
  Award, 
  ChevronRight, 
  Globe, 
  Database,
  Zap,
  Clock,
  AlertTriangle,
  Lock,
  Star
} from 'lucide-react';
import { MilestoneChain } from '../types/game';
import { useGameStore } from '../store/gameStore';

interface MissionDashboardProps {
  chain: MilestoneChain;
  onStartMission: () => void;
  playerLevel: number;
  playerBalance: number;
}

const MissionDashboard: React.FC<MissionDashboardProps> = ({
  chain,
  onStartMission,
  playerLevel,
  playerBalance
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { achievements } = useGameStore();
  
  // Calculate mission stats
  const completedMilestones = chain.milestones.filter(m => m.completed).length;
  const totalMilestones = chain.milestones.length;
  const progress = (completedMilestones / totalMilestones) * 100;
  const totalReward = chain.milestones.reduce((sum, m) => sum + m.reward, 0);
  
  // Get related achievements
  const relatedAchievements = achievements.filter(a => 
    a.category === 'story' && 
    a.description.toLowerCase().includes(chain.title.toLowerCase())
  );
  
  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
      {/* Mission Header */}
      <div className="p-6 border-b border-gray-700" style={{
        backgroundImage: chain.backgroundImage ? 
          `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(${chain.backgroundImage})` : 
          'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="bg-[#ffc107] p-3 rounded-full mr-4">
              <Target className="text-[#0f172a] h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">{chain.title}</h2>
              <p className="text-gray-400 max-w-xl">{chain.description}</p>
            </div>
          </div>
          
          <motion.button
            onClick={onStartMission}
            className="flex items-center px-6 py-3 bg-[#ffc107] text-[#0f172a] rounded-lg font-medium shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!chain.unlocked}
          >
            {chain.unlocked ? (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Start Mission
              </>
            ) : (
              <>
                <Lock className="mr-2 h-5 w-5" />
                Locked
              </>
            )}
          </motion.button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-400">
              Mission Progress: {completedMilestones}/{totalMilestones} milestones
            </div>
            <div className="text-sm text-[#ffc107]">
              {Math.round(progress)}%
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ffc107] to-[#ff8f00]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
      
      {/* Mission Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="text-[#ffc107] h-5 w-5 mr-2" />
              <span className="text-gray-300">Total Reward</span>
            </div>
            <span className="text-xl font-bold text-[#ffc107]">{totalReward}</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Satoshis to be earned</p>
        </div>
        
        <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="text-blue-400 h-5 w-5 mr-2" />
              <span className="text-gray-300">Estimated Time</span>
            </div>
            <span className="text-xl font-bold text-blue-400">
              {totalMilestones * 10}min
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Average completion time</p>
        </div>
        
        <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="text-purple-400 h-5 w-5 mr-2" />
              <span className="text-gray-300">Difficulty</span>
            </div>
            <span className="text-xl font-bold text-purple-400">
              {chain.milestones[0]?.difficulty || 'Normal'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Required level: {playerLevel}</p>
        </div>
      </div>
      
      {/* Mission Details Toggle */}
      <div className="px-6 pb-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-gray-700 hover:border-gray-600"
        >
          <span className="text-gray-300 font-medium">Mission Details</span>
          <ChevronRight 
            className={`text-gray-400 transition-transform ${showDetails ? 'rotate-90' : ''}`}
          />
        </button>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4"
            >
              {/* Blockchain Integration */}
              <div className="bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800 p-4">
                <div className="flex items-start">
                  <Database className="text-blue-400 h-5 w-5 mr-2 mt-1" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Blockchain Integration</h4>
                    <p className="text-sm text-gray-300">
                      All mission progress is recorded on the Bitcoin SV blockchain, creating a permanent and tamper-proof record of your achievements. Each milestone completion is verified and rewarded automatically through smart contracts.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mission Requirements */}
              <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                <h4 className="text-gray-100 font-medium mb-3 flex items-center">
                  <AlertTriangle className="text-[#ffc107] h-5 w-5 mr-2" />
                  Mission Requirements
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Shield className="text-green-400 h-4 w-4 mr-2" />
                    <span className="text-gray-300">Agent Level {playerLevel} or higher</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Wallet className="text-green-400 h-4 w-4 mr-2" />
                    <span className="text-gray-300">Minimum balance of {Math.floor(totalReward * 0.1)} satoshis</span>
                  </li>
                  {chain.id !== 'dge-training' && (
                    <li className="flex items-center text-sm">
                      <Award className="text-green-400 h-4 w-4 mr-2" />
                      <span className="text-gray-300">Complete DGE Training</span>
                    </li>
                  )}
                </ul>
              </div>
              
              {/* Related Achievements */}
              {relatedAchievements.length > 0 && (
                <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                  <h4 className="text-gray-100 font-medium mb-3 flex items-center">
                    <Award className="text-[#ffc107] h-5 w-5 mr-2" />
                    Related Achievements
                  </h4>
                  <div className="space-y-2">
                    {relatedAchievements.map(achievement => (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border ${
                          achievement.unlocked
                            ? 'bg-green-900 bg-opacity-20 border-green-700'
                            : 'bg-gray-800 border-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <Award className={`h-4 w-4 mr-2 ${
                            achievement.unlocked ? 'text-green-400' : 'text-gray-500'
                          }`} />
                          <div>
                            <div className="text-sm font-medium text-gray-300">
                              {achievement.title}
                            </div>
                            <div className="text-xs text-gray-400">
                              {achievement.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MissionDashboard;