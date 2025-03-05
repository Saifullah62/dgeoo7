import React from 'react';
import { MilestoneChain } from '../types/game';
import { CheckCircle, Lock, ChevronRight, Target } from 'lucide-react';

interface ChainProgressProps {
  chains: MilestoneChain[];
  currentChainId: string | null;
  onSelectChain: (chainId: string) => void;
}

const ChainProgress: React.FC<ChainProgressProps> = ({ 
  chains, 
  currentChainId,
  onSelectChain
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3 text-gray-100 flex items-center">
        <Target className="text-[#ffc107] mr-2" size={20} />
        Mission Chains
      </h2>
      <div className="space-y-3">
        {chains.map((chain) => {
          // Calculate progress percentage
          const totalMilestones = chain.milestones.length;
          const completedMilestones = chain.milestones.filter(m => m.completed).length;
          const progressPercent = totalMilestones > 0 
            ? Math.round((completedMilestones / totalMilestones) * 100) 
            : 0;
          
          // Background style with image if available
          const backgroundStyle = chain.backgroundImage ? {
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(${chain.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : {};
          
          return (
            <div 
              key={chain.id}
              className={`p-4 rounded-lg border transition-all ${
                currentChainId === chain.id 
                  ? 'border-[#ffc107] bg-[#1e293b]' 
                  : chain.completed 
                    ? 'border-green-600 bg-[#0f2b1d]' 
                    : !chain.unlocked 
                      ? 'border-gray-700 bg-[#1e293b] opacity-60' 
                      : 'border-gray-700 bg-[#1e293b] hover:border-gray-500 cursor-pointer'
              }`}
              style={backgroundStyle}
              onClick={() => chain.unlocked ? onSelectChain(chain.id) : null}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {chain.completed ? (
                    <div className="mr-2 bg-green-900 p-1 rounded-full">
                      <CheckCircle className="text-green-400" size={16} />
                    </div>
                  ) : !chain.unlocked ? (
                    <div className="mr-2 bg-gray-800 p-1 rounded-full">
                      <Lock className="text-gray-500" size={16} />
                    </div>
                  ) : currentChainId === chain.id ? (
                    <div className="mr-2 bg-[#ffc107] p-1 rounded-full">
                      <ChevronRight className="text-[#0f172a]" size={16} />
                    </div>
                  ) : (
                    <div className="mr-2 w-6"></div>
                  )}
                  <h3 className={`font-medium ${
                    chain.completed ? 'text-green-400' :
                    !chain.unlocked ? 'text-gray-500' :
                    currentChainId === chain.id ? 'text-[#ffc107]' :
                    'text-gray-300'
                  }`}>{chain.title}</h3>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                  chain.completed 
                    ? 'bg-green-900 text-green-400' 
                    : !chain.unlocked 
                      ? 'bg-gray-800 text-gray-500' 
                      : 'bg-[#0f172a] text-gray-400'
                }`}>
                  {chain.completed 
                    ? 'Completed' 
                    : !chain.unlocked 
                      ? 'Locked' 
                      : `${completedMilestones}/${totalMilestones}`
                  }
                </span>
              </div>
              
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    chain.completed ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                    'bg-gradient-to-r from-[#ffc107] to-[#ff8f00]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              
              <p className="mt-2 text-sm text-gray-400">{chain.description}</p>
              
              {/* Display milestone previews */}
              <div className="mt-3 flex flex-wrap gap-1">
                {chain.milestones.map((milestone, index) => (
                  <div 
                    key={milestone.id}
                    className={`w-3 h-3 rounded-full ${
                      milestone.completed ? 'bg-green-500' :
                      !chain.unlocked ? 'bg-gray-700' :
                      currentChainId === chain.id && milestone.id === chain.milestones.find(m => !m.completed)?.id ? 'bg-[#ffc107] animate-pulse' :
                      'bg-gray-600'
                    }`}
                    title={milestone.title}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChainProgress;