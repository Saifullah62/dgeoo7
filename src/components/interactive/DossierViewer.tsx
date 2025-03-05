import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Lock, CheckCircle2 } from 'lucide-react';

interface DossierDetail {
  label: string;
  value: string;
  classified?: boolean;
}

interface DossierViewerProps {
  subject: string;
  details: DossierDetail[];
  briefing: string;
  onComplete: () => void;
}

const DossierViewer: React.FC<DossierViewerProps> = ({
  subject,
  details,
  briefing,
  onComplete
}) => {
  const [unlockedDetails, setUnlockedDetails] = useState<Set<number>>(new Set());
  const [showBriefing, setShowBriefing] = useState(false);
  
  const handleUnlockDetail = (index: number) => {
    const newUnlocked = new Set(unlockedDetails);
    newUnlocked.add(index);
    setUnlockedDetails(newUnlocked);
    
    // If all details are unlocked, show briefing
    if (newUnlocked.size === details.length) {
      setTimeout(() => {
        setShowBriefing(true);
        onComplete();
      }, 1000);
    }
  };
  
  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
      <div className="flex items-start mb-6">
        <div className="bg-yellow-900 p-2 rounded-full mr-3">
          <FileText className="text-yellow-400 h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">
            Classified Dossier
          </h3>
          <p className="text-gray-400">Subject: {subject}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {details.map((detail, index) => (
          <motion.button
            key={index}
            className={`w-full text-left p-4 rounded-lg border ${
              unlockedDetails.has(index)
                ? detail.classified
                  ? 'bg-red-900 border-red-700'
                  : 'bg-blue-900 border-blue-700'
                : 'bg-[#0f172a] border-gray-700 hover:border-gray-600'
            } transition-all`}
            onClick={() => handleUnlockDetail(index)}
            whileHover={!unlockedDetails.has(index) ? { scale: 1.02 } : {}}
            whileTap={!unlockedDetails.has(index) ? { scale: 0.98 } : {}}
          >
            <div className="flex items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                unlockedDetails.has(index)
                  ? detail.classified
                    ? 'bg-red-800 text-red-300'
                    : 'bg-blue-800 text-blue-300'
                  : 'bg-gray-800 text-gray-400'
              }`}>
                {unlockedDetails.has(index) ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">{detail.label}</div>
                {unlockedDetails.has(index) ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`font-medium ${
                      detail.classified ? 'text-red-300' : 'text-blue-300'
                    }`}
                  >
                    {detail.value}
                  </motion.p>
                ) : (
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-4 bg-[#0f172a] rounded-lg border border-gray-700 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Details Decrypted:</span>
          <span className="text-blue-400 font-medium">
            {unlockedDetails.size} / {details.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedDetails.size / details.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      {showBriefing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-yellow-900 bg-opacity-20 rounded-lg border border-yellow-800 p-4"
        >
          <div className="flex items-start">
            <CheckCircle2 className="text-yellow-400 h-5 w-5 mr-2 mt-1" />
            <div>
              <h4 className="text-yellow-400 font-medium mb-2">Mission Briefing</h4>
              <p className="text-gray-300">{briefing}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DossierViewer;