import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const AchievementNotification: React.FC = () => {
  const { achievements, recentAchievements, clearRecentAchievements } = useGameStore();
  
  useEffect(() => {
    if (recentAchievements.length > 0) {
      const timer = setTimeout(clearRecentAchievements, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentAchievements, clearRecentAchievements]);
  
  if (recentAchievements.length === 0) return null;
  
  const achievement = achievements.find(a => a.id === recentAchievements[0]);
  if (!achievement) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 right-4 max-w-sm"
      >
        <div className={`bg-[#1e293b] rounded-lg border ${
          achievement.rarity === 'legendary' ? 'border-purple-600 shadow-purple-900/20' :
          achievement.rarity === 'epic' ? 'border-red-600 shadow-red-900/20' :
          achievement.rarity === 'rare' ? 'border-blue-600 shadow-blue-900/20' :
          'border-gray-600 shadow-gray-900/20'
        } shadow-lg`}>
          <div className="p-4">
            <div className="flex items-start">
              <div className={`p-2 rounded-full mr-3 ${
                achievement.rarity === 'legendary' ? 'bg-purple-900 text-purple-400' :
                achievement.rarity === 'epic' ? 'bg-red-900 text-red-400' :
                achievement.rarity === 'rare' ? 'bg-blue-900 text-blue-400' :
                'bg-gray-900 text-gray-400'
              }`}>
                <Award className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-100">
                    {achievement.title}
                  </h3>
                  <button
                    onClick={clearRecentAchievements}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <p className="text-gray-300 text-sm mt-1">
                  {achievement.description}
                </p>
                
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    achievement.rarity === 'legendary' ? 'bg-purple-900 text-purple-300' :
                    achievement.rarity === 'epic' ? 'bg-red-900 text-red-300' :
                    achievement.rarity === 'rare' ? 'bg-blue-900 text-blue-300' :
                    'bg-gray-900 text-gray-300'
                  }`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                  
                  {achievement.txid && (
                    <span className="text-xs text-gray-400 ml-2">
                      Recorded on blockchain
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementNotification;