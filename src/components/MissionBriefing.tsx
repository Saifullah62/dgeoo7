import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, Shield, Award, AlertTriangle, ChevronRight } from 'lucide-react';
import { MilestoneChain } from '../types/game';
import ReactMarkdown from 'react-markdown';

interface MissionBriefingProps {
  chain: MilestoneChain;
  onStart: () => void;
}

const MissionBriefing: React.FC<MissionBriefingProps> = ({ chain, onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e293b] rounded-lg border border-gray-700 p-6"
      style={{
        backgroundImage: chain.backgroundImage ? 
          `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(${chain.backgroundImage})` : 
          'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex items-start mb-6">
        <div className="bg-[#ffc107] p-3 rounded-full mr-3">
          <Target className="text-[#0f172a] h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">{chain.title}</h2>
          <p className="text-gray-400">{chain.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
          <div className="flex items-center mb-3">
            <Shield className="text-[#ffc107] h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold text-[#ffc107]">Mission Objectives</h3>
          </div>
          <ul className="space-y-3">
            {chain.milestones.map((milestone, index) => (
              <li key={milestone.id} className="flex items-start">
                <div className="bg-gray-800 text-gray-400 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-300 font-medium">{milestone.title}</p>
                  <p className="text-sm text-gray-400">{milestone.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
          <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
            <div className="flex items-center mb-3">
              <Award className="text-green-400 h-5 w-5 mr-2" />
              <h3 className="text-lg font-semibold text-green-400">Rewards</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Satoshis:</span>
                <span className="text-[#ffc107] font-bold">
                  {chain.milestones.reduce((sum, m) => sum + m.reward, 0)} satoshis
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Mission Badge:</span>
                <span className="badge badge-gold">
                  <Award size={12} className="mr-1" />
                  {chain.title} Expert
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800 p-4">
            <div className="flex items-start">
              <AlertTriangle className="text-blue-400 h-5 w-5 mr-2 mt-1" />
              <div>
                <h4 className="text-blue-400 font-medium mb-2">Blockchain Integration</h4>
                <p className="text-sm text-gray-300">
                  All mission progress is recorded on the Bitcoin SV blockchain, creating a permanent and tamper-proof record of your achievements. Each milestone completion is verified and rewarded automatically through smart contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Mission difficulty: {chain.milestones[0]?.difficulty || 'Standard'}
        </div>
        <motion.button
          onClick={onStart}
          className="flex items-center px-6 py-2 bg-[#ffc107] text-[#0f172a] rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Mission
          <ChevronRight className="ml-2 h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MissionBriefing;