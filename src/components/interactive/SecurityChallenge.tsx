import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

interface SecurityChallengeProps {
  scenario: string;
  securityLayers: string[];
  discovery: string;
  onComplete: () => void;
}

const SecurityChallenge: React.FC<SecurityChallengeProps> = ({
  scenario,
  securityLayers,
  discovery,
  onComplete
}) => {
  const [activeLayer, setActiveLayer] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const [vulnerabilityFound, setVulnerabilityFound] = useState(false);
  
  const handleLayerClick = (index: number) => {
    if (completed) return;
    
    setActiveLayer(index);
    // The third layer is always the vulnerable one in our simulation
    if (index === 2) {
      setVulnerabilityFound(true);
      setTimeout(() => {
        setCompleted(true);
        onComplete();
      }, 1500);
    }
  };
  
  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
      <div className="flex items-start mb-6">
        <div className="bg-red-900 p-2 rounded-full mr-3">
          <Shield className="text-red-400 h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">{scenario}</h3>
          <p className="text-gray-400 text-sm">
            Analyze each security layer to identify vulnerabilities.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        {securityLayers.map((layer, index) => (
          <motion.button
            key={index}
            className={`w-full p-4 rounded-lg border ${
              activeLayer === index
                ? index === 2
                  ? 'bg-red-900 border-red-700'
                  : 'bg-green-900 border-green-700'
                : 'bg-[#0f172a] border-gray-700 hover:border-gray-600'
            } transition-all`}
            onClick={() => handleLayerClick(index)}
            whileHover={!completed ? { scale: 1.02 } : {}}
            whileTap={!completed ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-opacity-20 flex items-center justify-center mr-3">
                {activeLayer === index ? (
                  index === 2 ? (
                    <AlertTriangle className="text-red-400 h-5 w-5" />
                  ) : (
                    <CheckCircle2 className="text-green-400 h-5 w-5" />
                  )
                ) : (
                  <Lock className="text-gray-400 h-5 w-5" />
                )}
              </div>
              <span className={`text-lg ${
                activeLayer === index
                  ? index === 2
                    ? 'text-red-400'
                    : 'text-green-400'
                  : 'text-gray-300'
              }`}>{layer}</span>
            </div>
          </motion.button>
        ))}
      </div>
      
      {vulnerabilityFound && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900 bg-opacity-20 rounded-lg border border-red-800 p-4"
        >
          <div className="flex items-start">
            <AlertTriangle className="text-red-400 h-5 w-5 mr-2 mt-1" />
            <div>
              <h4 className="text-red-400 font-medium mb-2">Vulnerability Discovered!</h4>
              <p className="text-gray-300">{discovery}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SecurityChallenge;