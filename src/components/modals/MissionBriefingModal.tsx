import React from 'react';
import { motion } from 'framer-motion';
import { Target, MessageSquare, Zap, Award, Hexagon, Database } from 'lucide-react';
import { MilestoneChain } from '../../types/game';
import SocialShare from '../SocialShare';

interface MissionBriefingModalProps {
  chain: MilestoneChain;
  username: string | null;
  showVisualEffects?: boolean;
  onClose: () => void;
}

const MissionBriefingModal: React.FC<MissionBriefingModalProps> = ({
  chain,
  username,
  showVisualEffects = false,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`bg-[#0f172a] rounded-lg border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col ${showVisualEffects ? 'mission-briefing-glow' : ''}`}
        style={{
          backgroundImage: chain.backgroundImage ? 
            `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(${chain.backgroundImage})` : 
            'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className="bg-[#ffc107] p-3 rounded-full mr-3">
              <Target className="text-[#0f172a] h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-100">
              {chain.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center mb-2">
            <MessageSquare className="text-blue-400 mr-2" size={16} />
            <h3 className="text-lg font-medium text-blue-400">Mission Briefing</h3>
          </div>
          <p className="text-gray-300">{chain.description}</p>
          
          <div className="bg-[#1e293b] p-4 rounded-md border border-gray-700">
            <div className="flex items-center mb-2">
              <Zap className="text-[#ffc107] mr-2" size={16} />
              <h3 className="text-sm font-medium text-[#ffc107]">Mission Objectives</h3>
            </div>
            <ul className="space-y-2">
              {chain.milestones.map((milestone, index) => (
                <li key={milestone.id} className="flex items-start">
                  <div className="bg-[#0f172a] text-gray-400 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm font-medium">{milestone.title}</p>
                    <p className="text-gray-400 text-xs">{milestone.type === 'agency' ? `${milestone.agency} Operation` : 'Story Mission'}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#1e293b] p-4 rounded-md border border-gray-700">
            <div className="flex items-center mb-2">
              <Award className="text-green-400 mr-2" size={16} />
              <h3 className="text-sm font-medium text-green-400">Rewards</h3>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Satoshis:</span>
              <span className="text-[#ffc107] font-bold">
                {chain.milestones.reduce((sum, m) => sum + m.reward, 0)} satoshis
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-300">Badge:</span>
              <span className="badge badge-gold">
                <Award size={12} className="mr-1" />
                {chain.title} Expert
              </span>
            </div>
          </div>

          {showVisualEffects && (
            <div className="p-3 bg-[#1e293b] rounded-md border border-gray-700">
              <div className="flex items-center mb-2">
                <Hexagon className="text-purple-400 mr-2" size={16} />
                <h3 className="text-sm font-medium text-purple-400">Mission Network</h3>
              </div>
              <div className="mission-network">
                {chain.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="mission-node">
                    <div className="node-number">{index + 1}</div>
                    <div className="node-title">{milestone.title.split(' ')[0]}</div>
                    {index < chain.milestones.length - 1 && (
                      <div className="node-connection"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-900 bg-opacity-20 p-3 rounded border border-blue-800">
            <h3 className="text-sm font-medium text-blue-400 mb-1 flex items-center">
              <Database className="mr-1.5" size={14} />
              Blockchain Integration
            </h3>
            <p className="text-xs text-gray-300">
              All mission progress is recorded on the Bitcoin SV blockchain, creating a permanent and tamper-proof record. 
              This demonstrates how government operations could achieve transparency and accountability through blockchain technology.
            </p>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex justify-between">
            <SocialShare 
              title={`Agent ${username} is starting the "${chain.title}" mission!`}
              description={`Join me in DGE: 007 GOLDFINGER as I take on Goldfinger's plans in the ${chain.title} mission.`}
              hashtags={["BlockchainGame", "BSV", "Goldfinger", "NewMission", "CryptoGaming"]}
            />
            <button
              onClick={onClose}
              className="gold-button"
            >
              Accept Mission
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionBriefingModal;