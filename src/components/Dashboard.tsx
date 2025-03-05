import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  User, 
  Wallet, 
  Award, 
  ChevronRight, 
  Database,
  Globe,
  Clock,
  RefreshCw,
  Share2,
  Briefcase,
  Target,
  Star,
  Zap,
  FileText,
  BarChart3,
  Bell,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import SocialShare from './SocialShare';

interface DashboardProps {
  userData: {
    address: string;
    username: string | null;
    balance: number;
    level: number;
  };
  onStartMission: () => void;
  onUpdateBalance: () => Promise<void>;
  onShowBlockchainExplorer: () => void;
  onShowNationalSummit: () => void;
  onShowAchievements: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  userData,
  onStartMission,
  onUpdateBalance,
  onShowBlockchainExplorer,
  onShowNationalSummit,
  onShowAchievements
}) => {
  const { achievements } = useGameStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'missions' | 'stats'>('overview');

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    await onUpdateBalance();
    setIsRefreshing(false);
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  // Calculate XP progress
  const xpForNextLevel = userData.level * 100;
  const currentXP = 75; // This should come from your game state
  const xpProgress = (currentXP / xpForNextLevel) * 100;

  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-800 overflow-hidden">
      {/* Top Navigation */}
      <div className="bg-[#0f172a] border-b border-gray-800 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="text-[#ffc107] h-6 w-6" />
            <nav className="flex space-x-1">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === 'overview'
                    ? 'bg-[#1e293b] text-[#ffc107]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('missions')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === 'missions'
                    ? 'bg-[#1e293b] text-[#ffc107]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Missions
              </button>
              <button
                onClick={() => setSelectedTab('stats')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === 'stats'
                    ? 'bg-[#1e293b] text-[#ffc107]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Statistics
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-[#1e293b]">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-[#1e293b]">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-[#1e293b]">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-[#0f172a] p-3 rounded-full border border-gray-700">
              <User className="text-[#ffc107] h-6 w-6" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-100">Agent {userData.username}</h2>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-400 font-mono">
                  {userData.address.substring(0, 10)}...{userData.address.substring(userData.address.length - 6)}
                </span>
                <span className="ml-2 px-2 py-0.5 bg-[#0f172a] rounded-full text-xs font-medium text-[#ffc107] border border-[#ffc107]">
                  Level {userData.level}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <SocialShare 
              title={`Agent ${userData.username}'s DGE Profile`}
              description={`Check out my agent profile in DGE: 007 GOLDFINGER. Level ${userData.level} agent with ${unlockedAchievements} achievements!`}
              hashtags={["BlockchainGame", "BSV", "Goldfinger", "CryptoGaming"]}
            />
            
            <motion.button
              onClick={onStartMission}
              className="flex items-center px-4 py-2 bg-[#ffc107] text-[#0f172a] rounded-lg font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="mr-2 h-4 w-4" />
              Start Mission
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Level */}
          <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="text-purple-400 h-5 w-5 mr-2" />
                <span className="text-gray-300">Level {userData.level}</span>
              </div>
              <span className="text-sm text-purple-400">{currentXP}/{xpForNextLevel} XP</span>
            </div>
            <div className="mt-2">
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {Math.round(xpForNextLevel - currentXP)} XP until next level
              </p>
            </div>
          </div>

          {/* Balance */}
          <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="text-[#ffc107] h-5 w-5 mr-2" />
                <span className="text-gray-300">Balance</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-[#ffc107] mr-2">
                  {userData.balance}
                </span>
                <motion.button
                  onClick={handleRefreshBalance}
                  disabled={isRefreshing}
                  className="text-gray-400 hover:text-gray-300"
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Satoshis earned from missions</p>
          </div>

          {/* Achievements */}
          <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="text-green-400 h-5 w-5 mr-2" />
                <span className="text-gray-300">Achievements</span>
              </div>
              <span className="text-xl font-bold text-green-400">
                {unlockedAchievements}/{totalAchievements}
              </span>
            </div>
            <div className="mt-2">
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(unlockedAchievements / totalAchievements) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Active Mission */}
          <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="text-blue-400 h-5 w-5 mr-2" />
                <span className="text-gray-300">Active Mission</span>
              </div>
              <span className="text-xl font-bold text-blue-400">2/5</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">USPS Reform in progress</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {selectedTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6"
          >
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.button
                onClick={onShowBlockchainExplorer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-gray-700 hover:border-gray-600"
              >
                <div className="flex items-center">
                  <div className="bg-blue-900 p-2 rounded-full mr-3">
                    <Database className="text-blue-400 h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-300">Blockchain Explorer</h3>
                    <p className="text-sm text-gray-400">View your transaction history</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 h-5 w-5" />
              </motion.button>

              <motion.button
                onClick={onShowNationalSummit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-gray-700 hover:border-gray-600"
              >
                <div className="flex items-center">
                  <div className="bg-yellow-900 p-2 rounded-full mr-3">
                    <Globe className="text-yellow-400 h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-300">National Summit</h3>
                    <p className="text-sm text-gray-400">Support blockchain adoption</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 h-5 w-5" />
              </motion.button>

              <motion.button
                onClick={onShowAchievements}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-gray-700 hover:border-gray-600"
              >
                <div className="flex items-center">
                  <div className="bg-purple-900 p-2 rounded-full mr-3">
                    <Award className="text-purple-400 h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-300">Achievements</h3>
                    <p className="text-sm text-gray-400">View your badges and rewards</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 h-5 w-5" />
              </motion.button>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-[#ffc107]" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="text-blue-400 h-5 w-5 mr-2" />
                      <div>
                        <p className="text-gray-300">Completed milestone: Agent Orientation</p>
                        <p className="text-sm text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <span className="text-[#ffc107] font-medium">+1000 satoshis</span>
                  </div>
                </div>

                <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="text-purple-400 h-5 w-5 mr-2" />
                      <div>
                        <p className="text-gray-300">Achievement unlocked: First Steps</p>
                        <p className="text-sm text-gray-400">3 hours ago</p>
                      </div>
                    </div>
                    <span className="badge badge-purple">Common</span>
                  </div>
                </div>

                <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Database className="text-green-400 h-5 w-5 mr-2" />
                      <div>
                        <p className="text-gray-300">Transaction recorded on blockchain</p>
                        <p className="text-sm text-gray-400">4 hours ago</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400">
                      0x1234...5678
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === 'missions' && (
          <motion.div
            key="missions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6"
          >
            {/* Active Missions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Target className="mr-2 h-5 w-5 text-[#ffc107]" />
                Active Missions
              </h3>
              <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-gray-300 font-medium">USPS Reform</h4>
                    <p className="text-sm text-gray-400">Optimize delivery routes and implement blockchain tracking</p>
                  </div>
                  <span className="badge badge-blue">In Progress</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="text-green-400 h-4 w-4 mr-2" />
                    <span className="text-gray-400">Analyze current routes</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="text-green-400 h-4 w-4 mr-2" />
                    <span className="text-gray-400">Identify inefficiencies</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Circle className="text-blue-400 h-4 w-4 mr-2" />
                    <span className="text-gray-300">Implement blockchain tracking</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>40%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Available Missions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-[#ffc107]" />
                Available Missions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-300 font-medium">Treasury Department Audit</h4>
                    <span className="badge badge-gold">New</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    Investigate suspicious financial patterns and implement blockchain transparency
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#ffc107]">+5000 satoshis</span>
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-300 font-medium">Fort Knox Security</h4>
                    <span className="badge badge-purple">Special</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    Upgrade security systems with blockchain verification
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#ffc107]">+10000 satoshis</span>
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6"
          >
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-[#ffc107]" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Missions Completed</span>
                      <span className="text-gray-300">12/20</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Achievement Rate</span>
                      <span className="text-gray-300">75%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Blockchain Transactions</span>
                      <span className="text-gray-300">45</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[#ffc107]" />
                  Achievements Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      <span className="text-gray-400">Legendary</span>
                    </div>
                    <span className="text-gray-300">2/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                      <span className="text-gray-400">Epic</span>
                    </div>
                    <span className="text-gray-300">4/8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      <span className="text-gray-400">Rare</span>
                    </div>
                    <span className="text-gray-300">6/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      <span className="text-gray-400">Common</span>
                    </div>
                    <span className="text-gray-300">8/12</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;