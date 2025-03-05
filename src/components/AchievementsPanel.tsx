import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Globe, Mail, Database } from 'lucide-react';
import { useGameStore, Achievement } from '../store/gameStore';

const AchievementsPanel: React.FC = () => {
  const { achievements } = useGameStore();
  const [selectedCategory, setSelectedCategory] = React.useState<Achievement['category']>('gameplay');
  
  const categories = [
    { id: 'gameplay', label: 'Gameplay', icon: Shield },
    { id: 'blockchain', label: 'Blockchain', icon: Database },
    { id: 'story', label: 'Story', icon: Mail },
    { id: 'special', label: 'Special', icon: Globe }
  ];
  
  const filteredAchievements = achievements.filter(a => a.category === selectedCategory);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  
  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Award className="text-[#ffc107] h-6 w-6 mr-2" />
          <h2 className="text-xl font-bold text-gray-100">Achievements</h2>
        </div>
        <span className="text-gray-400">
          {unlockedCount} / {achievements.length}
        </span>
      </div>
      
      <div className="flex space-x-2 mb-6">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id as Achievement['category'])}
            className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
              selectedCategory === id
                ? 'bg-[#ffc107] text-[#0f172a]'
                : 'bg-[#0f172a] text-gray-400 hover:text-gray-300'
            }`}
          >
            <Icon className="mr-1.5" size={16} />
            {label}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={false}
            animate={achievement.unlocked ? { opacity: 1 } : { opacity: 0.5 }}
            className={`p-4 rounded-lg border ${
              achievement.unlocked
                ? achievement.rarity === 'legendary'
                  ? 'bg-purple-900 bg-opacity-20 border-purple-700'
                  : achievement.rarity === 'epic'
                    ? 'bg-red-900 bg-opacity-20 border-red-700'
                    : achievement.rarity === 'rare'
                      ? 'bg-blue-900 bg-opacity-20 border-blue-700'
                      : 'bg-green-900 bg-opacity-20 border-green-700'
                : 'bg-[#0f172a] border-gray-700'
            }`}
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-full mr-3 ${
                achievement.rarity === 'legendary' ? 'bg-purple-900 text-purple-400' :
                achievement.rarity === 'epic' ? 'bg-red-900 text-red-400' :
                achievement.rarity === 'rare' ? 'bg-blue-900 text-blue-400' :
                'bg-green-900 text-green-400'
              }`}>
                <Award className="h-5 w-5" />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-100">{achievement.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{achievement.description}</p>
                
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    achievement.rarity === 'legendary' ? 'bg-purple-900 text-purple-300' :
                    achievement.rarity === 'epic' ? 'bg-red-900 text-red-300' :
                    achievement.rarity === 'rare' ? 'bg-blue-900 text-blue-300' :
                    'bg-green-900 text-green-300'
                  }`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                  
                  {achievement.unlocked && (
                    <span className="text-xs text-gray-400 ml-2">
                      Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                {achievement.unlocked && achievement.txid && (
                  <div className="mt-2 text-xs font-mono text-gray-500">
                    TXID: {achievement.txid.substring(0, 16)}...
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPanel;