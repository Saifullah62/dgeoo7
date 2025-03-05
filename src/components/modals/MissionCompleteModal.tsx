import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Code, Database } from 'lucide-react';
import { Milestone } from '../../types/game';
import SocialShare from '../SocialShare';

interface MissionCompleteModalProps {
  milestone: Milestone;
  username: string | null;
  showVisualEffects?: boolean;
  onClose: () => void;
}

const MissionCompleteModal: React.FC<MissionCompleteModalProps> = ({
  milestone,
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
        className={`bg-[#0f172a] rounded-lg border border-gray-800 w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col ${showVisualEffects ? 'mission-complete-glow' : ''}`}
      >
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-center mb-4">
            <div className="bg-[#ffc107] p-4 rounded-full">
              <CheckCircle2 className="text-[#0f172a] h-12 w-12" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 text-center text-gray-100">
            Mission Complete!
          </h2>
          <p className="text-center text-[#ffc107] font-medium">
            {milestone.title}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-[#1e293b] p-4 rounded-md border border-gray-700">
            <p className="text-gray-300">{milestone.description}</p>
          </div>

          <div className="flex items-center justify-center">
            <Award className="text-[#ffc107] h-5 w-5 mr-2" />
            <span className="text-lg font-bold text-[#ffc107]">+{milestone.reward} satoshis</span>
          </div>

          <div className="bg-blue-900 bg-opacity-20 p-3 rounded border border-blue-800">
            <h3 className="text-sm font-medium text-blue-400 mb-1 flex items-center">
              <Database className="mr-1.5" size={14} />
              Blockchain Record Created
            </h3>
            <p className="text-xs text-gray-300">
              This achievement has been permanently recorded on the Bitcoin SV blockchain. The transaction contains a cryptographic hash that links to your previous achievements, creating an immutable chain of accomplishments.
            </p>
            {milestone.txid && (
              <div className="mt-2 pt-2 border-t border-blue-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="font-mono text-blue-300">{milestone.txid.substring(0, 10)}...{milestone.txid.substring(milestone.txid.length - 6)}</span>
                </div>
              </div>
            )}
          </div>

          {showVisualEffects && (
            <div className="p-3 bg-[#1e293b] rounded border border-gray-700">
              <div className="flex items-center mb-2">
                <Code className="text-purple-400 mr-2" size={16} />
                <h3 className="text-sm font-medium text-purple-400">Blockchain Visualization</h3>
              </div>
              <div className="blockchain-blocks">
                <div className="block previous-block">
                  <div className="block-header">Previous Block</div>
                  <div className="block-hash">{milestone.previousHash ? milestone.previousHash.substring(0, 8) + '...' : 'Genesis'}</div>
                </div>
                <div className="block-arrow">→</div>
                <div className="block current-block">
                  <div className="block-header">Current Block</div>
                  <div className="block-hash">{milestone.hash ? milestone.hash.substring(0, 8) + '...' : ''}</div>
                  <div className="block-data">
                    <div className="block-data-item">Milestone: {milestone.id}</div>
                    <div className="block-data-item">Reward: {milestone.reward} sats</div>
                    <div className="block-data-item">Time: {new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="flex-1 gold-button"
            >
              Continue
            </button>
            <SocialShare 
              title={`Agent ${username} completed the "${milestone.title}" mission!`}
              description={`I just earned ${milestone.reward} satoshis by completing a blockchain mission in DGE: 007 GOLDFINGER.`}
              hashtags={["BlockchainGame", "BSV", "Goldfinger", "MissionComplete", "CryptoGaming"]}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionCompleteModal;