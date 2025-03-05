import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, Clock, Award, Shield } from 'lucide-react';
import { Milestone } from '../types/game';

interface MissionReportProps {
  milestone: Milestone;
  onClose: () => void;
}

const MissionReport: React.FC<MissionReportProps> = ({ milestone, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e293b] rounded-lg border border-gray-700 p-6"
    >
      <div className="flex items-start mb-6">
        <div className="bg-green-900 p-3 rounded-full mr-3">
          <FileText className="text-green-400 h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Mission Report</h2>
          <p className="text-gray-400">Operation: {milestone.title}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Mission Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Status:</span>
              <span className="flex items-center text-green-400">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Completed
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Completion Time:</span>
              <span className="text-gray-300">
                {new Date(milestone.timestamp || '').toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Reward:</span>
              <span className="text-[#ffc107] font-bold">{milestone.reward} satoshis</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Difficulty:</span>
              <span className={`badge ${
                milestone.difficulty === 'easy' ? 'badge-green' :
                milestone.difficulty === 'medium' ? 'badge-blue' :
                milestone.difficulty === 'hard' ? 'badge-orange' :
                milestone.difficulty === 'expert' ? 'badge-red' :
                'badge-purple'
              }`}>
                {milestone.difficulty?.charAt(0).toUpperCase() + milestone.difficulty?.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0f172a] rounded-lg border border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Blockchain Verification</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <Shield className="text-blue-400 h-5 w-5 mr-2 mt-1" />
              <div>
                <h4 className="text-blue-400 font-medium mb-1">Transaction ID</h4>
                <p className="text-sm font-mono text-gray-400 break-all">
                  {milestone.txid}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Award className="text-purple-400 h-5 w-5 mr-2 mt-1" />
              <div>
                <h4 className="text-purple-400 font-medium mb-1">Achievement Hash</h4>
                <p className="text-sm font-mono text-gray-400 break-all">
                  {milestone.hash}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800 p-4">
          <div className="flex items-start">
            <Clock className="text-blue-400 h-5 w-5 mr-2 mt-1" />
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Mission Summary</h4>
              <p className="text-gray-300">{milestone.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <motion.button
          onClick={onClose}
          className="px-6 py-2 bg-[#ffc107] text-[#0f172a] rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Close Report
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MissionReport;