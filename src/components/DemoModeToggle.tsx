import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, AlertTriangle } from 'lucide-react';
import { DemoConfig } from '../utils/demo';

interface DemoModeToggleProps {
  demoMode: DemoConfig;
  onToggle: () => void;
}

const DemoModeToggle: React.FC<DemoModeToggleProps> = ({ demoMode, onToggle }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
          demoMode.enabled
            ? 'bg-yellow-900 bg-opacity-20 border-yellow-700 hover:bg-opacity-30'
            : 'bg-[#1e293b] border-gray-700 hover:border-gray-600'
        }`}
      >
        <div className="flex items-center">
          <Beaker className={`mr-2 h-5 w-5 ${demoMode.enabled ? 'text-yellow-400' : 'text-gray-400'}`} />
          <div className="text-left">
            <div className={`font-medium ${demoMode.enabled ? 'text-yellow-400' : 'text-gray-300'}`}>
              Demo Mode
            </div>
            <div className="text-sm text-gray-400">
              {demoMode.enabled ? 'Using simulated blockchain' : 'Try without real BSV'}
            </div>
          </div>
        </div>
        <div className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
          demoMode.enabled ? 'bg-yellow-900' : 'bg-gray-700'
        }`}>
          <motion.div
            className={`w-4 h-4 rounded-full duration-300 ${
              demoMode.enabled ? 'bg-yellow-400' : 'bg-gray-400'
            }`}
            animate={{ x: demoMode.enabled ? 20 : 0 }}
          />
        </div>
      </button>
      
      {demoMode.enabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-3 bg-yellow-900 bg-opacity-20 rounded border border-yellow-800"
        >
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-400 h-5 w-5 mr-2 mt-0.5" />
            <div className="text-sm">
              <span className="text-yellow-400 font-medium">Demo Mode Active</span>
              <p className="text-gray-300 mt-1">
                Using simulated blockchain transactions. No real BSV will be sent or received.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DemoModeToggle;