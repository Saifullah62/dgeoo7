import React from 'react';
import { GameState } from '../types/game';
import { User, Award, Wallet, BarChart3, Shield, Star } from 'lucide-react';

interface PlayerStatsProps {
  gameState: GameState;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ gameState }) => {
  // Calculate XP progress percentage
  const xpNeeded = gameState.level * 50;
  const xpProgress = Math.min(Math.round((gameState.xp / xpNeeded) * 100), 100);
  
  // Calculate completed milestones
  const totalMilestones = gameState.chains.reduce(
    (acc, chain) => acc + chain.milestones.length, 0
  );
  const completedMilestones = gameState.chains.reduce(
    (acc, chain) => acc + chain.milestones.filter(m => m.completed).length, 0
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-4 flex items-center">
        <div className="bg-[#0f172a] p-3 rounded-full mr-3 border border-gray-700">
          <User className="text-[#ffc107] h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-100">{gameState.playerName || 'Agent'}</h2>
          <p className="text-xs text-gray-400 font-mono truncate max-w-[150px]">{gameState.playerAddress}</p>
        </div>
      </div>
      
      <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#0f172a] p-2 rounded-full mr-2 border border-gray-700">
              <BarChart3 className="text-purple-400 h-4 w-4" />
            </div>
            <span className="text-gray-300">Level</span>
          </div>
          <span className="text-xl font-bold text-purple-400">{gameState.level}</span>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">XP</span>
            <span className="text-gray-400">{gameState.xp}/{xpNeeded}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#0f172a] p-2 rounded-full mr-2 border border-gray-700">
              <Wallet className="text-[#ffc107] h-4 w-4" />
            </div>
            <span className="text-gray-300">Balance</span>
          </div>
          <span className="text-xl font-bold text-[#ffc107]">{gameState.balance}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">Satoshis earned from missions</p>
      </div>
      
      <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#0f172a] p-2 rounded-full mr-2 border border-gray-700">
              <Shield className="text-green-400 h-4 w-4" />
            </div>
            <span className="text-gray-300">Missions</span>
          </div>
          <span className="text-xl font-bold text-green-400">{completedMilestones}/{totalMilestones}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">Milestones completed</p>
      </div>
      
      {/* Badges */}
      {gameState.badges.length > 0 && (
        <div className="md:col-span-4 bg-[#1e293b] rounded-lg border border-gray-700 p-4">
          <div className="flex items-center mb-2">
            <Award className="text-[#ffc107] h-4 w-4 mr-2" />
            <h3 className="font-medium text-gray-300">Badges Earned</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {gameState.badges.map((badge, index) => (
              <span 
                key={index}
                className="badge badge-gold"
              >
                <Award size={12} className="mr-1" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerStats;